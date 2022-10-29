import React from "react";
import { Global } from '@emotion/react';
import Box from '@mui/material/Box';
import { Fab } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { useEffect, useRef } from 'react';
import DrawerSwipe from './DrawerSwipe';

type MessagePageType = {
   setOpen: (arg: boolean) => void
   open: boolean
   sendMessageHandler: () => void,
   switcherHandler: () => void
}

const MessagePage = ({ setOpen, open, sendMessageHandler, switcherHandler }: MessagePageType) => {
   const dummy = useRef();
   useEffect(() => {
      // @ts-ignore
      dummy.current.scrollIntoView();
   }, []);

   return (
      <>
         <Fab color="secondary"
            onClick={() => { setOpen(true); }}
            aria-label="edit"
            sx={{
               position: 'fixed',
               bottom: '80px',
               right: '16px'
            }}>
            <EditIcon />
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
            <Box sx={{ backgroundColor: 'purple', width: '80%', margin: '0 0 30px 20px' }}> 1 Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum autem illum est, dicta recusandae labore. Suscipit quam consequuntur, iure nam mollitia iste, exercitationem labore minima alias sed consequatur cum impedit? </Box>
            <Box sx={{ backgroundColor: 'purple', width: '80%', margin: '0 0 30px 20px' }}> 2 Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum autem illum est, dicta recusandae labore. Suscipit quam consequuntur, iure nam mollitia iste, exercitationem labore minima alias sed consequatur cum impedit? </Box>
            <Box sx={{ backgroundColor: 'purple', width: '80%', margin: '0 0 30px 20px' }}> 3 Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum autem illum est, dicta recusandae labore. Suscipit quam consequuntur, iure nam mollitia iste, exercitationem labore minima alias sed consequatur cum impedit? </Box>
            <Box sx={{ backgroundColor: 'purple', width: '80%', margin: '0 0 30px 20px' }}> 4 Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum autem illum est, dicta recusandae labore. Suscipit quam consequuntur, iure nam mollitia iste, exercitationem labore minima alias sed consequatur cum impedit? </Box>
            <Box sx={{ backgroundColor: 'purple', width: '80%', margin: '0 0 30px 20px' }}> 5 Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum autem illum est, dicta recusandae labore. Suscipit quam consequuntur, iure nam mollitia iste, exercitationem labore minima alias sed consequatur cum impedit? </Box>
            <Box sx={{ backgroundColor: 'purple', width: '80%', margin: '0 0 30px 20px' }}> 6 Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum autem illum est, dicta recusandae labore. Suscipit quam consequuntur, iure nam mollitia iste, exercitationem labore minima alias sed consequatur cum impedit? </Box>
            <Box sx={{ backgroundColor: 'purple', width: '80%', margin: '0 0 30px 20px' }}> 7 Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum autem illum est, dicta recusandae labore. Suscipit quam consequuntur, iure nam mollitia iste, exercitationem labore minima alias sed consequatur cum impedit? </Box>
            <Box sx={{ backgroundColor: 'purple', width: '80%', margin: '0 0 30px 20px' }}> 8 Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum autem illum est, dicta recusandae labore. Suscipit quam consequuntur, iure nam mollitia iste, exercitationem labore minima alias sed consequatur cum impedit? </Box>
            <Box sx={{ backgroundColor: 'purple', width: '80%', margin: '0 0 30px 20px' }}> 1Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum autem illum est, dicta recusandae labore. Suscipit quam consequuntur, iure nam mollitia iste, exercitationem labore minima alias sed consequatur cum impedit? </Box>
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



export default MessagePage;
