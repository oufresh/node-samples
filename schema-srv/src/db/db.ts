import config from "config";
import { Db, MongoClient } from "mongodb";

const dbConfig: any = config.get("dbConfig");
const host = dbConfig.host;
const port = dbConfig.port;
const uri = "mongodb+srv://" + host + ":" + port + "?poolSize=20&w=majority";

console.log("Connecting to db: " + uri);
let _db: Db | null = null;
const client = new MongoClient(uri);
export async function connect() {
  try {
    // Connect the client to the server
    await client.connect();
    // Establish and verify connection
    await client.db("admin").command({ ping: 1 });
    console.log("Connected successfully to server");
    const dbName = config.get("dbName");
    console.log("Connect to database " + dbName);
    _db = client.db();
    
  } catch (e) {
    throw e;
  }
}

export const db = _db;
export function isConnected()
{
const c =client.isConnected();
  /*_db.command({ping: 1}).then(()=>{

  }).catch(e=>{});*/

  return c;
}
export async function close() {
  console.log("Close db connection");
  await client.close();
}
