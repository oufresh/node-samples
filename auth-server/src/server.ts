import express, { Request, Response } from "express";
import * as Bp from "body-parser";
import path from "path";
import helmet from "helmet";
import errorhandler from "errorhandler";
import logger from "./logger";
import config from "config";
import session from "express-session";
import uuid from "uuid/v4";
import parseurl from "parseurl";
import sessionFileStore from "session-file-store";

const FileStore = sessionFileStore(session);
const app = express();

app.use(Bp.urlencoded({ extended: false }));
app.use(Bp.json());

//helmet
app.use(helmet());

app.use(
  session({
    genid: req => {
      logger.info("Inside the session middleware: " + req.session);
      return uuid();
    },
    store: new FileStore(),
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true
  })
);

//login and logout api

const frontendDir = process.env.FRONTEND
  ? process.env.FRONTEND
  : config.get<string>("frontend-directory");

logger.info(
  "Production Environment found - frontend directory: " + frontendDir
);

// Serve static files for frontend
app.use(express.static(path.join(__dirname, frontendDir)));

// Handle React routing, return all requests to React app (ex using login and secured pages)
app.get("*", (req: Request, res: Response) => {
  logger.info(req.session.views);
  if (!req.session.views) {
    req.session.views = {};
  }

  // get the url pathname
  const pathname = parseurl(req).pathname;
  logger.info(pathname);

  // count the views
  req.session.views[pathname] = (req.session.views[pathname] || 0) + 1;
  if (req.path.indexOf("login") > 0)
    res.sendFile(path.join(__dirname, frontendDir, "login.html"));
  else res.sendFile(path.join(__dirname, frontendDir, "index.html"));
});

if (process.env.NODE_ENV !== "production") {
  logger.info("Setting development error handlers");
  app.use(errorhandler());
} else {
  logger.info("Setting production error handlers");
  function clientErrorHandler(err, req, res, next) {
    if (req.xhr) {
      res.status(500).send("Something failed buddy!!");
    } else {
      next(err);
    }
  }
  function errorHandler(err, req, res, next) {
    res.status(500).send("Something failed buddy!!");
  }
  function logErrors(err, req, res, next) {
    logger.error(err.stack);
    next(err);
  }

  app.use(logErrors);
  app.use(clientErrorHandler);
  app.use(errorHandler);
}

/*
router.get('/logout', function(req, res) {
   req.logout();
   req.session.destroy(function (err) {
   if (err) {
     return next(err);
   }
   return res.send({ success: true });
   });
    res.redirect('/')
});*/

// start server
const port = process.env.PORT ? process.env.PORT : config.get("port");
app.listen(port, function() {
  logger.info("Server listening on port " + port);
  logger.info("Environment " + process.env.NODE_ENV);
});
