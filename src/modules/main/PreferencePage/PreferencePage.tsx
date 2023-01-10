import React, { useState } from "react"
import { Fab } from "@mui/material";
import { Box } from "@mui/system"
import DialogWindow from "../../common/DialogWindow";
import { getDay, getListDay, getListMain, getListMonth, getListWeek, getMain, getMonth, getWeek } from "../../../redux/appStateSelector";
import { useSelector } from "react-redux";
import AddIcon from '@mui/icons-material/Add';
import { CardPreferenceItem } from "../../common/CardPreferenceItem";
import { CreateTag } from "./CreateTag";


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
      <Box sx={{ pb: 3 }}>

         <DialogWindow isOpenDialog={isOpenDialog} setIsOpenDialog={setIsOpenDialog} />
         <Fab color="secondary"
            onClick={() => { setIsOpenDialog(true); }}
            aria-label="edit"
            sx={{
               position: 'fixed',
               bottom: '80px',
               right: '16px',
               backgroundColor: 'bgmode.light',
               color: 'bgmode.circle',
               '&:hover': {
                  backgroundColor: 'bgmode.dark'
               }
            }
            } >
            <AddIcon />
         </Fab>

         <PreferenceItemDay />
         <PreferenceItemWeek />
         <PreferenceItemMonth />
         <PreferenceItemMain />
         <CreateTag />
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