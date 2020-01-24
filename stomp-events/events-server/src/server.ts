import * as Express from "express";
import * as Bp from "body-parser";
import * as config from "config";
import * as helmet from "helmet";
import * as errorhandler from "errorhandler";
import logger from "./lib/logger";

const app = Express();

app.use(Bp.urlencoded({ extended: false }));
app.use(Bp.json());

//helmet
app.use(helmet());

app.use("/sample", () => {
  throw new Error("Thoug luck buddy");
});

if (process.env.NODE_ENV !== 'production') {
  logger.info("Setting development error handlers");
  app.use(errorhandler())
} else {
  logger.info("Setting production error handlers");
  function clientErrorHandler(err, req, res, next) {
    if (req.xhr) {
      res.status(500).send('Something failed buddy!!');
    } else {
      next(err);
    }
  }
  function errorHandler(err, req, res, next) {
    res.status(500).send('Something failed buddy!!');
  }
  function logErrors(err, req, res, next) {
    logger.error(err.stack);
    next(err);
  }
  
  app.use(logErrors);
  app.use(clientErrorHandler);
  app.use(errorHandler);
}

// start server
const port = process.env.PORT ? process.env.PORT : config.get("port");
app.listen(port, function() {
  logger.info("Server listening on port " + port);
  logger.info("Environment " + process.env.NODE_ENV);
});
