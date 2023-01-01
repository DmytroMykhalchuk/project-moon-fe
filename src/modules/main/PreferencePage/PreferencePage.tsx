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
   return (
      <Box sx={{pb:3}}>

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