import config from "config";
import helmet from "helmet";
import express, { Request, Response } from "express";
import path from "path";
import { apiRouter, basePath } from "./api";
import {
  verify,
  filter,
  auth,
  createServiceProxies
} from "./gateway/middlewares";

// Create Express server
const app = express();

//1. add helmet default middleware
app.use(helmet());

//2. Filtering internal api middleware... not get from browser
app.use(filter);

//3. add middleware to proxy the authentication server
// now all apis ... later only users/authenticate for the UI
app.use(config.get("authentication.server.base-path"), auth);

//3. add check authentication verify middleware for interal apis
app.use(basePath, verify);

//4. middleware to proxy request to other services
const servicesBasePath = config.get("services-base-path");
if (servicesBasePath && servicesBasePath !== "") {
  console.log("Found services base path: ", servicesBasePath);
  const services = createServiceProxies();
  for (const service of services) {
    app.use(servicesBasePath + "/svr", service);
  }
}

//5. set internal api  (maybe not use this)
app.use(basePath, apiRouter);

//home on prod use the static dir with client app
if (process.env.NODE_ENV === "production") {
  const frontendDir = process.env.FRONTEND
    ? process.env.FRONTEND
    : config.get<string>("frontend-directory");

  console.log(
    "Production Environment found - frontend directory: " + frontendDir
  );

  // Serve static files for frontend
  app.use(express.static(path.join(__dirname, frontendDir)));

  // Handle React routing, return all requests to React app (ex using login and secured pages)
  app.get("*", (req: Request, res: Response) => {
    //forse dovrò vedere che non si tratta di /api o /users ? no queste due vengono già intercettate dal middleware
    //vediamo se accetta text/html
    res.sendFile(path.join(__dirname, frontendDir, "index.html"));
  });
} else {
  const frontendDir = process.env.FRONTEND
    ? process.env.FRONTEND
    : config.get<string>("frontend-directory");

  console.log(
    "Development Environment found - frontend (fort test) directory: " +
      frontendDir
  );

  // Serve static files for frontend
  app.use(express.static(path.join(__dirname, frontendDir)));
}

const port = process.env.PORT ? process.env.PORT : config.get("port");

//default port or get from ENV
app.set("port", port);

export default app;
