import * as Express from "express";
import * as Bp from "body-parser";
import * as config from "config";
import * as helmet from "helmet";
import * as errorHandler from "strong-error-handler";
import * as userController from "./users/controller";

const app = Express();

app.use(Bp.urlencoded({ extended: false }));
app.use(Bp.json());

//helmet
app.use(helmet());

// api routes
app.use("/users", userController.router);

app.use(errorHandler({ debug: process.env.NODE_ENV !== "production", log: true}));

// start server
const port = process.env.PORT ? process.env.PORT : config.get("port");
app.listen(port, function() {
  console.log("Server listening on port " + port);
});
