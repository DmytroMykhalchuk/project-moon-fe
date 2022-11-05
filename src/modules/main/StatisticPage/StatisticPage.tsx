import Box from '@mui/material/Box';
import graph from './../../../img/graph.png'
import Typography from '@mui/material/Typography'
import StatisticAims from './StatisticAims';
import StatisticPomodoro from './StatisticPomodoro';
import StatisticAchivments from './StatisticAchivments';
import { connect, ConnectedProps } from 'react-redux';
import React from 'react';
import { AppStateType } from '../../../redux/store';
import { getCurrentDay, getCurrentMonth, getMaxDays, getStatDayFinished, getStatMonthFinished, getStatWeekFinished } from '../../../redux/appStateSelector';
const StatisticPage: React.FC<HeaderProps> = ({
   currentDay,
   maxDays,
   currentMonth,
   statDay, statWeek, statMonth
}
) => {
   return (<Box>
      {/* <Box sx={{ backgroundColor: '#ffff', opacity: 1 }}>
         <Box sx={{ padding: "20px 20px 10px", filter: 'opacity(0.2)' }}>
            <img src={graph} alt="" />
         </Box>
         <Typography variant="body1" color="secondary" sx={{ textAlign: 'center', opacity: 1 }}>У розробці</Typography>
      </Box> */}

      <Typography variant="h4" color="succes" sx={{ textAlign: 'center', p: 3 }}>{`${currentDay}/${maxDays} днів`}</Typography>
      <StatisticAims currentMonth={currentMonth} statDay={statDay} statWeek={statWeek} statMonth={statMonth} />
      <StatisticPomodoro />
      <StatisticAchivments />
   </Box>)
}

const mapStateToProps = (state: AppStateType) => {
   return {
      maxDays: getMaxDays(state),
      currentDay: getCurrentDay(state),
      currentMonth: getCurrentMonth(state),
      statDay: getStatDayFinished(state),
      statWeek: getStatWeekFinished(state),
      statMonth: getStatMonthFinished(state)
   }
}
const mapDispatchToProps = (dispatch: any) => {
   return {

   }
}

const connector = connect(mapStateToProps, mapDispatchToProps);
type HeaderProps = ConnectedProps<typeof connector>;
export default connector(StatisticPage);