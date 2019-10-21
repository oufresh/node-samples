import * as Express from "express";
import * as Bp from "body-parser";
import config from "config";

import { errorHandler } from "./helpers/errorHandler";
import * as userController from "./users/controller";

const app = Express();

app.use(Bp.urlencoded({ extended: false }));
app.use(Bp.json());

// api routes
app.use("/users", userController.router);

// global error handler
app.use(errorHandler);

// start server
const port = process.env.PORT ? process.env.PORT : 6000; //config.get("port");
app.listen(port, function() {
  console.log("Server listening on port " + port);
});
