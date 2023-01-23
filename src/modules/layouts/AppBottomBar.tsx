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

type AppBottomBarType = {
   setPage: (page: number) => void
   page: number,
   isBadge: boolean, setOldPage: (arg1: number) => void
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
const AppBottomBar = ({ page, setPage, isBadge, setOldPage }: AppBottomBarType) => {
   return (
      <Box sx={{ pb: 5, zIndex: 2, position: 'relative' }}>
         <Box sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 20, }}  >
            <BottomNavigation
               value={page}
               showLabels
               sx={{ color: '#fff', backgroundColor: grey[900] }}

               onChange={(event, newValue) => {
                  //@ts-ignore
                  setPage((oldValue: number) => {
                     setOldPage(oldValue)
                     return newValue
                  });
               }}
            >
               <BottomNavigationAction sx={styles}
                  label="Статистика"
                  icon={<BubbleChartIcon />} />
               <BottomNavigationAction sx={styles}
                  label="Чат"
                  
                  icon={
                     <Badge color="error" variant="dot" invisible={!isBadge}>
                        <CommentBankIcon />
                     </Badge>
                  } />
               <BottomNavigationAction sx={styles}
                  label="Головна"
                  
                  icon={<HubIcon />} />
               <BottomNavigationAction sx={styles}
                  label="Записи"
                  
                  icon={<BookIcon />} />
               <BottomNavigationAction sx={styles}
                  label="Щоденник"
                  
                  icon={<TodayIcon />} />
            </BottomNavigation>
         </Box>
      </Box>
   )
}

export default AppBottomBar