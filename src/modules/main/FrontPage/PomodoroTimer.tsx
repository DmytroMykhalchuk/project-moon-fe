import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import CircularProgress from '@mui/material/CircularProgress'

type PomodoroTimerType = {
   time: number
   percentOfCircle: number
}
export const PomodoroTimer: React.FC<PomodoroTimerType> = ({ time, percentOfCircle }) => {
   const minutes = Math.trunc(time / 60)
   const seconds = time % 60
   return <Box>
      <Box sx={{ position: 'relative', display: 'inline-flex', }}>
         <CircularProgress variant="determinate" size={200} sx={{ margin: '0 auto', width: '100%', color: 'bgmode.circle', zIndex: '2' }} value={percentOfCircle} />
         <CircularProgress
            variant="determinate"
            size={200}
            sx={{
               margin: '0 auto',
               width: '100%',
               position: 'absolute',
               zIndex: '1',
               color: 'bgmode.light'
            }}
            value={100}
         />
         <Box
            sx={{
               top: 0,
               left: '50%',
               bottom: 0,
               right: 0,
               position: 'absolute',
               display: 'flex',
               alignItems: 'center',
               justifyContent: 'center',
               transform: 'translateX(-50%)'
            }}
         >
            <Typography variant="h4" component="div" color="text.secondary">
               {minutes < 10 ? `0${minutes}` : minutes}:{seconds < 10 ? `0${seconds}` : seconds}
            </Typography>
         </Box>
      </Box>
   </Box>
}