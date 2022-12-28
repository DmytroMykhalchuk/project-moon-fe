import React, { useState } from "react";
import { Global } from '@emotion/react';
import Box from '@mui/material/Box';
import { Fab } from '@mui/material';
import { useEffect, useRef } from 'react';
import DrawerSwipe from './DrawerSwipe';
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../redux/store";
import { getIsBadge, getMessagesState } from "../../../redux/appStateSelector";
import Collapse from '@mui/material/Collapse';
import DoneIcon from '@mui/icons-material/Done';
import SettingsIcon from '@mui/icons-material/Settings';
import { checkMessageThunk } from "../../../redux/appReducer";



export const MessagePage: React.FC = React.memo(() => {
   const dummy = useRef();
   const dispatch: AppDispatch = useDispatch();
   const [open, setOpen] = useState(false);


   const messages = useSelector(getMessagesState)
   const isBadge = useSelector(getIsBadge)
   const sendMessageHandler = () => {
      setOpen(false);
   }

   const switcherHandler = () => {
      setOpen(!open)
   }
   const checkMessage = () => {
      dispatch(checkMessageThunk())
   }
   const onScrollDummy = () => {
      // @ts-ignore
      dummy.current.scrollIntoView({ behavior: 'smooth' });
   }
   useEffect(() => {
      onScrollDummy();
   }, []);

   const showMessages = () => {
      let ret = [];
      for (const item in messages) {
         if (Object.prototype.hasOwnProperty.call(messages, item)) {
            const element = messages[item];
            ret.push(
               <Collapse in={element.isChecked} key={item}>
                  <Box sx={{
                     //  backgroundColor: '#3d3', 
                     backgroundColor: '#fff',
                     color: '#000',
                     width: '75%', margin: '0 0 30px 20px', p: 2, borderRadius: '20px'
                  }}>
                     {element.text}
                  </Box>
               </Collapse>
            )
         }
      }
      return (ret)
   }

   return (
      <Box sx={{ position: 'relative' }}>
         <Fab
            onClick={() => {
               if (isBadge) {
                  setTimeout(() => {
                     onScrollDummy();
                  }, 900)

                  checkMessage()
               } else {
                  setOpen(true);
               }

            }}
            aria-label="edit"
            sx={{
               position: 'fixed',
               bottom: '80px',
               right: '16px',
               backgroundColor: '#fff'
            }}>
            {isBadge ? <DoneIcon /> : <SettingsIcon />}
         </Fab>

         <Global
            styles={{
               '.MuiDrawer-root > .MuiPaper-root': {
                  height: `70px`,
                  overflow: 'visible',
               },
            }}
         />

         <Box>
            {showMessages()}
            <Box ref={dummy} />
         </Box>
         <DrawerSwipe
            setOpen={setOpen}
            open={open}
            sendMessageHandler={sendMessageHandler}
            switcherHandler={switcherHandler}
            onScrollDummy={onScrollDummy}
         />
      </Box>
   );
})



