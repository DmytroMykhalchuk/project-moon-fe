import React, { useState } from "react"
import { Card, CardContent, Fab, Typography } from "@mui/material";
import { Box } from "@mui/system"
import { Aims } from "../../common/Aims";
import AimsPreference from "../../common/AimsPrefrence";
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import DialogWindow from "../../common/DialogWindow";
import { getDay, getListDay, getListMain, getListMonth, getListWeek, getMain, getMonth, getWeek } from "../../../redux/appStateSelector";
import { useSelector } from "react-redux";
import AddIcon from '@mui/icons-material/Add';
import { CardPreferenceItem } from "../../common/CardPreferenceItem";


export const PreferencePage: React.FC = React.memo(() => {

   const listConfig: any = {
      main: { list: useSelector(getMain), header: "Мрія" },
      month: { list: useSelector(getMonth), header: "Цілі на місяць" },
      week: { list: useSelector(getWeek), header: "Цілі на тиждень" },
      day: { list: useSelector(getDay), header: "Цілі на день" },
      trashName: 'Корзина',
      finishedName: 'Завершені'
   }
   const [openFinished, setOpenFinished] = useState('')
   const [openTrash, setOpenTrash] = useState('')
   const [isOpenDialog, setIsOpenDialog] = useState(false);

   // const onOpenFinishedList = (el: any) => {
   //    el = el.target;
   //    const maxDepth = 5;
   //    let i = 0;
   //    let currentEl = null;
   //    while (true) {
   //       currentEl = el.parentNode;
   //       el = currentEl;
   //       i++;
   //       if (maxDepth < i || el.hasAttribute('data-list-name')) {
   //          break;
   //       }
   //    }
   //    setOpenFinished(prev => {
   //       if (prev === el.getAttribute('data-list-name')) {
   //          return false;
   //       } else {
   //          return el.getAttribute('data-list-name');
   //       }
   //    });
   // }
   // const onOpenTrashList = (el: any) => {
   //    el = el.target;
   //    const maxDepth = 5;
   //    let i = 0;
   //    let currentEl = null;
   //    while (true) {
   //       currentEl = el.parentNode;
   //       el = currentEl;
   //       i++;
   //       if (maxDepth < i || el.hasAttribute('data-list-name')) {
   //          break;
   //       }
   //    }
   //    setOpenTrash(prev => {
   //       if (prev === el.getAttribute('data-list-name')) {
   //          return false;
   //       } else {
   //          return el.getAttribute('data-list-name');
   //       }
   //    });
   // }
   // console.log(listConfig.week.list)
   return (
      <Box>

         <DialogWindow isOpenDialog={isOpenDialog} setIsOpenDialog={setIsOpenDialog} />
         <Fab color="secondary"
            onClick={() => { setIsOpenDialog(true); }}
            aria-label="edit"
            sx={{
               position: 'fixed',
               bottom: '80px',
               right: '16px',
               backgroundColor: 'bgmode.light',
               color:'bgmode.circle',
               '&:hover': {
                  backgroundColor: 'bgmode.dark'
               }}
            } >
               <AddIcon />
         </Fab>
         {/* 
         {['day', 'week', 'month', 'main'].map(item => {
            return <Card variant='outlined' sx={{ mb: 3, backgroundColor: '#2e2e2ec9' }} key={item} >
               <CardContent>
                  <Typography variant="h5" component="div" sx={{ pb: 2, color: '#fff' }}>
                     {listConfig[item].header}
                  </Typography>
                  <Aims listName={item} />
                  <ListItemButton data-list-name={`finished-${item}`} onClick={onOpenFinishedList}>
                     <ListItemIcon>
                        <DoneAllIcon />
                     </ListItemIcon>
                     <ListItemText primary={listConfig.finishedName} />
                     {openFinished === `finished-${item}` ? <ExpandLess /> : <ExpandMore />}
                  </ListItemButton>
                  <Collapse in={openFinished === `finished-${item}`}>
                     <AimsPreference listName={item} listFinished={listConfig[item].list} />
                  </Collapse>
                  <ListItemButton data-list-name={`trash-${item}`} onClick={onOpenTrashList}>
                     <ListItemIcon>
                        <DeleteOutlineIcon />
                     </ListItemIcon>
                     <ListItemText primary={listConfig.trashName} />
                     {openTrash === 'trash-main' ? <ExpandLess /> : <ExpandMore />}
                  </ListItemButton>
                  <Collapse in={openTrash === `trash-${item}`}>
                     <AimsPreference listName={item} listInTrash={listConfig[item].list} />
                  </Collapse>
               </CardContent>
            </Card>
         })} */}
         <PreferenceItemDay />
         <PreferenceItemWeek />
         <PreferenceItemMonth />
         <PreferenceItemMain />
      </Box >
   )
})


const PreferenceItemDay = () => {
   const list = useSelector(getListDay)
   return <CardPreferenceItem list={list} nameList='day' header="Цілі на день" />
}
const PreferenceItemWeek = () => {
   const list = useSelector(getListWeek)
   return <CardPreferenceItem list={list} nameList='week' header="Цілі на тиждень" />
}
const PreferenceItemMonth = () => {
   const list = useSelector(getListMonth)
   return <CardPreferenceItem list={list} nameList='month' header="Цілі на місяць" />
}
const PreferenceItemMain = () => {
   const list = useSelector(getListMain)
   return <CardPreferenceItem list={list} nameList='main' header='Мрія' />
}