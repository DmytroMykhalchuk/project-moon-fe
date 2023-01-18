import React, { useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import SchoolIcon from '@mui/icons-material/School';
import { useDispatch, useSelector } from 'react-redux';
import { initAchivments } from '../../../redux/appReducer';
import { getAchivments } from '../../../redux/appStateSelector';
import Grid from '@mui/material/Grid';


export const StatisticAchivments: React.FC = React.memo(() => {
   const dispatch: any = useDispatch();
   const achivments = useSelector(getAchivments)

   useEffect(() => {
      dispatch(initAchivments())
   }, [])

   const displayAchivment = () => {
      if (!achivments) return;
      let listAchiv = [];

      for (const key in achivments) {
         if (Object.prototype.hasOwnProperty.call(achivments, key)) {
            const element = achivments[key];

            listAchiv.push(<Grid item xs={4} key={key} >
               <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', pb: 3 }}>
                  <Box>
                     {element.icon}
                  </Box>
                  <Box>
                     <Typography variant="subtitle1" sx={{ textAlign: 'center',color:'bgmode.light' }}>{element.text}</Typography>
                     <Typography variant="body2" sx={{ color: 'grey', textAlign: 'center' }}>{element.description}</Typography>
                  </Box>
               </Box>

            </Grid>)
         }
      }
      return (
         <Grid container spacing={2} sx={{ pt: 3 }}>
            {listAchiv}
         </Grid>
      );
   }
   return (
      <Box sx={{
         width: '100%', pb: 3,
         bgcolor: 'background.paper',
         backgroundColor: "#2e2e2ec9"
      }}>
         <List
            sx={{ width: '100%' }}
            aria-label="contacts"
         >

            <ListItem >
               <ListItemIcon>
                  <SchoolIcon sx={{color:'bgmode.light'}} />
               </ListItemIcon>
               <ListItemText primary={
                  <Box sx={{ display: 'flex' }}>
                     <Typography variant="body1" sx={{ flexGrow: 1 }}>Досягнення</Typography>
                  </Box>
               } />
            </ListItem>
         </List>
         {displayAchivment()}
      </Box>
   )
})
