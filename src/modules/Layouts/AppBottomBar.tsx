import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import TodayIcon from '@mui/icons-material/Today';
import BubbleChartIcon from '@mui/icons-material/BubbleChart';
import CommentBankIcon from '@mui/icons-material/CommentBank';
import Badge from '@mui/material/Badge';
import BookIcon from '@mui/icons-material/Book';
import HubIcon from '@mui/icons-material/Hub';
import { grey } from '@mui/material/colors'
import Typography from '@mui/material/Typography'
import { useSelector } from 'react-redux';
import { getIsStarted } from '../../redux/appStateSelector';

type AppBottomBarType = {
   setPage: (page: number) => void
   page: number,
   isBadge: boolean,
}
const styles = {
   // fontSize:'0.5em',
   "&.MuiBottomNavigationAction-root": {
      color: "#898989"
   },
   "&.Mui-selected": {
      color: "bgmode.light",
   }
};
const AppBottomBar: React.FC<AppBottomBarType> = ({ page, setPage, isBadge }) => {
   const isStarted = useSelector(getIsStarted)
   return (
      <Box sx={{ pb: 5, zIndex: 2, position: 'relative' }}>
         <Box sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 20, }}  >
            <BottomNavigation
               value={page}
               showLabels
               sx={{
                  color: '#fff', backgroundColor: grey[900],
                  '& button': { minWidth: 'auto', p: 0 }
               }}
               onChange={(event, newValue: number) => {
                  isStarted && setPage(newValue)
               }}
            >
               <BottomNavigationAction sx={styles}
                  label={<Typography variant="caption" color="inherit">Статистика</Typography>}
                  icon={<BubbleChartIcon />} />
               <BottomNavigationAction sx={styles}
                  label={<Typography variant="caption" color="inherit">Чат</Typography>}
                  icon={
                     <Badge color="error" variant="dot" invisible={!isBadge}>
                        <CommentBankIcon />
                     </Badge>
                  } />
               <BottomNavigationAction sx={styles}
                  label={<Typography variant="caption" color="inherit">Головна</Typography>}
                  icon={<HubIcon />} />
               <BottomNavigationAction sx={styles}
                  label={<Typography variant="caption" color="inherit">Записи</Typography>}
                  icon={<BookIcon />} />
               <BottomNavigationAction sx={styles}
                  label={<Typography variant="caption" color="inherit">Щоденник</Typography>}
                  icon={<TodayIcon />} />
            </BottomNavigation>
         </Box>
      </Box>
   )
}

export default AppBottomBar