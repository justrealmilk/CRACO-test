import registerPromiseWorker from "promise-worker/register";

registerPromiseWorker((message) => {
  console.log(message);
  if (message === "hello") {
    return Promise.resolve("sup");
  } else {
    return Promise.reject(new Error("Unknown message received by worker."));
  }
});
