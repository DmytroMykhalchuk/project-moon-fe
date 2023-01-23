import React, { useState } from "react";
import { Global } from '@emotion/react';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import { useEffect, useRef } from 'react';
import DrawerSwipe from './DrawerSwipe';
import { useDispatch, useSelector } from "react-redux";

import { getIsBadge, getMessagesState } from "../../../redux/appStateSelector";
import DoneIcon from '@mui/icons-material/Done';
import SettingsIcon from '@mui/icons-material/Settings';
import { checkMessageThunk } from "../../../redux/appReducer";
import Grow from '@mui/material/Grow'


export const MessagePage: React.FC = React.memo(() => {
   const dummy = useRef<HTMLDivElement>(null);
   const wrapperMessagesRef = useRef();
   const dispatch: any = useDispatch();
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
      dummy.current && dummy.current.scrollIntoView({ behavior: 'smooth' });
   }
   useEffect(() => {
      onScrollDummy()
   }, []);
   useEffect(() => {
      dummy.current && dummy.current.scrollIntoView({ behavior: 'smooth' });
      //@ts-ignore
   }, [wrapperMessagesRef.current?.getBoundingClientRect().height])
   const showMessages = () => {
      let ret = [];
      for (const item in messages) {
         if (Object.prototype.hasOwnProperty.call(messages, item)) {
            const element = messages[item];
            ret.push(
               <Grow in={element.isChecked} key={item} mountOnEnter unmountOnExit>
                  <Box sx={{
                     //  backgroundColor: '#3d3', 
                     backgroundColor: '#fff',
                     color: '#000',
                     width: '75%', margin: '0 0 30px 20px', p: 2, borderRadius: '20px'
                  }}>
                     {element.text}
                  </Box>
               </Grow>
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
               backgroundColor: 'bgmode.dark',
               color:'bgmode.circle',

               '&:hover': {
                  backgroundColor: 'bgmode.light'
               }
            }}>
            {isBadge ? <DoneIcon /> : <SettingsIcon />}
         </Fab>

         <Global styles={{
            '.MuiDrawer-root > .MuiPaper-root': {
               height: `70px`,
               overflow: 'visible',
            },
         }}
         />

         <Box ref={wrapperMessagesRef}>
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



