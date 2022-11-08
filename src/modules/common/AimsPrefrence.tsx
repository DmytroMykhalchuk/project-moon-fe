import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store";
import ListItemText from '@mui/material/ListItemText';
import List from '@mui/material/List';
import { deleteTaskThunk, restoreTaskThunk, TaskType, } from "../../redux/appReducer";
import { useState } from "react";
import { Collapse, ListItem, Typography } from "@mui/material";
import { ActionButtonsTrash, ActionButtonsFinished } from './ActionButtons'

type AimPreferenceType = {
   listFinished?: any
   listInTrash?: any
   listName: string
}
const AimsPreference: React.FC<AimPreferenceType> = ({
   listInTrash = '',
   listFinished = '',
   listName }) => {

   const dispatch: AppDispatch = useDispatch();
   const [isOpenConfirmation, setIsOpenConfirmation] = useState(false)
   const deleteTask = (category: string, id: string, object: TaskType) => {
      dispatch(deleteTaskThunk(category, id, object))
   }
   const restoreTask = (category: string, id: string, object: TaskType) => {
      dispatch(restoreTaskThunk(category, id, object))
   }
   const showListFinished = (currentList: any) => {
      const ret = [];
      let counter = 0;
      for (const key in currentList) {
         if (Object.prototype.hasOwnProperty.call(currentList, key)) {
            const element = currentList[key];
            counter += element.isFinished && !element.isInTrash;
            ret.push(
               <Collapse key={key} in={element.isFinished && !element.isInTrash}>
                  <ListItem

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

                  </ListItem>
               </Collapse >
            )
         }
      }
      if (counter === 0) {
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
      let counter = 0;
      for (const key in currentList) {
         if (Object.prototype.hasOwnProperty.call(currentList, key)) {
            const element = currentList[key];
            counter += element.isFinished && element.isInTrash;

            ret.push(
               <Collapse in={element.isFinished && element.isInTrash} key={key}>
                  <ListItem
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

                  </ListItem>
               </Collapse>
            )
         }
      }
      if (counter === 0) {
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
            <List sx={{ width: '100%', backgroundColor: '#2e2e2ec9' }}>
               {showListFinished(listFinished)}
            </List>
         </>

      );
   } else {
      return (
         <>

            <List sx={{ width: '100%', backgroundColor: '#2e2e2ec9' }}>
               {showListInTrash(listInTrash)}
            </List>
         </>

      );
   }
}
export default AimsPreference;