import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { checkOnline, getInfoUser } from "../../../redux/appReducer";
import { getIsFetchingApp, getiSInitApp, getLastOnline } from "../../../redux/appStateSelector";
import { AppDispatch } from "../../../redux/store";
import FrontPage from "./FrontPage";
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { Box } from "@mui/system"
import { CiteDisplay } from "./CiteDisplay";
import Fade from '@mui/material/Fade';
import Collapse from '@mui/material/Collapse';

const FrontPageContainer: React.FC = () => {
   const dispatch: AppDispatch = useDispatch();

   const isInit = useSelector(getiSInitApp);
   const isFetching = useSelector(getIsFetchingApp)
   const lastOnline = useSelector(getLastOnline);
   const [isShowCite, setisShowCite] = useState(true)

   useEffect(() => {
      isInit || dispatch(getInfoUser())
      if (isInit) {
         const currTime = new Date();
         const onlineDay = new Date(currTime.getFullYear(), currTime.getMonth(), currTime.getDate())
         let last = new Date(lastOnline);
         if (last.getTime() !== onlineDay.getTime()) {
            setisShowCite(true)

         } else {
            setisShowCite(false)
         }
      }
      setTimeout(() => { setisShowCite(false); dispatch(checkOnline()); }, 4000)
   }, [])


   // if (isInit) {
   //    const currTime = new Date();
   //    const onlineDay = new Date(currTime.getFullYear(), currTime.getMonth(), currTime.getDate())
   //    let last = new Date(lastOnline);
   //    if (last.getTime() !== onlineDay.getTime()) {

   //       // return (
   //       //    <CiteDisplay />
   //       // )
   //    }
   // }
   // // console.log(last,currTime)

   return (<>
      <Backdrop
         sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
         open={isFetching}
      >
         <CircularProgress color="inherit" />
      </Backdrop>
      {isShowCite &&
         <Fade in={isShowCite} unmountOnExit >
            <Box>
               <CiteDisplay />
            </Box>
         </Fade>
      }
      <Fade in={!isShowCite} unmountOnExit >
         <Box>
            <FrontPage />
         </Box>
      </Fade>

   </>
   )
}


export default FrontPageContainer;

