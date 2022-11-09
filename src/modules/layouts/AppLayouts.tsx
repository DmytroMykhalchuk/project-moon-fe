import React, { useEffect, useState } from 'react';
import Container from '@mui/material/Container';
import styles from './styleAppLayouts.module.scss';
import FrontPageContainer from '../main/FrontPage/FrontPageContainer'
import PreferencePageContainer from '../main/PreferencePage/PreferencePageContainer';
import DailyPageContainer from '../main/DailyPage/DailyPageContainer';
import MessagePageContainer from '../main/MessagePage/MessagePageContainer';
import StatisticPageContainer from '../main/StatisticPage/StatisticPageContainer';
import AppTitle from './AppTitle';
import AppBottomBar from './AppBottomBar';
import { connect, ConnectedProps } from 'react-redux';
import { AppStateType } from '../../redux/store';
import { setMessages } from '../../redux/appReducer';
import { getIsBadge, getMessagesState } from '../../redux/appStateSelector';
import Fade from '@mui/material/Fade';
import Box from '@mui/material/Box';
import { Slide } from '@mui/material';
import bg from './../../img/bg/bg.jpg'
const TabItems =
   [
      < StatisticPageContainer />,
      <MessagePageContainer />,
      <FrontPageContainer />,
      <PreferencePageContainer />,
      <DailyPageContainer />,
   ] as Array<JSX.Element>;

const AppLayouts: React.FC<HeaderProps> = ({ init, isBadge }) => {
   useEffect(() => {

      init();
   }, [])

   const [page, setPage] = useState(2);
   const [oldPage, setOldPage] = useState(2)
   return <article className={styles.appWrapper}
      style={{ backgroundImage: `url(${bg})` }}
   >
      {/* <Box
         className={styles.appWrapper__wrapper}
      > */}

      <AppTitle />
      {/* <Container maxWidth={'md'} disableGutters sx={{ position: 'relative', minHeight: '100vh' }}>
         <Box>
            {TabItems[oldPage]}
         </Box>
      </Container> */}
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
                  {page === 4 && <DailyPageContainer />}
               </Box>
            </Fade>
         </Box>
      </Container>
      {/* </Box> */}
      <AppBottomBar page={page} setPage={setPage} setOldPage={setOldPage} isBadge={isBadge} />

   </article >;
}

const mapStateToProps = (state: AppStateType) => {
   return {
      messages: getMessagesState(state),
      isBadge: getIsBadge(state)
   }
}
const mapDispatchToProps = (dispatch: any) => {
   return {
      init: () => {
         dispatch(setMessages())
      }
   }
}

const connector = connect(mapStateToProps, mapDispatchToProps);
type HeaderProps = ConnectedProps<typeof connector>;
export default connector(AppLayouts);



