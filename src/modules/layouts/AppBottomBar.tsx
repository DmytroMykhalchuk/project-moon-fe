import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ArchiveIcon from '@mui/icons-material/Archive';
import Paper from '@mui/material/Paper';
import TodayIcon from '@mui/icons-material/Today';
import BubbleChartIcon from '@mui/icons-material/BubbleChart';
import CommentBankIcon from '@mui/icons-material/CommentBank';
import Badge from '@mui/material/Badge';
import BookIcon from '@mui/icons-material/Book';
import HubIcon from '@mui/icons-material/Hub';

type AppBottomBarType = {
   setPage: (page: number) => void
   page: number,
   isBadge: boolean, setOldPage: (arg1: number) => void
}
const styles = {
   "&.MuiBottomNavigationAction-root": {
      color: "#898989"
    },
   "&.Mui-selected": {
      color: "#fff ",
   }
};
const AppBottomBar = ({ page, setPage, isBadge, setOldPage }: AppBottomBarType) => {
   return (
      <Box sx={{ pb: 5, }}>
         <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 20, }} elevation={3} square={false} >
            <BottomNavigation
               showLabels
               value={page}
               sx={{ color: '#fff', }}

               onChange={(event, newValue) => {
                  //@ts-ignore
                  setPage((oldValue): number => {
                     setOldPage(oldValue)
                     return newValue
                  });
               }}
            >
               <BottomNavigationAction sx={styles} label="Статистика" icon={<BubbleChartIcon />} />
               <BottomNavigationAction sx={styles} label="Інформація" icon={
                  <Badge color="error" variant="dot" invisible={!isBadge}>
                     <CommentBankIcon />
                  </Badge>
               } />
               <BottomNavigationAction sx={styles} label="Головна" icon={<HubIcon />} />
               <BottomNavigationAction sx={styles} label="Керування" icon={<BookIcon />} />
               <BottomNavigationAction sx={styles} label="Щоденник" icon={<TodayIcon />} />
            </BottomNavigation>
         </Paper>
      </Box>
   )
}

export default AppBottomBar