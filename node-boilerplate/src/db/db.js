const config = require("config");
const {  MongoClient } = require("mongodb");
const logger = require("simple-node-logger").createSimpleLogger();

const dbConfig = config.get("dbConfig");
const host = dbConfig.host;
const port = dbConfig.port;
const user = dbConfig.user;
const pwd = dbConfig.pwd;
const authSource = dbConfig.authSource;
const dbName = dbConfig.dbName;

const uri = `mongodb://${user}:${pwd}@${host}:${port}/?poolSize=20&w=majority&&authSource=${authSource}`;
console.log("Connecting to db: " + uri);
let db;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
module.exports = {
  connect: async function () {
    // Connect the client to the server
    await client.connect();
    // Establish and verify connection
    await client.db("admin").command({ ping: 1 });
    logger.info("Connected successfully to server");
    logger.info("Connect to database " + dbName);
    db = client.db(dbName);
    return db;
  },
  isConnected: function () {
    const c = client.isConnected();
    /*_db.command({ping: 1}).then(()=>{

  }).catch(e=>{});*/

    return c;
  },
  close: async function () {
    logger.info("Close db connection");
    await client.close();
  },
  getCollection: function (coll) {
    return db.collection(coll);
  },
};

/*
}getCollection: nect().then((d)=>{
 db = d;
 console.log(db);
}).catch(e =>{
  console.error(e);
});*/
