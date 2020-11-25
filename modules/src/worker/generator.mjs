import { Worker, isMainThread } from "worker_threads";

// generate array with random numbers
const randomArray = (length, max) => {
  return Array.apply(null, Array(length)).map(() => {
    return Math.round(Math.random() * max);
  });
}

export const generate = () => {
  if (isMainThread) {
    const input = randomArray(100, 200);
    // run thread and pass info
    const worker = new Worker("./src/worker/sort.executor.mjs", {
      workerData: { value: input },
    });
    worker.on("message", (result) => {
      console.log(result);
    });
    worker.on("exit", (code) => {
      if (code !== 0) throw new Error(`Worker stopped with exit code ${code}`);
      else console.log("Worker stopped " + code);
    });
  } else console.error("Main thread thread! -----> Abort!!");
};
