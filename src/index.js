import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import {App} from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import store from "./redux/store.ts";
import { BrowserRouter } from "react-router-dom";
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";

//@ts-ignore
const theme = createTheme({
  palette: {
    mode: "dark",
    background: {
<<<<<<< HEAD
      default: "#3F2046",
      paper: "#46505A",
=======
      // default: "#333",
      paper: "#333",
    },
    primary:{
      main:'#fff'
>>>>>>> 451bce3 (fixed bug with starting page, added animation with stars to background)
    },
    //@ts-ignore
    fpage: {
      main: "#EF8B6B",
      light: "#262335",
    },
  },
});
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
  <Provider store={store}>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <App />
      </ThemeProvider>
    </BrowserRouter>
  </Provider>
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
