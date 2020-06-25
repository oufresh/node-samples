import errorHandler from "errorhandler";
import app from "./app";
import config from "config";
import logger from "./logger";
import { NextFunction, Response, Request } from "express";
import helmet from "helmet";

//set helmet!!
app.use(helmet());

//Error Handler. Provides full stack - remove for production
if (process.env.NODE_ENV !== "production") {
    logger.info("Setting development error handlers");
    app.use(errorHandler());
  } else {
    logger.info("Setting production error handlers");
    function clientErrorHandler(
      err: Error,
      req: Request,
      res: Response,
      next: NextFunction
    ) {
      if (req.xhr) {
        res.status(500).send("Something failed buddy!!");
      } else {
        next(err);
      }
    }
    function errorHandler(
      err: Error,
      req: Request,
      res: Response /*, next: NextFunction*/
    ) {
      res.status(500).send("Something failed buddy!!");
    }
    function logErrors(
      err: Error,
      req: Request,
      res: Response,
      next: NextFunction
    ) {
      logger.error(err.stack);
      next(err);
    }
  
    app.use(logErrors);
    app.use(clientErrorHandler);
    app.use(errorHandler);
  }

  //Start Express server.
  const port = process.env.PORT ? process.env.PORT : config.get("port");
  const server = app.listen(port, () => {
    logger.info(
      "App is running at http://localhost:" +
        port +
        " in " +
        app.get("env") +
        " mode"
    );
    logger.info("Press CTRL-C to stop\n");
  });

export default server;