import config from "config";
import helmet from "helmet";
import express, { Request, Response, NextFunction } from "express";
import httpProxy from "http-proxy-middleware";
import path from "path";
import { apiRouter, basePath } from "./api";
import { auth } from "./gateway/middlewares/auth";
import { IncomingMessage, ServerResponse, ClientRequest } from "http";

// Create Express server
const app = express();

//1. add helmet default middleware
app.use(helmet());

//2. Filtering internal api middleware... not get from browser
app.use((req: Request, res: Response, next: NextFunction) => {
  if (
    req.method === "GET" &&
    (req.path.indexOf(config.get("authentication.server.base-path")) >= 0 ||
      req.path.indexOf(basePath) >= 0) &&
    (!req.headers.referer || req.header("Sec-Fetch-Mode") === "navigate")
  ) {
    console.info("--- Blocked request ---");
    console.log(req.url);
    console.log(req.headers);
    console.info("-----------------------");
    res.status(500).send("Can call internal api from browser... :D");
  } else next();
});

//3. add middleware to proxy the authentication server
// now all apis ... later only users/authenticate for the UI
app.use(
  config.get("authentication.server.base-path"),
  httpProxy({
    target:
      config.get("authentication.server.protocol") +
      "://" +
      config.get("authentication.server.host") +
      ":" +
      config.get("authentication.server.port"),
    changeOrigin: true,
    //pathRewrite: { "^/users/authenticate": "/users/authenticate" },
    onError: (err: Error, req: IncomingMessage, res: ServerResponse) => {
      console.error(err);
      console.error(req);
      res.writeHead(500, {
        "Content-Type": "text/plain"
      });
      res.end(
        "Something went wrong with auth server. And we are reporting a custom error message."
      );
    },
    onProxyReq: (proxyReq: ClientRequest /*, req: Request, res: Response*/) => {
      const debug = config.get("debug");
      if (debug === true) {
        console.log(proxyReq.getHeaders());
        console.log(proxyReq.path);
      }
    }
  })
);

//3. add check authentication middleware for interal apis
app.use("/api", auth);

//4. middleware to proxy request to other services
//TODO

//5. set internal api  (maybe not use this)
app.use("/api", apiRouter);

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
