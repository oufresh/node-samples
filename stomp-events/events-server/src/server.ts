import Express, { Request, Response, NextFunction } from "express";
import Bp from "body-parser";
import config from "config";
import helmet from "helmet";
import logger from "./lib/logger";
import user from "./api/users";
import swaggerUi from "swagger-ui-express";
import * as swaggerDocument from "./swagger.json";

const app = Express();

app.use(Bp.urlencoded({ extended: false }));
app.use(Bp.json());

//helmet
app.use(helmet());
app.use("/rest", user);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use("/test", (req, res) => res.send("Hello"));

/*if (process.env.NODE_ENV !== 'production') {
  logger.info("Setting development error handlers");
  app.use(errorHandler())
} else {*/
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
  res: Response,
  next: NextFunction
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
//}

// start server
const port = process.env.PORT ? process.env.PORT : config.get("port");
app.listen(port, function() {
  logger.info("Server listening on port " + port);
  logger.info("Environment " + process.env.NODE_ENV);
});
