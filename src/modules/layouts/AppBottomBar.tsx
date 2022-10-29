import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ArchiveIcon from '@mui/icons-material/Archive';
import Paper from '@mui/material/Paper';
import TodayIcon from '@mui/icons-material/Today';
import BubbleChartIcon from '@mui/icons-material/BubbleChart';
import CommentBankIcon from '@mui/icons-material/CommentBank';

type AppBottomBarType={
   setPage:(page:number)=>void
   page:number
}
const AppBottomBar=({page,setPage}:AppBottomBarType)=>{
   
   return(
      <Box sx={{ pb: 5, }}>
         <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 20, }} elevation={3} square={false} >
            <BottomNavigation
               showLabels
               value={page}
               sx={{ color: '#fff', }}

               onChange={(event, newValue) => {
                  setPage(newValue);
               }}
            >
               <BottomNavigationAction label="Statistci" icon={<BubbleChartIcon />} />
               <BottomNavigationAction label="Recents" icon={<CommentBankIcon />} />
               <BottomNavigationAction label="Favorites" icon={<FavoriteIcon />} />
               <BottomNavigationAction label="Archive" icon={<ArchiveIcon />} />
               <BottomNavigationAction label="Daily" icon={<TodayIcon />} />
            </BottomNavigation>
         </Paper>
      </Box>
   )
}

export default AppBottomBar