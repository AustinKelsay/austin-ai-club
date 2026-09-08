import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import SovereignWallpaper from "./features/brand/SovereignWallpaper.jsx";
import "./styles.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <SovereignWallpaper />
    <App />
  </React.StrictMode>,
);
