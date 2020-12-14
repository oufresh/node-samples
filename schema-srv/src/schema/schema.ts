import { Router, Request, Response } from "express";
import { getCollection } from "../db";

const schemaRouter = Router();

// middleware that is specific to this router
schemaRouter.use(function timeLog(req, res, next) {
  console.log("Time: ", Date.now());
  next();
});

// define the about route
schemaRouter.get("/about", function (req, res) {
  res.send("About schema");
});

schemaRouter.get("/:schemaName", async (req: Request, res: Response) => {
  //console.log(req.params);
  const n = req.params.schemaName;
  if (n) {
    try {
      const schema = await getCollection("schemas").findOne({
        name: n,
      });
      res.send(schema);
    } catch (e) {
      console.error(e);
      res.sendStatus(500);
    }
  } else res.sendStatus(400);
});

schemaRouter.get(
  "/:schemaName/elements",
  async (req: Request, res: Response) => {
    const n = req.params.schemaName;
    if (n) {
      try {
        const cursor = getCollection("elements").find({
          schema: n,
        });

        // print a message if no documents were found
        const elements = [];
        if ((await cursor.count()) === 0) {
          console.log("No documents found!");
          res.send(elements);
        } else {
          await cursor.forEach((iterator) => {
            elements.push(iterator);
          });
          res.send(elements);
        }
      } catch (e) {
        console.error(e);
        res.sendStatus(500);
      }
    } else res.sendStatus(400);
  }
);

export { schemaRouter };
