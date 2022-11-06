import React, { useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import SchoolIcon from '@mui/icons-material/School';
import { connect, ConnectedProps } from 'react-redux';
import { AppStateType } from '../../../redux/store';
import { initAchivments } from '../../../redux/appReducer';
import { getAchivments } from '../../../redux/appStateSelector';
import Grid from '@mui/material/Grid';




const StatisticAchivments: React.FC<HeaderProps> = ({ initAchivments, achivments }) => {
   useEffect(() => {
      initAchivments();
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
                     <Typography variant="subtitle1" color="primary">{element.text}</Typography>
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
      <Box sx={{ width: '100%', pb: 3, bgcolor: 'background.paper' }}>
         <List
            sx={{ width: '100%' }}
            aria-label="contacts"
         >
            {/* <ListItem disablePadding
            >
               <ListItemButton disabled>

                  <ListItemText primary={
                     <Box sx={{ display: 'flex' }}>

                        <SchoolIcon />
                        <Typography variant="body1">Досягнення</Typography>


                     </Box>
                  } />
               </ListItemButton>
            </ListItem> */}

            <ListItem >
               <ListItemIcon>
                  <SchoolIcon />
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
}


const mapStateToProps = (state: AppStateType) => {
   return {
      achivments: getAchivments(state)
   }
}
const mapDispatchToProps = (dispatch: any) => {
   return {
      initAchivments: () => {
         dispatch(initAchivments())
      }
   }
}

const connector = connect(mapStateToProps, mapDispatchToProps);
type HeaderProps = ConnectedProps<typeof connector>;
export default connector(StatisticAchivments);