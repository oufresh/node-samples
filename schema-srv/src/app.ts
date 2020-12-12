import express, { Request, Response } from "express";
import config from "config";
import { db, close, isConnected, connect} from "./db";

const app = express();
const PORT = config.get("port");
console.log("Hello schema server ts-node app!");
console.log("Connect to db");

connect().then(() =>{
    app.get("/", (req: Request, res: Response) => res.send("Schema app"));
    //app.get("schema")
    app.listen(PORT, () => {
      console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`);
    });
}).catch(e=> console.error(e));


