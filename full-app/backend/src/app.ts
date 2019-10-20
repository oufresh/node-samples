import config from "config";
import helmet from "helmet";
import express, { Request, Response, NextFunction } from "express";
import httpProxy from "http-proxy-middleware";
import path from "path";
import { apiRouter } from "./api";

// Create Express server
const app = express();

//add helmet default middleware
app.use(helmet());

const port = process.env.PORT ? process.env.PORT : config.get("port");

//default port or get from ENV
app.set("port", port);

app.use((req: Request, res: Response, next: NextFunction) => {
  console.log("Time:", Date.now());
  if (
    req.method === "GET" &&
    (req.url.indexOf("/api") >= 0 || req.url.indexOf("/users") >= 0)
  ) {
    if (!req.headers.accept) next(new Error("Missing accept!!"));
    if (
      !req.headers.referer &&
      req.headers.accept &&
      req.headers.accept.indexOf("application/json") === -1
    )
      next(new Error("Though lucky buddy!!"));
    else next();
  }

  next();
});

//services proxy
app.use(
  "/users",
  httpProxy({
    target: "https://api.github.com",
    changeOrigin: true
  })
);

//set backed api router
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
}

export default app;
