import DailyPage from "./DailyPage";
import Box from '@mui/material/Box';
import { useEffect, useState } from 'react';
import { connect, ConnectedProps } from "react-redux";
import { AppStateType } from "../../../redux/store";
import { getCurrentDay, getDaily } from "../../../redux/appStateSelector";
import { setNewDailyRecord } from "../../../redux/appReducer";

const DailyPageContainer = ({ dailyRecords, currentDay, setDaily }: DailyPageMapsType) => {
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
}
const mapStateToProps = (state: AppStateType) => {
   return {
      dailyRecords: getDaily(state),
      currentDay: getCurrentDay(state)
   }
}
const mapDispatchToProps = (dispatch: any) => {
   return {
      setDaily: (day: string, text: string) => {
         dispatch(setNewDailyRecord(day, text))
      }
   }
}
const connected = connect(mapStateToProps, mapDispatchToProps);
type DailyPageMapsType = ConnectedProps<typeof connected>;
export default connected(DailyPageContainer);