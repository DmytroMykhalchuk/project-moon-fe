import "./App.css";
import { useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import AppRouter from "./modules/main/AppRouter";
import Box from '@mui/material/Box'
import './modules/common/bg.css'
import { ThemeProvider } from "@mui/material"
import { getThemeColor } from "./redux/appStateSelector";
import { THEME, themes } from "./themes";

export const App = () => {
  const themeColor = useSelector(getThemeColor)
  return <ThemeProvider theme={themes[THEME + themeColor]}>
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


