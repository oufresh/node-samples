import express, { Request, Response } from "express";
import config from "config";
import { close, connect } from "./db";
import { Server } from "http";
import { schemaRouter} from "./schema";

const app = express();
let server: Server = null;
const PORT = config.get("port");
console.log("Hello schema server ts-node app!");
console.log("Connect to db");
connect()
  .then(() => {
    console.log("Connection to db ok!");
    app.use("/schema", schemaRouter);
    app.get("/", (req: Request, res: Response) => res.send("Schema app: " + Date.now()));
    
    process.on('SIGINT', handleExit);
    process.on('SIGQUIT', handleExit);
    process.on('SIGTERM', handleExit);
    server = app.listen(PORT, () => {
      console.log(
        `⚡️[server]: Server is running at https://localhost:${PORT}`
      );
    });
  })
  .catch((e) => {
    console.error(e);
    close();
  });

  
function handleExit(signal) {
  console.log(`Received ${signal}. Close my server properly.`)
  close();
  server.close( () => {
    process.exit(0);
  });
}