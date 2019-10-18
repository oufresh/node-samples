import { Request, Response, Router } from "express";

const apiRouter = Router();

apiRouter.get("/element/:id", (req: Request, resp: Response) => {
  const id = req.params.id;
  resp.send({ id });
});

apiRouter.get("/elements", (req: Request, resp: Response) => {
  resp.send([{ id: 1 }, { id: 2 }]);
});

export { apiRouter };
