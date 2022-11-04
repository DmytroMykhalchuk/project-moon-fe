import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {TaskType} from './../../redux/appReducer';


type ConfirmWindowType = {
   isOpenConfirmation: boolean,
   setIsOpenConfirmation: (arg: boolean) => void
   category: string
   id: string
   object: TaskType
   deleteTask: (arg1: string, arg2: string, arg3: TaskType) => void,
   setId:(arg1:string)=>void
}

export const ConfirmWindow = ({
   isOpenConfirmation,
   setIsOpenConfirmation,
   category, id, object,
   deleteTask,setId
}: ConfirmWindowType) => {
   return (
      <Dialog
         open={isOpenConfirmation}
         onClose={() => { setIsOpenConfirmation(false) }}
         aria-labelledby="alert-dialog-title"
         aria-describedby="alert-dialog-description"
      >
         <DialogTitle id="alert-dialog-title">
            Видалити запис?
         </DialogTitle>
         <DialogContent>
            <DialogContentText id="alert-dialog-description">
               Відновити запис буде неможливо, ви дійсно хочете видалити запис назавжди?
            </DialogContentText>
         </DialogContent>
         <DialogActions>
            <Button onClick={() => { setIsOpenConfirmation(false) }}>Скасувати</Button>
            <Button onClick={() => {
               setId('')
               deleteTask(category, id, object);
               setIsOpenConfirmation(false);
            }} autoFocus>
               Підтвердити
            </Button>
         </DialogActions>
      </Dialog>
   )
}