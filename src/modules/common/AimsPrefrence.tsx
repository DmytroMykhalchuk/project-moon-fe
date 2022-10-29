import { ListItem, IconButton, Box, Typography } from "@mui/material";
import RestoreIcon from '@mui/icons-material/Restore';
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';
import ListItemButton from '@mui/material/ListItemButton';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { connect, ConnectedProps } from "react-redux";
import { AppStateType } from "../../redux/store";
import ListItemText from '@mui/material/ListItemText';
import List from '@mui/material/List';
import { deleteTask, restoreTask } from "../../redux/appReducer";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useState } from "react";

type ActionButtonsType = {
   restoreTask: (arg1: string, arg2: string, arg3: Object) => void
   deleteTask: (arg1: string, arg2: string, arg3: Object) => void
   category: string
   id: string
   object: string
   setIsOpenConfirmation?: (arg1: boolean) => void
   isOpenConfirmation?: boolean

}
const ActionButtonsFinished = ({ restoreTask, deleteTask, category, id, object }: ActionButtonsType) => {
   return (
      <Box sx={{ display: 'flex', }}>
         <IconButton aria-label="restore"
            onClick={() => { restoreTask(category, id, object) }}>
            <RestoreIcon />
         </IconButton>
         <IconButton aria-label="delete"
            onClick={() => { deleteTask(category, id, object) }}>
            <DeleteSweepIcon />
         </IconButton>
      </Box>
   )
}
const ActionButtonsTrash = ({ restoreTask, deleteTask, category, id, object, setIsOpenConfirmation = () => { }, isOpenConfirmation = false }: ActionButtonsType) => {
   return (
      <>
         <ConfirmWindow
            setIsOpenConfirmation={setIsOpenConfirmation}
            isOpenConfirmation={isOpenConfirmation}
            category={category}
            id={id}
            object={object}
            deleteTask={deleteTask}
         />
         <Box sx={{ display: 'flex', }}>
            <IconButton aria-label="restore"
               onClick={() => { restoreTask(category, id, object) }}>
               <RestoreIcon />
            </IconButton>
            <IconButton aria-label="delete"
               onClick={() => { setIsOpenConfirmation(true) }}>
               <DeleteForeverIcon />
            </IconButton>
         </Box>
      </>
   )
}
type ConfirmWindowType = {
   isOpenConfirmation: boolean,
   setIsOpenConfirmation: (arg: boolean) => void
   category: string
   id: string
   object: Object
   deleteTask: (arg1: string, arg2: string, arg3: Object) => void
}
const ConfirmWindow = ({
   isOpenConfirmation,
   setIsOpenConfirmation,
   category, id, object,
   deleteTask
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
               deleteTask(category, id, object);
               setIsOpenConfirmation(false);
            }} autoFocus>
               Підтвердити
            </Button>
         </DialogActions>
      </Dialog>
   )
}
type AimPreferenceType = {
   listFinished?: any
   listInTrash?: any
   listName: string
}
const AimsPreference = ({
   listInTrash = '',
   listFinished = '',
   restoreTask,
   deleteTask,
   listName }: AimPreferenceType & HeaderProps) => {
   const [isOpenConfirmation, setIsOpenConfirmation] = useState(false)
   const showListFinished = (currentList: any) => {
      const ret = [];
      for (const key in currentList) {
         if (Object.prototype.hasOwnProperty.call(currentList, key)) {
            const element = currentList[key];
            if (element.isFinished && !element.isInTrash)
               ret.push(<ListItem
                  key={key}
                  disablePadding
                  disableGutters
                  divider
                  sx={{ height: '50px', padding: '0 10px' }}
                  secondaryAction={
                     <ActionButtonsFinished
                        restoreTask={restoreTask}
                        deleteTask={deleteTask}
                        category={listName}
                        id={key}
                        object={element}
                     />
                  }
               >
                  <ListItemText primary={
                     <Typography variant="body2">
                        {element.text}
                     </Typography>
                  } />

               </ListItem>)
         }
      }
      if (ret.length === 0) {
         ret.push(<ListItem
            key={1}
            disablePadding
            disableGutters
            divider
            sx={{ height: '50px', padding: '0 10px' }}

         >
            <ListItemText primary={
               <Typography variant="body2">
                  Не знайдено
               </Typography>
            } />

         </ListItem>)
      }
      return ret;
   }
   const showListInTrash = (currentList: any) => {
      const ret = [];
      for (const key in currentList) {
         if (Object.prototype.hasOwnProperty.call(currentList, key)) {
            const element = currentList[key];
            if (element.isInTrash)

               ret.push(<ListItem
                  key={key}
                  disablePadding
                  disableGutters
                  divider
                  sx={{ height: '50px', padding: '0 10px' }}
                  secondaryAction={
                     <ActionButtonsTrash
                        restoreTask={restoreTask}
                        deleteTask={deleteTask}
                        category={listName}
                        id={key}
                        object={element}
                        setIsOpenConfirmation={setIsOpenConfirmation}
                        isOpenConfirmation={isOpenConfirmation}
                     />
                  }
               >
                  <ListItemText primary={
                     <Typography variant="body2">
                        {element.text}
                     </Typography>
                  } />

               </ListItem>)
         }
      }
      if (ret.length === 0) {
         ret.push(<ListItem
            key={1}
            disablePadding
            disableGutters
            divider
            sx={{ height: '50px', padding: '0 10px' }}

         >
            <ListItemText primary={
               <Typography variant="body2">
                  Не знайдено
               </Typography>
            } />

         </ListItem>)
      }
      return ret;
   }
   if (listFinished) {
      return (
         <>
            <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
               {showListFinished(listFinished)}
            </List>
         </>

      );
   } else {
      return (
         <>

            <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
               {showListInTrash(listInTrash)}
            </List>
         </>

      );
   }


}

const mapStateToProps = (state: AppStateType) => {
   return {
   }
}
const mapDispatchToProps = (dispatch: any) => {
   return {
      restoreTask: (category: string, id: string | number, object: Object) => {
         dispatch(restoreTask(category, id, object))
      },
      deleteTask: (category: string, id: string | number, object: Object) => {
         dispatch(deleteTask(category, id, object))
      }
   }
}

const connector = connect(mapStateToProps, mapDispatchToProps);
type HeaderProps = ConnectedProps<typeof connector>;
export default connector(AimsPreference);