const { Worker, isMainThread } = require("worker_threads");

// generate array with random numbers
const randomArray = (length, max) => {
  return Array.apply(null, Array(length)).map(() => {
    return Math.round(Math.random() * max);
  });
}

module.exports = function generateAsync() {
  if (isMainThread) {
    return new Promise((resolve, reject) => {
      const input = randomArray(100, 200);
      // run thread and pass info
      const worker = new Worker("./src/worker/sort.executor.js", {
        workerData: { value: input },
      });
      worker.on("message", (result) => {
        //console.log(result);
        resolve(result);
      });
      worker.on("error", () => {
        console.error("Error on worker");
        reject();

      });
      worker.on("exit", (code) => {
        if (code !== 0) reject(new Error(`Worker stopped with exit code ${code}`));
        //else console.log("Worker stopped " + code);
      });
    });
    
  } else console.error("Main thread thread! -----> Abort!!");
};
