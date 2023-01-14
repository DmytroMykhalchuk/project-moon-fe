import React, { useEffect, useState } from 'react';
import Collapse from '@mui/material/Collapse';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import styles from './styles.module.scss'
import DoneAllIcon from '@mui/icons-material/DoneAll';
import { IconButton } from '@mui/material';
import { AppDispatch } from '../../../redux/store';
import { useDispatch } from 'react-redux';
import { completeAllDayTaskThunk } from '../../../redux/appReducer';
import AvTimerIcon from '@mui/icons-material/AvTimer';
import { CircleTime } from './CircleTime';
import { PomodoroTimer } from './PomodoroTimer';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { PomodorTimerContainer } from './PomodorTimerContainer';

export const CircleProgressBar: React.FC = React.memo(() => {
   const [isPomodoro, setIsPomodoro] = useState(false)
   const togglePomodoro = () => {
      setIsPomodoro((prev: boolean) => !prev)
   }
   const dispatch: AppDispatch = useDispatch();
   return (
      <>
         <Box className={styles.circleSection}>

            <Box className={styles.circleWrapper}>
               <Box className={styles.boxSide}>
                  <IconButton color='default' aria-label='show all' size='large' onClick={togglePomodoro}>
                     <AvTimerIcon fontSize="inherit" />
                  </IconButton>
               </Box>

               <Stack direction='row' gap='10px' >
                  <CircleTime />
                  <Box className={styles.boxSide}>
                     <IconButton
                        onClick={() => { dispatch(completeAllDayTaskThunk()) }}
                        aria-label='confirm all done'
                        size='large'>
                        <DoneAllIcon fontSize="inherit" />
                     </IconButton>
                  </Box>
               </Stack>


            </Box>
         </Box>
         <PomodorTimerContainer togglePomodoro={togglePomodoro} isPomodoro={isPomodoro} />
      </>
   );
})