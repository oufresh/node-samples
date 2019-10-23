import config from "config";
import helmet from "helmet";
import express, { Request, Response, NextFunction } from "express";
import httpProxy from "http-proxy-middleware";
import path from "path";
import { apiRouter } from "./api";
import { IncomingMessage, ServerResponse, ClientRequest } from "http";

// Create Express server
const app = express();

//1. add helmet default middleware
app.use(helmet());

//2. add middleware to proxy the authentication server
// now all apis ... later only users/authenticate for the UI
app.use(
  "/users",
  httpProxy({
    target: "http://localhost:6000",
    changeOrigin: true,
    //pathRewrite: { "^/users/authenticate": "/users/authenticate" },
    onError: (err: Error, req: IncomingMessage, res: ServerResponse) => {
      console.error(err);
      console.error(req);
      res.writeHead(500, {
        "Content-Type": "text/plain"
      });
      res.end(
        "Something went wrong. And we are reporting a custom error message."
      );
    },
    onProxyReq: (proxyReq: ClientRequest) => {
      console.log(proxyReq.getHeaders());
      console.log(proxyReq.path);
    }
  })
);

//3. add check authentication middleware for interla apis
app.use((req: Request, res: Response, next: NextFunction) => {
  console.groupCollapsed([
    "Incoming request: time " + Date.now().toLocaleString()
  ]);
  console.log(req);
  console.groupEnd();
  next();
  /* if (
    !req.headers.referer &&
    req.method === "GET" &&
    req.url.indexOf("/api") >= 0
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

  next();*/
});

//4. set internal api router or proxy to services
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
    "Production Environment found - frontend directory: " + frontendDir
  );

  // Serve static files for frontend
  app.use(express.static(path.join(__dirname, frontendDir)));
}

const port = process.env.PORT ? process.env.PORT : config.get("port");

//default port or get from ENV
app.set("port", port);

export default app;
