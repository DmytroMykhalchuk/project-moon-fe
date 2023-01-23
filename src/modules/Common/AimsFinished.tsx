import React, { useState } from 'react'
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store";
import ListItemText from '@mui/material/ListItemText';
import List from '@mui/material/List';
import { deleteTaskThunk, restoreTaskThunk, TaskType, } from "../../redux/appReducer";
import Typography from '@mui/material/Typography'
import ListItem from '@mui/material/ListItem'
import Collapse from '@mui/material/Collapse'
import Box from '@mui/material/Box'
import { TransitionGroup } from 'react-transition-group'
import { ActionButtonsTrash } from './ActionButtons'
import { ListItemNotFound } from './ListItemNotFound';
import ExpandLess from '@mui/icons-material/ExpandLess'
import ExpandMore from '@mui/icons-material/ExpandMore'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemButton from '@mui/material/ListItemButton'
import DoneAllIcon from '@mui/icons-material/DoneAll'
import styles from './style.module.scss'

const titleOfButton = 'Завершені'

type AimsInTrashType = {
   listName: string
   list: any
}

export const AimsFinished: React.FC<AimsInTrashType> = React.memo(({ listName, list }) => {
   const dispatch: any = useDispatch()
   const [isOpen, setIsOpen] = useState(false)
   const [isOpenConfirmation, setIsOpenConfirmation] = useState(false)

   const restoreTask = (category: string, id: string, object: TaskType) => {
      dispatch(restoreTaskThunk(category, id, object))
   }
   const deleteTask = (category: string, id: string, object: TaskType) => {
      dispatch(deleteTaskThunk(category, id, object))
   }
   const renderList = () => {
      const ret = [];
      for (const key in list) {
         if (Object.prototype.hasOwnProperty.call(list, key)) {
            const element = list[key];
            element.isFinished && !element.isInTrash && ret.push(
               <Collapse key={key} unmountOnExit>
                  <ListItem
                     className={styles.listItem + " " + styles.listItem__dense}
                     key={key}
                     disablePadding
                     disableGutters
                     divider
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
      if (ret.length === 0) return <ListItemNotFound />
      return <List sx={{ width: '100%' }}>
         <TransitionGroup>
            {ret}
         </TransitionGroup>
      </List>

   }

   return <Box>
      <ListItemButton data-list-name={`trash-${listName}`} onClick={() => setIsOpen((prev: boolean) => !prev)}>
         <ListItemIcon sx={{ color: 'bgmode.light' }}>
            <DoneAllIcon />
         </ListItemIcon>
         <ListItemText primary={titleOfButton} />
         {isOpen ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={isOpen} unmountOnExit>
         {renderList()}
      </Collapse>
   </Box>
})

