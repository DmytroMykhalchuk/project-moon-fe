import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import AvTimerOutlinedIcon from '@mui/icons-material/AvTimerOutlined';

const StatisticPomodoro: React.FC = () => {
   return (
      <Box sx={{ width: '100%', pb: 3 }}>
         <List
            sx={{ width: '100%', bgcolor: 'background.paper' }}
            aria-label="contacts"
         >
            <ListItem disablePadding
            >
               <ListItemButton disabled>

                  <ListItemText primary="Таймер pomodoro" />
               </ListItemButton>
            </ListItem>

            <ListItem >
               <ListItemIcon>
                  <AvTimerOutlinedIcon />
               </ListItemIcon>
               <ListItemText primary={
                  <Box sx={{ display: 'flex' }}>
                     <Typography variant="body1" sx={{ flexGrow: 1 }}>У розробці</Typography>
                     <Typography variant="body1" >...</Typography>
                  </Box>
               } />
            </ListItem>

         </List>
      </Box>
   )
}

export default StatisticPomodoro;