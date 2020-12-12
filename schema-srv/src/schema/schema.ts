import { Router, Request, Response } from "express";

const schemaRouter = Router();



// middleware that is specific to this router
schemaRouter.use(function timeLog(req, res, next) {
  console.log("Time: ", Date.now());
  next();
});
// define the home page route
schemaRouter.get("/", function (req, res) {
  res.send("Birds home page");
});
// define the about route
schemaRouter.get("/about", function (req, res) {
  res.send("About schema");
});

export default schemaRouter;
