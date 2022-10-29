import React from "react";
import { EventHandler, ReactEventHandler, useState } from "react";
import MessagePage from "./MessagePage"


const MessagePageContainer = () => {
   const [open, setOpen] = useState(false);
   const sendMessageHandler = () => {
      setOpen(false);
   }

   const switcherHandler = () => {
      setOpen(!open)
   }
   return (
      <MessagePage
         setOpen={setOpen}
         open={open}
         sendMessageHandler={sendMessageHandler}
         switcherHandler={switcherHandler}
      />
   )
}
export default MessagePageContainer;