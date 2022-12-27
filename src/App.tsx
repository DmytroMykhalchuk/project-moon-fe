import "./App.css";
import { connect, useSelector } from "react-redux";
import { getIsAuthorize, getIsFetching } from "./redux/authSelector";
import { Route, Routes } from "react-router-dom";
import AuthRouter from "./modules/auth/AuthRouter";
import AppRouter from "./modules/main/AppRouter";
import Preloader from "./modules/common/Preloader";
import Box from '@mui/material/Box'
import './modules/common/bg.css'

export const App = () => {

  return <Box>
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
};


