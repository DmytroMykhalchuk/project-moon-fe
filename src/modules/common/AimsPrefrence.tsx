import { connect, ConnectedProps } from "react-redux";
import { AppStateType } from "../../redux/store";
import ListItemText from '@mui/material/ListItemText';
import List from '@mui/material/List';
import { deleteTaskThunk, restoreTaskThunk, TaskType, } from "../../redux/appReducer";
import { useState } from "react";
import { ListItem, Typography } from "@mui/material";
import { ActionButtonsTrash, ActionButtonsFinished } from './ActionButtons'

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
                        {element.aim}
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
                        {element.aim}
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
      restoreTask: (category: string, id: string, object: TaskType) => {
         dispatch(restoreTaskThunk(category, id, object))
      },
      deleteTask: (category: string, id: string, object: TaskType) => {
         dispatch(deleteTaskThunk(category, id, object))
         // console.log(category, id, object);
      }
      // toTrash:(category: string, id: string, object: TaskType)=>{
      //    dispatch(toTrashTask(category,id,task))
      // }
   }
}

const connector = connect(mapStateToProps, mapDispatchToProps);
type HeaderProps = ConnectedProps<typeof connector>;
export default connector(AimsPreference);