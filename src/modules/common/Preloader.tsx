import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';


type PreloaderType={
   isFetching:boolean
}

const Preloader = ({isFetching}:PreloaderType) => {
   return (
      <Backdrop
         sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
         open={isFetching}
      >
         <CircularProgress color="inherit" />
      </Backdrop>
   )
}

export default Preloader;