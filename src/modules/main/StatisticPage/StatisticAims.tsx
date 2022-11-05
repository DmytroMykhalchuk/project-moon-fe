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

type StatisticAims = {
   currentMonth: number,
   statMonth: number | string
   statWeek: number | string
   statDay: number | string

}

const StatisticAims = ({ currentMonth, statMonth, statWeek, statDay }: any) => {
   return (
      <Box sx={{ width: '100%', pb: 3 }}>
         <List
            sx={{ width: '100%', backgroundColor: 'background.paper' }}
            aria-label="contacts"
         >
            <ListItem disablePadding >
               <ListItemButton disabled>

                  <ListItemText primary={`Місяць ${currentMonth}/18`} />
               </ListItemButton>
            </ListItem>

            <ListItem >
               <ListItemIcon>
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
               <ListItemIcon>
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
               <ListItemIcon>
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
}

export default StatisticAims;