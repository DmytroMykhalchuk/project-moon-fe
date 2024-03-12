import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { deleteTag } from '../../redux/appReducer';
import { grey } from '@mui/material/colors'
import Box from '@mui/material/Box'
import { useDispatch } from 'react-redux';

type ConfirmWindowType = {
   isOpenConfirmation: boolean,
   setIsOpenConfirmation: (arg: boolean) => void
   tag: string

}

export const ConfirmWindowDeleteTag: React.FC<ConfirmWindowType> = ({
   isOpenConfirmation,
   setIsOpenConfirmation,
   tag
}) => {
   const dispatch: any = useDispatch()
   const onConfirm = () => {
      setIsOpenConfirmation(false);
      dispatch(deleteTag(tag))
   }
   return (
      <Dialog
         open={isOpenConfirmation}
         onClose={() => { setIsOpenConfirmation(false) }}
         aria-labelledby="alert-dialog-title"
         aria-describedby="alert-dialog-description"
      >
         <Box sx={{ backgroundColor: grey[900] }}>

            <DialogTitle id="alert-dialog-title">
               Видалити тег?
            </DialogTitle>
            <DialogContent>
               <DialogContentText id="alert-dialog-description">
                  Відновити тег буде неможливо, ви впевнені?
               </DialogContentText>
            </DialogContent>
            <DialogActions>
               <Button onClick={() => { setIsOpenConfirmation(false) }}>Скасувати</Button>
               <Button onClick={onConfirm}>Підтвердити</Button>
            </DialogActions></Box>
      </Dialog>
   )
}