import Box from '@mui/material/Box';
import { Typography } from '@mui/material';
import styles from './styleAppLayouts.module.scss'

const AppTitle=()=>{
   return(
      <Box sx={{ pb: 3 }}>
         <Typography variant='h5' component='h1' textAlign={'center'} className={styles.title}  >Project Moon</Typography>
      </Box>
   )
}
export default AppTitle;