import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getInfoUser } from "../../../redux/appReducer";
import { getIsFetchingApp, getiSInitApp } from "../../../redux/appStateSelector";
import { AppDispatch } from "../../../redux/store";
import FrontPage from "./FrontPage";
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

const FrontPageContainer: React.FC = () => {
   const dispatch: AppDispatch = useDispatch();

   const isInit = useSelector(getiSInitApp);
   const isFetching = useSelector(getIsFetchingApp)

   useEffect(() => {
      isInit || dispatch(getInfoUser())
   }, [])



   return (<>
      <Backdrop
         sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
         open={isFetching}
      >
         <CircularProgress color="inherit" />
      </Backdrop>
      <FrontPage />
   </>
   )
}


export default FrontPageContainer;
