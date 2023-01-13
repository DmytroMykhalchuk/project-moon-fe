import React, { useEffect, useState } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import styles from './styles.module.scss'
import DoneAllIcon from '@mui/icons-material/DoneAll';
import { IconButton } from '@mui/material';
import { AppDispatch } from '../../../redux/store';
import { useDispatch } from 'react-redux';
import { completeAllDayTaskThunk } from '../../../redux/appReducer';
import AvTimerIcon from '@mui/icons-material/AvTimer';

type CircleProgressType = {
   value: number
   currtimeh: number
   currtimem: number
   currtimes: number
}
const CircularProgressWithLabel: React.FC<CircleProgressType> = React.memo(({ value, currtimeh, currtimem, currtimes }) => {
   const isDevider = currtimes % 2 === 0;
   const restTime = 24 - currtimeh
   const labelRestTime =
      (restTime === 1 || restTime === 21)
         ? 'година'
         : restTime > 1 && (restTime < 21 || restTime === 0)
            ? 'годин' : 'години';
   const dispatch: AppDispatch = useDispatch();
   return (
      <>
         <Box className={styles.circleSection}>

            <Typography align='center' className={styles.decorElement}>{restTime} <sub>
               {labelRestTime}
            </sub></Typography>
            <Box className={styles.circleWrapper}>
               <Box className={styles.boxSide}>
                  <IconButton color='default' aria-label='show all' size='large'><AvTimerIcon fontSize="inherit" color='disabled' /></IconButton>
               </Box>
               <Box sx={{ position: 'relative', display: 'inline-flex', }}>
                  <CircularProgress variant="determinate" size={200} sx={{ margin: '0 auto', width: '100%',color:'bgmode.circle'}} value={value}  />
                  <CircularProgress
                     variant="determinate"
                     className={styles.circle}
                     size={200}
                     sx={{
                        margin: '0 auto',
                        width: '100%',
                        position: 'absolute',
                        zIndex: '-1',
                        color: 'bgmode.light'
                     }}
                     value={100}
                  />
                  <Box
                     sx={{
                        top: 0,
                        left: '50%',
                        bottom: 0,
                        right: 0,
                        position: 'absolute',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transform: 'translateX(-50%)'
                     }}
                  >
                     <Typography variant="h4" component="div" color="text.secondary">
                        {currtimeh < 10 ? `0${currtimeh}` : currtimeh}
                        <span style={{ opacity: isDevider ? 1 : 0 }}>:</span>
                        {currtimem < 10 ? `0${currtimem}` : currtimem}

                     </Typography>
                  </Box>
               </Box>
               <Box className={styles.boxSide}>
                  <IconButton
                     onClick={() => { dispatch(completeAllDayTaskThunk()) }}
                     aria-label='confirm all done'
                     size='large'>
                     <DoneAllIcon fontSize="inherit" /></IconButton>
               </Box>

            </Box>
         </Box>
      </>
   );
})

export const CircleProgressBar: React.FC = React.memo(() => {

   const [progress, setProgress] = useState(100 - (getSecondsToTomorrow() / (24 * 3600) * 100));
   const [currTimeH, setCurrentTimeH] = useState(new Date().getHours());
   const [currTimeM, setCurrentTimeM] = useState(new Date().getMinutes());
   const [currTimeS, setCurrentTimeS] = useState(new Date().getSeconds());

   useEffect(() => {
      const timer = setInterval(() => {
         setProgress(100 - (getSecondsToTomorrow() / (24 * 3600) * 100));
         const time = new Date();
         setCurrentTimeH(time.getHours());
         setCurrentTimeM(time.getMinutes());
         setCurrentTimeS(time.getSeconds());
      }, 1000);
      return () => {
         clearInterval(timer);
      };
   }, []);

   return <CircularProgressWithLabel
      value={progress}
      currtimeh={currTimeH}
      currtimem={currTimeM}
      currtimes={currTimeS}
   />;
})

function getSecondsToTomorrow() {
   let now = new Date();
   let hour = now.getHours();
   let minutes = now.getMinutes();
   let seconds = now.getSeconds();
   let totalSecondsToday = (hour * 60 + minutes) * 60 + seconds;
   let totalSecondsInADay = 86400;

   return totalSecondsInADay - totalSecondsToday;
}