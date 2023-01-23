import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { checkOnline, getInfoUser } from "../../../redux/appReducer";
import { getIsFetchingApp, getiSInitApp, getLastOnline } from "../../../redux/appStateSelector";
import { FrontPage } from "./FrontPage";
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { Box } from "@mui/system"
import { CiteDisplay } from "./CiteDisplay";
import Fade from '@mui/material/Fade';

export const FrontPageContainer: React.FC = React.memo(() => {
   const dispatch: any = useDispatch();

   const isInit = useSelector(getiSInitApp);
   const isFetching = useSelector(getIsFetchingApp)
   const lastOnline = useSelector(getLastOnline)

   const [isRender, setIsRender] = useState(false)
   const [isShowCite, setisShowCite] = useState(true)

   useEffect(() => {
      if (isInit) {
         const currTime = new Date();
         const onlineDay = new Date(currTime.getFullYear(), currTime.getMonth(), currTime.getDate())
         let last = new Date(lastOnline);
         if (last.getTime() !== onlineDay.getTime()) {
            setisShowCite(true)
         } else {
            setisShowCite(false)
         }
         setIsRender(true)
      } else {
         dispatch(getInfoUser())
      }
      setTimeout(() => { setisShowCite(false); dispatch(checkOnline()); }, 5000)
   }, [isInit])


   if(!isRender){
      return <div></div>
   }

   return (<>
      <Backdrop
         sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
         open={isFetching}
      >
         <CircularProgress color="inherit" />
      </Backdrop>
      {/* {isShowCite && */}
         <Fade in={isShowCite} unmountOnExit >
            <Box>
               <CiteDisplay />
            </Box>
         </Fade>
      {/* // } */}
      <Fade in={!isShowCite} unmountOnExit >
         <Box>
            <FrontPage />
         </Box>
      </Fade>

   </>
   )
})



