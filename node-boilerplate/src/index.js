// index.mjs
const config = require("config");
const logger = require("simple-node-logger").createSimpleLogger();
const createService  = require("./service/service.js");
const generateAsync = require( "./worker/generator.js");
const { connect, close} = require("./db/db.js");



logger.info(config);

const service = createService();
service.isSecret("ciao");


/*
logger.info("Start worker with thrn/catch");
generateAsync().then(result =>{
  logger.info(result);
}).catch(e => logger.error(e));
*/
console.log("Start worker with async await");
async function test() {
    const nums = await generateAsync();
    logger.info(nums);
}
test();

//top level await not yet supported, use then / catch
connect()
  .then(() => {
    logger.info("Connection to db ok!");
    close();
  })  .catch((e) => {
    logger.error();(e);
    close();
  });
/*

//rest fframework express
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
 */