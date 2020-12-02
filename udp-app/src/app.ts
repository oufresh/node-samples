import server, {} from "./server";

// --------------------creating a udp server --------------------
console.log("Hello udp serverts node app!");

// creating a udp server
console.log(server);
console.log("Server created!");

server.on("error", (err) => {
    console.log(`server error:\n${err.stack}`);
    server.close();
  });
  
  server.on("message", (msg, rinfo) => {
    console.log(`server got: ${msg} from ${rinfo.address}:${rinfo.port}`);
  });
  
  server.on("listening", () => {
    const address = server.address();
    console.log(`server listening ${address.address}:${address.port}`);
  });
  
  server.bind(41234);
  // Prints: server listening 0.0