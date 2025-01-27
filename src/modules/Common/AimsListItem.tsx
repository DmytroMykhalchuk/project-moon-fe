import React from 'react'
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import ListSubheader from '@mui/material/ListSubheader'
import RestoreIcon from '@mui/icons-material/Restore';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import Typography from '@mui/material/Typography'
import styles from './style.module.scss'
import { TransitionGroup } from 'react-transition-group'

type ListAimsType = {
   [id: number | string]: {
      text: string
      isInTrash: boolean
      isFinished: boolean
   }
}

type AimsListItemType = {
   currentItem: string
   side: string
   listAims: Array<ListAimsType>,
   category: string
   header: string
   completeHandler: (arg1: string, arg2: string | number) => void
   rePutHandler: (arg1: string, arg2: string | number) => void
   toggleWindow: (arg1: string, arg2: string) => void
   setIdWindow: (arg1: string) => void
   setTask: (arg1: Object) => void
   setOldCategory: (arg1: string) => void

}

export const AimsListItem: React.FC<AimsListItemType> = React.memo(({
   currentItem,
   side,
   listAims,
   category,
   setOldCategory,
   header,
   completeHandler,
   setIdWindow,
   setTask,
   rePutHandler,
   toggleWindow
}) => {

   const createTask = () => {
      if (!listAims) return <Typography variant="subtitle1" color="inherit">Не знайдено</Typography>

      let i = 0;
      let listItems = [];
      for (const id in listAims) {
         if (Object.prototype.hasOwnProperty.call(listAims, id)) {
            const element = listAims[id];
            !(element.isFinished || element.isInTrash) &&
               listItems.push(
                  <Collapse timeout={500} key={`${category}-${id}`}  >
                     <ListItem key={`${category}-${id}`}
                        data-item={`${category}-${id}`}
                        disablePadding
                        divider
                     >
                        <ListItemButton role={undefined} className={styles.listItem}>
                           <Box className={styles.listItem__leftBox}>
                              <Collapse timeout={500} in={currentItem === `${category}-${id}` && side === 'right'} className={styles.boxCollapse}
                                 orientation="horizontal"
                                 sx={{ backgroundColor: 'bgmode.main' }}
                              >
                                 <Box onClick={() => { rePutHandler(category, id) }} className={styles.wrapperBox + " " + styles.borderRight}
                                 >
                                    <RestoreIcon />
                                 </Box>
                              </Collapse>
                           </Box>
                           <ListItemText id={`${i}`} primary={`${element.aim}`} className={styles.listItem__mainBox} />
                           <Box className={styles.listItem__rightIcon} >
                              <IconButton edge="end" aria-label="completed" data-cat='cat'
                                 onClick={() => { completeHandler(category, id) }}>
                                 <EventAvailableIcon />
                              </IconButton>
                           </Box>
                           <Box sx={{ backgroundColor: 'bgmode.main' }} className={styles.listItem__rightBox}>
                              <Collapse timeout={500} in={currentItem === `${category}-${id}` && side === 'left'} className={styles.boxCollapse}
                                 sx={{ backgroundColor: 'bgmode.main' }}
                                 orientation="horizontal">
                                 <Box className={styles.wrapperBox + " " + styles.borderLeft} onClick={() => { toggleWindow(category, `${element.aim}`); setIdWindow(id); setTask(element); setOldCategory(category) }}
                                 >
                                    <ModeEditIcon />
                                 </Box>
                              </Collapse>
                           </Box>
                        </ListItemButton>
                     </ListItem>
                  </Collapse>
               )
            i++;
         }
      }
      return <ul key={i} style={{ marginBottom: header ? '20px' : '0px', backgroundColor: 'rgb(46 46 46 / 48%)', }}>
         <ListSubheader sx={{ backgroundColor: 'bgmode.dark', color: '#fff' }}>{`${header}`}</ListSubheader>
         <TransitionGroup>
            {listItems}
         </TransitionGroup>
      </ul>;


   }
   return (
      <>
         {createTask()}
      </>
   )
})