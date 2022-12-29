import "./App.css";
import { connect, useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import AuthRouter from "./modules/auth/AuthRouter";
import AppRouter from "./modules/main/AppRouter";
import Preloader from "./modules/common/Preloader";
import Box from '@mui/material/Box'
import './modules/common/bg.css'
import { createTheme, ThemeProvider } from "@mui/material"
import { getThemeColor } from "./redux/appStateSelector";

const theme = createTheme({
  palette: {
    mode: "dark",
    background: {
      // default: "#333",
      paper: "#333",
    },
    primary: {
      main: '#fff'
    },
    //@ts-ignore
    fpage: {
      main: "#EF8B6B",
      light: "#262335",
    },
  },
});
export const App = () => {

  return <ThemeProvider theme={theme}>
    <Box>
      <Routes>
        <Route path="/*" element={<AppRouter />} />
      </Routes>
      <div className="backgroundAnimationWrapper" >
        <div className="stars"></div>
        <div className="stars2"></div>
        <div className="stars3"></div>
        <div className="clouds"></div>
        <div className="clouds2"></div>
      </div>
    </Box >
  </ThemeProvider>
};


