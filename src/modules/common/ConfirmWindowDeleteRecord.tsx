import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { deleteDailyRecord } from '../../redux/appReducer';
import { grey } from '@mui/material/colors'
import Box from '@mui/material/Box'
import { AppDispatch } from '../../redux/store';
import { useDispatch } from 'react-redux';

type ConfirmWindowType = {
   isOpenConfirmation: boolean,
   setIsOpenConfirmation: (arg: boolean) => void
   id: string
   handleCloseDialog: () => void
}

export const ConfirmWindowDeleteRecord = ({
   isOpenConfirmation,
   setIsOpenConfirmation,
   id, handleCloseDialog
}: ConfirmWindowType) => {
   const dispatch: any = useDispatch()
   return (
      <Dialog
         open={isOpenConfirmation}
         onClose={() => { setIsOpenConfirmation(false) }}
         aria-labelledby="alert-dialog-title"
         aria-describedby="alert-dialog-description"
      >
         <Box sx={{ backgroundColor: grey[900] }}>

            <DialogTitle id="alert-dialog-title">
               Видалити запис?
            </DialogTitle>
            <DialogContent>
               <DialogContentText id="alert-dialog-description">
                  Відновити запис буде неможливо, ви впевнені?
               </DialogContentText>
            </DialogContent>
            <DialogActions>
               <Button onClick={() => { setIsOpenConfirmation(false) }}>Скасувати</Button>
               <Button sx={{ color: 'bgmode.light' }} onClick={() => {
                  dispatch(deleteDailyRecord(id))
                  setIsOpenConfirmation(false);
                  handleCloseDialog()
               }}>
                  Підтвердити
               </Button>
            </DialogActions></Box>
      </Dialog>
   )
}