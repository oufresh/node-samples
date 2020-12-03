import udp from "./udp/udp";

import { test } from "./client/client";

//----- test worker client

test();
// --------------------creating a udp server --------------------
console.log("Hello udp serverts node app!");

// creating a udp server
console.log(udp);
console.log("Server created!");

udp.on("error", (err: Error) => {
  console.log(`server error:\n${err.stack}`);
  udp.close();
});

udp.on("message", (msg, rinfo) => {
  console.log(`server got: ${msg} from ${rinfo.address}:${rinfo.port}`);
});

udp.on("listening", () => {
  const address = udp.address();
  console.log(`server listening ${address.address}:${address.port}`);
});

udp.on("connect", () => {
  console.log("Socket connected");
});

udp.on("close", () => {
  console.log("Socket is closed !");
});

udp.bind(41234);
