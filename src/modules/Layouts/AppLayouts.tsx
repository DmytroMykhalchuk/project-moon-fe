import AppBottomBar from './AppBottomBar';
import AppTitle from './AppTitle';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Fade from '@mui/material/Fade';
import MessagePageContainer from '../main/MessagePage/MessagePageContainer';
import React, { useEffect, useState } from 'react';
import styles from './styleAppLayouts.module.scss';
import { FrontPageContainer } from '../main/FrontPage/FrontPageContainer';
import { getIsBadge, getIsStarted } from '../../redux/appStateSelector';
import { PreferencePageContainer } from '../main/PreferencePage/PreferencePageContainer';
import { Records } from '../main/DailyPage/Records';
import { setMessages } from '../../redux/appReducer';
import { StatisticPageContainer } from '../main/StatisticPage/StatisticPageContainer';
import { useDispatch, useSelector } from 'react-redux';

export const AppLayouts: React.FC = React.memo(() => {
   const dispatch: any = useDispatch()
   const isBadge = useSelector(getIsBadge)

   const isStarted = useSelector(getIsStarted)

   useEffect(() => {
      dispatch(setMessages())
   }, [])

   const [page, setPage] = useState(isStarted ? 2 : 1)
   useEffect(() => {
      page !== 1 ? window.scrollTo(0, 0) : window.scrollTo(0, 4000)
   }, [page])

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
      <AppBottomBar page={page} setPage={setPage} isBadge={isBadge}  />
   </article >;
})






