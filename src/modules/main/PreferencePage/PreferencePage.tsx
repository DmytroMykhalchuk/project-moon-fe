import React, { useState } from "react"
import Box from "@mui/material/Box"
import { getListDay, getListMain, getListMonth, getListWeek } from "../../../redux/appStateSelector";
import { useSelector } from "react-redux";
import { CardPreferenceItem } from "../../common/CardPreferenceItem";
import { PreferenceTags } from "./PreferenceTags";
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import TagIcon from '@mui/icons-material/Tag';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import { DialogWindowCreateAim } from '../../common/DialogWindowCreateAim';
import { DialogWindowCreateTag } from '../../common/DialogWindowCreateTag';
import { PreferenceDeleteStatistic } from "./PreferenceDeleteStatistic";

export const PreferencePage: React.FC = React.memo(() => {

   const [isOpenDialogDeleteTag, setIsOpenDialogDeleteTag] = useState(false);
   const [isOpenDialogCreateTag, setIsOpenDialogCreateTag] = useState(false);
   const openDialogCreateAim = () => {
      setIsOpenDialogDeleteTag(true)
   }
   const openDialogCreateTag = () => {
      setIsOpenDialogCreateTag(true)
   }

   return (
      <Box sx={{ pb: 3 }}>
         <Stack direction='row' justifyContent='space-between' sx={{ p: 1,mb:1 }}>
            <Button variant="contained" endIcon={<ReceiptLongIcon />} onClick={openDialogCreateAim}>
               Створити ціль
            </Button>
            <Button variant="contained" endIcon={<TagIcon />} onClick={openDialogCreateTag}>
               Створити тег
            </Button>
         </Stack>
         <PreferenceItemDay />
         <PreferenceItemWeek />
         <PreferenceItemMonth />
         <PreferenceItemMain />

         <PreferenceTags />
         {/* <PreferenceDeleteStatistic /> */}

         <DialogWindowCreateAim isOpenDialog={isOpenDialogDeleteTag} setIsOpenDialog={setIsOpenDialogDeleteTag} />
         <DialogWindowCreateTag isOpenDialog={isOpenDialogCreateTag} setIsOpenDialog={setIsOpenDialogCreateTag} />
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