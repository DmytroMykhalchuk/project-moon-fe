import React from 'react'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import EventIcon from '@mui/icons-material/Event';
import DateRangeIcon from '@mui/icons-material/DateRange';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { useSelector } from 'react-redux';
import { getCurrentMonth, getStatDayFinished, getStatMonthFinished, getStatWeekFinished } from '../../../redux/appStateSelector';

export const StatisticAims: React.FC = React.memo(() => {
   const currentMonth = useSelector(getCurrentMonth)
   const statMonth = useSelector(getStatMonthFinished)
   const statWeek = useSelector(getStatWeekFinished)
   const statDay = useSelector(getStatDayFinished)
   return (
      <Box sx={{ width: '100%', pb: 3 }}>
         <List
            sx={{
               width: '100%',
               // backgroundColor: 'background.paper',
               backgroundColor: "#2e2e2ec9"
            }}
            aria-label="contacts"
         >
            <ListItem disablePadding >
               <ListItemButton disabled>

                  <ListItemText primary={`Місяць ${currentMonth}/18`} />
               </ListItemButton>
            </ListItem>

            <ListItem >
               <ListItemIcon sx={{ color: 'bgmode.light' }}>
                  <CalendarMonthIcon />
               </ListItemIcon>
               <ListItemText primary={
                  <Box sx={{ display: 'flex' }}>
                     <Typography variant="body1" sx={{ flexGrow: 1 }}>Завершено місячних цілей</Typography>
                     <Typography variant="body1" >{statMonth}</Typography>
                  </Box>
               } />
            </ListItem>
            <ListItem >
               <ListItemIcon sx={{ color: 'bgmode.light' }}>
                  <DateRangeIcon />
               </ListItemIcon>
               <ListItemText primary={
                  <Box sx={{ display: 'flex' }}>
                     <Typography variant="body1" sx={{ flexGrow: 1 }}>Завершено тижневих цілей</Typography>
                     <Typography variant="body1" >{statWeek}</Typography>
                  </Box>
               } />
            </ListItem>
            <ListItem >
               <ListItemIcon sx={{ color: 'bgmode.light' }}>
                  <EventIcon />
               </ListItemIcon>
               {/* {@ts-ignore} */}
               <ListItemText primary={
                  <Box sx={{ display: 'flex' }}>
                     <Typography variant="body1" sx={{ flexGrow: 1 }}>Завершено щоденних цілей</Typography>
                     <Typography variant="body1" >{statDay}</Typography>
                  </Box>
               } />
            </ListItem>
         </List>
      </Box>
   )
})

