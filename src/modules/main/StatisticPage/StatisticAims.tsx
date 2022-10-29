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

const StatisticAims = (props: any) => {
   return (
      <Box sx={{ width: '100%', pb: 3 }}>
         <List
            sx={{ width: '100%', backgroundColor: 'background.paper' }}
            aria-label="contacts"
         >
            <ListItem disablePadding >
               <ListItemButton disabled>

                  <ListItemText primary="Місяць 1/18" />
               </ListItemButton>
            </ListItem>

            <ListItem >
               <ListItemIcon>
                  <CalendarMonthIcon />
               </ListItemIcon>
               <ListItemText primary={
                  <Box sx={{ display: 'flex' }}>
                     <Typography variant="body1" sx={{ flexGrow: 1 }}>Завершено місячних цілей</Typography>
                     <Typography variant="body1" >10</Typography>
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
                     <Typography variant="body1" >5</Typography>
                  </Box>
               } />
            </ListItem>
            <ListItem >
               <ListItemIcon>
                  <EventIcon />
               </ListItemIcon>
               {/* {@ts-ignore} */}
               <ListItemText inset={true} primary={
                  <Box sx={{ display: 'flex' }}>
                     <Typography variant="body1" sx={{ flexGrow: 1 }}>Завершено щоденних цілей</Typography>
                     <Typography variant="body1" >140</Typography>
                  </Box>
               } />
            </ListItem>
         </List>
      </Box>
   )
}

export default StatisticAims;