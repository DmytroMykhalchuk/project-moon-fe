import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import ListItemText from '@mui/material/ListItemText';
import ListItem from '@mui/material/ListItem';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

const Transition = React.forwardRef(function Transition(
   props: TransitionProps & {
      children: React.ReactElement;
   },
   ref: React.Ref<unknown>,
) {
   return <Slide direction="left" ref={ref} {...props} />;
});

type RecordsByTagType = {
   tag: string
   setRenderTag: (arg1: string) => void
   records: any
}
export const RecordsByTag: React.FC<RecordsByTagType> = ({ tag, setRenderTag, records }) => {
   const [open, setOpen] = React.useState(false);

   const handleClickOpen = () => {
      setOpen(true);
   };

   const handleClose = () => {
      setRenderTag('');
   };

   return (
      <div>

         <Dialog
            fullScreen
            open={!!tag}
            onClose={handleClose}
            TransitionComponent={Transition}
         >
            <AppBar sx={{ position: 'relative' }}>
               <Toolbar>
                  <IconButton
                     edge="start"
                     color="inherit"
                     onClick={handleClose}
                     aria-label="close"
                  >
                     <ArrowBackIosIcon />
                     <Typography sx={{ ml: 2, flex: 1 }} variant="subtitle1" component="div">
                        Повернутися назад
                     </Typography>
                  </IconButton>

               </Toolbar>
            </AppBar>


         </Dialog>
      </div>
   );
}