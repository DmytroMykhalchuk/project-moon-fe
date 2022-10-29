import Box from '@mui/material/Box';
import CircleProgressBar from './CircleProgressBar';
import Aims from './../../common/Aims';



const FrontPage = () => {
  return (
    <>
      <Box>
        <CircleProgressBar />
        <Box>
          <Aims/>
        </Box>
      </Box>
    </>
  )
}

export default FrontPage;
