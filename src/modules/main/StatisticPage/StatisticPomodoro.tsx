import React from 'react'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import AvTimerOutlinedIcon from '@mui/icons-material/AvTimerOutlined';
import { useSelector } from 'react-redux';
import { getPomodoroStatistic } from '../../../redux/appStateSelector';

export const StatisticPomodoro: React.FC = React.memo(() => {
   const pomodoroStatistic = useSelector(getPomodoroStatistic)

   const renderStatistic = () => {
      const items = []
      for (const key in pomodoroStatistic) {
         if (Object.prototype.hasOwnProperty.call(pomodoroStatistic, key)) {
            const element = pomodoroStatistic[key];
            const hours = Math.trunc(element / 60)
            const minutes = element % 60
            items.push(<ListItem key={key}>
               <ListItemText primary={
                  <Box sx={{ display: 'flex' }}>
                     <Typography variant="body1" sx={{ flexGrow: 1 }}>{key}</Typography>
                     <Typography variant="body1" >{hours > 0 && `${hours}год`} {minutes}хв</Typography>
                  </Box>
               } />
            </ListItem>)
         }
      }
      return items
   }
   return (
      <Box sx={{ width: '100%', pb: 3 }}>
         <List
            sx={{
               width: '100%',
               // bgcolor: 'background.paper',
               backgroundColor: "#2e2e2ec9"

            }}
            aria-label="contacts"
         >
            <ListItem >
               <ListItemIcon sx={{ color: 'bgmode.light' }}>
                  <AvTimerOutlinedIcon />
               </ListItemIcon>
               <ListItemText primary={
                  <Box sx={{ display: 'flex' }}>
                     <Typography variant="body1" sx={{ flexGrow: 1 }}>Pomodoro</Typography>
                  </Box>
               } />
            </ListItem>
            {renderStatistic()}

         </List>
      </Box>
   )
})

