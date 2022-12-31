import React, { useEffect, useState } from 'react';
import Container from '@mui/material/Container';
import styles from './styleAppLayouts.module.scss';
import { FrontPageContainer } from '../main/FrontPage/FrontPageContainer'
import { PreferencePageContainer } from '../main/PreferencePage/PreferencePageContainer';
import MessagePageContainer from '../main/MessagePage/MessagePageContainer';
import { StatisticPageContainer } from '../main/StatisticPage/StatisticPageContainer';
import AppTitle from './AppTitle';
import AppBottomBar from './AppBottomBar';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../redux/store';
import { setMessages } from '../../redux/appReducer';
import { getIsBadge } from '../../redux/appStateSelector';
import Fade from '@mui/material/Fade';
import Box from '@mui/material/Box';
import { Records } from '../main/DailyPage/Records';

export const AppLayouts: React.FC = React.memo(() => {
   const dispatch: AppDispatch = useDispatch()
   const isBadge = useSelector(getIsBadge)

   useEffect(() => {
      dispatch(setMessages())
   }, [])
   const [page, setPage] = useState(2)
   const [oldPage, setOldPage] = useState(2)
   if (oldPage !== page) {
      window.scrollTo(0, 0)
   }

   return <article className={styles.appWrapper}
   >
      <AppTitle />
      <Container maxWidth={'md'} disableGutters sx={{ position: 'relative' }}>
         <Box sx={{ display: page === 0 ? 'block' : 'none' }}>
            <Fade in={page === 0} appear={false}>
               <Box >
                  < StatisticPageContainer />
               </Box>
            </Fade>
         </Box>
         <Box sx={{ display: page === 1 ? 'block' : 'none' }}>
            <Fade in={page === 1} appear={false}>
               <Box >
                  <MessagePageContainer />
               </Box>
            </Fade>
         </Box>
         <Box sx={{ display: page === 2 ? 'block' : 'none' }}>
            <Fade in={page === 2} appear={false}>
               <Box >
                  <FrontPageContainer />
               </Box>
            </Fade>
         </Box>
         <Box sx={{ display: page === 3 ? 'block' : 'none' }}>
            <Fade in={page === 3} appear={false}>
               <Box >
                  <PreferencePageContainer />
               </Box>
            </Fade>
         </Box>
         <Box sx={{ display: page === 4 ? 'block' : 'none' }}>
            <Fade in={page === 4} appear={false}>
               <Box >
                  {page === 4 && <Records />}
               </Box>
            </Fade>
         </Box>
      </Container>
      <AppBottomBar page={page} setPage={setPage} setOldPage={setOldPage} isBadge={isBadge} />
   </article >;
})






