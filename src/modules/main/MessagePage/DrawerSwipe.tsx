import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import SendIcon from '@mui/icons-material/Send';
import { TextField } from '@mui/material';
import { styled } from '@mui/material/styles';
import { grey } from '@mui/material/colors';
import { Global } from '@emotion/react';
import Box from '@mui/material/Box';
const StyledBox = styled(Box)(({ theme }) => ({
   backgroundColor: theme.palette.mode === 'light' ? '#fff' : grey[800],
}));

const Puller = styled(Box)(({ theme }) => ({
   width: 30,
   height: 6,
   backgroundColor: theme.palette.mode === 'light' ? grey[300] : grey[900],
   borderRadius: 3,
   position: 'absolute',
   top: 8,
   left: 'calc(50% - 15px)',
}));

type DrawerSwipeType = {
   setOpen: (arg: boolean) => void
   open: boolean
   sendMessageHandler: () => void,
   switcherHandler: () => void
   window?: any
}

const DrawerSwipe = ({ switcherHandler, open, setOpen, sendMessageHandler, window }: DrawerSwipeType) => {
   return (
      <>
         <Global
            styles={{
               '.MuiDrawer-root > .MuiPaper-root': {
                  height: `100px`,
                  overflow: 'visible',
               },
            }}
         />
         <SwipeableDrawer
            //@ts-ignore
            container={window !== undefined ? () => window().document.body : undefined}
            anchor="bottom"
            open={open}
            onClose={() => switcherHandler()}
            onOpen={() => switcherHandler()}
            swipeAreaWidth={0}
            disableSwipeToOpen={true}
            ModalProps={{
               keepMounted: false,
            }}
         >
            <StyledBox
               sx={{
                  position: 'absolute',
                  top: '-28px',
                  height: '100%',
                  borderTopLeftRadius: 8,
                  borderTopRightRadius: 8,
                  visibility: 'visible',
                  right: 0,
                  left: 0,
                  zIndex:'-1'
               }}
            >
               <Puller />
               <Typography sx={{ p: 2, color: 'text.secondary', opacity: 0 }}>fh</Typography>
            </StyledBox>
            <StyledBox
               sx={{
                  px: 2,
                  pb: 2,
                  height: '100%',
                  overflow: 'auto',
               }}
            >
              У розробці
               {/* <Box className='row'>

                  <TextField
                     // onChange={onChangeMessageHandler}
                     id="outlined-multiline-static"
                     // rows={1}
                     size="small"
                     defaultValue="Day 32"
                     fullWidth
                     autoFocus
                     style={{
                        padding: '0',
                        backgroundColor: 'green',
                        outline: 'none'
                     }}
                     sx={{ padding: '0' }}
                  />
                  <Button onClick={() => sendMessageHandler()}>
                     <SendIcon />
                  </Button>
               </Box> */}
            </StyledBox>
         </SwipeableDrawer>
      </>
   )
}
export default DrawerSwipe;