import Box from '@mui/material/Box';
import { Typography } from '@mui/material';


const AppTitle=()=>{
   return(
      <Box sx={{ pb: 3 }}>
         <Typography variant='h5' component='h1' textAlign={'center'}  >Project "Moon"</Typography>
      </Box>
   )
}
export default AppTitle;