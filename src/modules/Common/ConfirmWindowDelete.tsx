import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { grey } from '@mui/material/colors'
import Box from '@mui/material/Box'

type ConfirmWindowType = {
   isOpenConfirmation: boolean,
   setIsOpenConfirmation: (arg: boolean) => void
   deleting: () => void,
   title?: string
   text?: string
}

export const ConfirmWindowDelete = ({
   isOpenConfirmation,
   setIsOpenConfirmation,
   deleting, title = '', text = ''
}: ConfirmWindowType) => {
   return (
      <Dialog
         open={isOpenConfirmation}
         onClose={() => { setIsOpenConfirmation(false) }}
         aria-labelledby="alert-dialog-title"
         aria-describedby="alert-dialog-description"
      >
         <Box sx={{ backgroundColor: grey[900] }}>
            <DialogTitle id="alert-dialog-title">
               {title}
            </DialogTitle>
            <DialogContent>
               <DialogContentText id="alert-dialog-description">
                  {text}
               </DialogContentText>
            </DialogContent>
            <DialogActions>
               <Button onClick={() => { setIsOpenConfirmation(false) }}>Скасувати</Button>
               <Button onClick={() => {
                  deleting()
                  setIsOpenConfirmation(false);
               }} autoFocus>
                  Підтвердити
               </Button>
            </DialogActions></Box>
      </Dialog>
   )
}