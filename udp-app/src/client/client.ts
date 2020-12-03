import { Worker } from "worker_threads";

let worker = null;
export function test() {
  worker = new Worker("./src/client/clientWorker.js", {
    workerData: {
      path: "./clientWorker.ts",
      value: 15
    },
  });

  worker.on("message", (result: number) => {
    console.log("Worker result: " + result);
  });
}
