import * as React from "react";
import "./styles.css";

import workers from "./workers.js";

export default function App() {
  React.useEffect(() => {
    message();
  }, []);

  async function message() {
    const response = await workers.myWorker.postMessage("hello");

    console.log(response);
  }

  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>
    </div>
  );
}
