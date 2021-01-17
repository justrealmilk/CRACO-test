import PromiseWorker from "promise-worker";

const myWorker = new Worker("./worker.js", { type: "module" });
const promisedWorker = new PromiseWorker(myWorker);

export default {
  myWorker: promisedWorker
};
