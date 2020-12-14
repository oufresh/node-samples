import config from "config";
import { Db, MongoClient } from "mongodb";

const dbConfig: any = config.get("dbConfig");
const host = dbConfig.host;
const port = dbConfig.port;
const user = dbConfig.user;
const pwd = dbConfig.pwd;
const authSource =dbConfig.authSource;
const dbName = dbConfig.dbName;

const uri = `mongodb://${user}:${pwd}@${host}:${port}/?poolSize=20&w=majority&&authSource=${authSource}`;
console.log("Connecting to db: " + uri);
let db: Db;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
export async function connect() {
  try {
    // Connect the client to the server
    await client.connect();
    // Establish and verify connection
    await client.db("admin").command({ ping: 1 });
    console.log("Connected successfully to server");
    console.log("Connect to database " + dbName);
    db = client.db(dbName);
    console.log(db);
    return db;
  } catch (e) {
    throw e;
  }
}

/*connect().then((d)=>{
 db = d;
 console.log(db);
}).catch(e =>{
  console.error(e);
});*/
//export { db };
function isConnected() {
  const c = client.isConnected();
  /*_db.command({ping: 1}).then(()=>{

  }).catch(e=>{});*/

  return c;
}
export async function close() {
  console.log("Close db connection");
  await client.close();

}

export function getCollection(coll: string) {
  return db.collection(coll);
}