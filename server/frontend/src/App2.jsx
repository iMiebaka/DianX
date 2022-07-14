import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import axios from "axios";

const App2 = () => {
  const [count, setCount] = useState(0);
  const [apiResult, setApiResult] = useState("")
  useEffect(() => {
    let mounted = true;
    if (mounted) {
      axios.get("http://127.0.0.1:3333/api/v1/dian").then((res) => {
        if(res.status == 200){
          setApiResult(res.data.message)
          console.log(res);
        }
      });
    }

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div className="App">
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src="/vite.svg" className="logo" alt="Vite logo" />
        </a>
        <a href="https://reactjs.org" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      <p className="text-xlg">{apiResult}</p>
    </div>
  );
}

export default App2;
