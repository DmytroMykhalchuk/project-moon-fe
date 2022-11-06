import React from "react";
import { Global } from '@emotion/react';
import Box from '@mui/material/Box';
import { Fab } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { useEffect, useRef } from 'react';
import DrawerSwipe from './DrawerSwipe';
import { connect, ConnectedProps } from "react-redux";
import { AppStateType } from "../../../redux/store";
import { getIsBadge, getMessagesState } from "../../../redux/appStateSelector";
import Collapse from '@mui/material/Collapse';
import { checkMessage } from "../../../redux/appReducer";
import DoneIcon from '@mui/icons-material/Done';
import SettingsIcon from '@mui/icons-material/Settings';

type MessagePageType = {
   setOpen: (arg: boolean) => void
   open: boolean
   sendMessageHandler: () => void,
   switcherHandler: () => void
}

const MessagePage = ({ setOpen, open, sendMessageHandler, switcherHandler, messages,checkMessage,isBadge }: MessagePageType & HeaderProps) => {
   const dummy = useRef();
   useEffect(() => {
      // @ts-ignore
      dummy.current.scrollIntoView();
   }, []);
   // let isBadge = false;
   // if (messages) {

   //    for (const item in messages) {
   //       if (Object.prototype.hasOwnProperty.call(messages, item)) {
   //         const element=messages[item];
   //       //   console.log(element.isChecked)
   //          if (!element.isChecked) {
   //             isBadge = true;
   //             break;
   //          }

   //       }
   //    }
   // }
   const showMessages = () => {
      let ret = [];
      let counter=0;
      for (const item in messages) {
         if (Object.prototype.hasOwnProperty.call(messages, item)) {
            const element = messages[item];
            // if(!element.isChecked&&counter===0){
            //    element.isChecked=true;
            //    counter++;
            // }
            ret.push(
               <Collapse in={element.isChecked} key={item}>
                  <Box sx={{ backgroundColor: '#3d3', width: '80%', margin: '0 0 30px 20px',p:2,borderRadius:'20px' }}> 
                  {element.text}
                  </Box>
               </Collapse>
            )
         }
      }
      counter=0;
      return (ret)
   }
   return (
      <>
         <Fab color="secondary"
            onClick={() => { 
            if(isBadge){
               checkMessage()
            }else{
               setOpen(true);
            }
            
            }}
            aria-label="edit"
            sx={{
               position: 'fixed',
               bottom: '80px',
               right: '16px'
            }}>
            {isBadge?<DoneIcon/>:<SettingsIcon />}
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
         />
      </>
   );
}

const mapStateToProps = (state: AppStateType) => {
   return {
      messages: getMessagesState(state),
      isBadge:getIsBadge(state)
   }
}
const mapDispatchToProps = (dispatch: any) => {
   return {
      checkMessage:()=>{
         dispatch(checkMessage())
      }
   }
}
const connector = connect(mapStateToProps, mapDispatchToProps);
type HeaderProps = ConnectedProps<typeof connector>;
export default connector(MessagePage);

