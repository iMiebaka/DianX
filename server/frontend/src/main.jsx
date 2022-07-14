import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import App2 from "./App2";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
      <Route exact path="" element={<App />} />
        <Route exact path="dian" element={<App2 />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
