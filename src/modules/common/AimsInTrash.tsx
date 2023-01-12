import React from 'react'
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store";
import ListItemText from '@mui/material/ListItemText';
import List from '@mui/material/List';
import { deleteTaskThunk, restoreTaskThunk, TaskType, } from "../../redux/appReducer";
import { useState } from "react";
import Typography from '@mui/material/Typography'
import ListItem from '@mui/material/ListItem'
import Collapse from '@mui/material/Collapse'
import Box from '@mui/material/Box'
import { TransitionGroup } from 'react-transition-group'
import { ActionButtonsTrash } from './ActionButtons'
import { BACKGROUND_COLOR_CARDS } from '../../themes';
import { ListItemNotFound } from './ListItemNotFound';
import ExpandLess from '@mui/icons-material/ExpandLess'
import ExpandMore from '@mui/icons-material/ExpandMore'
import ListItemIcon from '@mui/material/ListItemIcon'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import ListItemButton from '@mui/material/ListItemButton'
import styles from './style.module.scss'
const titleOfButton = 'Корзина'

type AimsInTrashType = {
   listName: string
   list: any
}

export const AimsInTrash: React.FC<AimsInTrashType> = ({ listName, list }) => {
   const dispatch: AppDispatch = useDispatch()
   const [isOpen, setIsOpen] = useState(false)
   const [isOpenConfirmation, setIsOpenConfirmation] = useState(false)

   const restoreTask = (category: string, id: string, object: TaskType) => {
      dispatch(restoreTaskThunk(category, id, object))
   }
   const deleteTask = (category: string, id: string, object: TaskType) => {
      dispatch(deleteTaskThunk(category, id, object))
   }
   const renderList = () => {
      let numberActiveItems = 0
      const ret = [];
      for (const key in list) {
         if (Object.prototype.hasOwnProperty.call(list, key)) {
            const element = list[key];
            numberActiveItems += element.isInTrash
            ret.push(
               <Collapse in={element.isInTrash} key={key}>
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
      if (numberActiveItems === 0) return <ListItemNotFound />
      return <TransitionGroup>
         <List sx={{ width: '100%'}}>
            {ret}
         </List>
      </TransitionGroup>
   }
   return <Box>
      <ListItemButton data-list-name={`trash-${listName}`} onClick={() => setIsOpen((prev: boolean) => !prev)}>
         <ListItemIcon sx={{ color: 'bgmode.light' }}>
            <DeleteOutlineIcon />
         </ListItemIcon>
         <ListItemText primary={titleOfButton} />
         {isOpen ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={isOpen}>
         {renderList()}
      </Collapse>
   </Box>
}

