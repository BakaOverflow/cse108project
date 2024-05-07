import React from "react";
import ReactDOM from 'react-dom/client';
import { createRoot } from "react-dom/client";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import "./app.css";

const root = createRoot(document.getElementById("root"));
root.render(<App />);