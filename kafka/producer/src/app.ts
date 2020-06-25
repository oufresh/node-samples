import express, { Request, Response } from "express";
import helmet from "helmet";
import { kafkaRouter, init } from "./kafka";

// Create Express server
const app = express();
app.use(helmet());


const port = process.env.PORT || 3000;

//default port or get from ENV
app.set("port", port);

app.get("/hello", (req: Request, resp: Response) => {
  console.group("Request /hello");
  console.log("request host: ", req.hostname);
  console.log(JSON.stringify(req.headers));
  console.groupEnd();
  resp.send("Hello from basket");
});

app.use("/kafka", kafkaRouter);

init();

export default app;
