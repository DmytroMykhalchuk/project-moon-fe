import React from 'react'
import { DailyPage } from "./DailyPage";
import Box from '@mui/material/Box';
import { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../redux/store";
import { getCurrentDay, getDaily } from "../../../redux/appStateSelector";

export const DailyPageContainer: React.FC = React.memo(() => {

   const dispatch: AppDispatch = useDispatch()
   const dailyRecords = useSelector(getDaily)
   const currentDay = useSelector(getCurrentDay)

   const [isOpenFab, setIsOpenFab] = useState(false);
   const [isAlredyAdd, setIsAlredyAdd] = useState(() => {
      if (Object.keys(dailyRecords).length > 0) {

         const idRecords = Object.keys(dailyRecords).pop()

         if (idRecords === undefined) return false;

         const dateLastRecord = new Date(+idRecords);
         const currentDate = new Date();
         if (dateLastRecord.getMonth() === currentDate.getMonth() && dateLastRecord.getDate() === currentDate.getDate())
            return true;

         return false;
      } else {
         return false;
      }
   })


   const setDaily = (day: string, text: string) => {
      // dispatch(setNewDailyRecord(day, text))
   }
   return (
      <Box>
         <DailyPage
            isOpenFab={isOpenFab}
            setIsOpenFab={setIsOpenFab}
            isAlredyAdd={isAlredyAdd}
            setIsAlredyAdd={setIsAlredyAdd}
            records={dailyRecords}
            currentDay={currentDay}
            setDaily={setDaily}
         />
      </Box>
   )
})
