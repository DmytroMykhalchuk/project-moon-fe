import Box from '@mui/material/Box';
import graph from './../../../img/graph.png'
import Typography from '@mui/material/Typography'
import StatisticAims from './StatisticAims';
import StatisticPomodoro from './StatisticPomodoro';
import StatisticAchivments from './StatisticAchivments';

const StatisticPage = () => {
   return (<Box>
      <Box sx={{ backgroundColor: '#ffff', opacity: 1 }}>
         <Box sx={{ padding: "20px 20px 10px", filter: 'opacity(0.2)' }}>
            <img src={graph} alt="" />
         </Box>
         <Typography variant="body1" color="secondary" sx={{ textAlign: 'center', opacity: 1 }}>У розробці</Typography>
      </Box>

      <Typography variant="h4" color="initial" sx={{ textAlign: 'center', p: 3 }}>2/180</Typography>
      <StatisticAims />
      <StatisticPomodoro />
      <StatisticAchivments />
   </Box>)
}

export default StatisticPage;