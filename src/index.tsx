import React from "react";
import ReactDOM from "react-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import App from "./app/App";

import "./index.css";

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={createTheme()}>
      <App />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root"),
);
