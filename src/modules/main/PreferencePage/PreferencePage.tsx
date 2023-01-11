import React, { useState } from "react"
import Box from "@mui/material/Box"
import { getDay, getListDay, getListMain, getListMonth, getListWeek, getMain, getMonth, getTags, getWeek } from "../../../redux/appStateSelector";
import { useSelector } from "react-redux";
import { CardPreferenceItem } from "../../common/CardPreferenceItem";
import { SpeedDialTooltip } from "./SpeedDial";
import { PreferenceTags } from "./PreferenceTags";


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

         <SpeedDialTooltip />
         <PreferenceItemDay />
         <PreferenceItemWeek />
         <PreferenceItemMonth />
         <PreferenceItemMain />
         <PreferenceItemDay />
         <PreferenceTags />
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