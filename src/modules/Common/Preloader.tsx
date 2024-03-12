import Backdrop from '@mui/material/Backdrop';
import styles from  './stylePreloader.module.scss';

type PreloaderType = {
   isFetching: boolean
}

const Preloader = ({ isFetching }: PreloaderType) => {
   return (
      <Backdrop
         sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
         open={isFetching}
      >
         {/* <CircularProgress color="inherit" /> */}
         <div className={styles.moon}>
            <img src="https://cdn2.iconfinder.com/data/icons/thesquid-ink-40-free-flat-icon-pack/64/space-rocket-512.png"
             style={{width:"30px",height:"20px"}} className={styles.loader} alt="rocket"/>
               <ul>
                  <li></li>
                  <li></li>
                  <li></li>
                  <li></li>
                  <li></li>
                  <li></li>
                  <li></li>
               </ul>
         </div>
      </Backdrop>
   )
}

export default Preloader;