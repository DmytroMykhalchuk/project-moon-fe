import { useState } from 'react';
import Container from '@mui/material/Container';
import styles from './styleAppLayouts.module.scss';
import FrontPageContainer from '../main/FrontPage/FrontPageContainer'
import PreferencePageContainer from '../main/PreferencePage/PreferencePageContainer';
import DailyPageContainer from '../main/DailyPage/DailyPageContainer';
import MessagePageContainer from '../main/MessagePage/MessagePageContainer';
import StatisticPageContainer from '../main/StatisticPage/StatisticPageContainer';
import AppTitle from './AppTitle';
import AppBottomBar from './AppBottomBar';

const TabItems =
   [
      < StatisticPageContainer />,
      <MessagePageContainer />,
      <FrontPageContainer />,
      <PreferencePageContainer />,
      <DailyPageContainer />,
   ] as Array<JSX.Element>;

const AppLayouts = () => {

   const [page, setPage] = useState(2);
   return <article className={styles.appWrapper}>
      <AppTitle />
      <Container maxWidth={'md'} disableGutters >
         {TabItems[page]}
      </Container>
      <AppBottomBar page={page} setPage={setPage} />
   </article>;
}
export default AppLayouts;


