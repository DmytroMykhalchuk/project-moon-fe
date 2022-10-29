import DailyPage from "./DailyPage";
import Box from '@mui/material/Box';
import { useState } from 'react';
import { connect, ConnectedProps } from "react-redux";
import { AppStateType } from "../../../redux/store";
import { getCurrentDay, getDaily } from "../../../redux/appStateSelector";
import { setDaily } from "../../../redux/appReducer";

const DailyPageContainer = ({ dailyRecords, currentDay, setDaily }: DailyPageMapsType) => {
   const [isOpenFab, setIsOpenFab] = useState(false);
   const [isAlredyAdd, setIsAlredyAdd] = useState(false)

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
      setDaily: (text: string) => {
         dispatch(setDaily(text))
      }
   }
}
const connected = connect(mapStateToProps, mapDispatchToProps);
type DailyPageMapsType = ConnectedProps<typeof connected>;
export default connected(DailyPageContainer);