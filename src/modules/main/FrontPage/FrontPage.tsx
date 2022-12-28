import React from 'react'
import Box from '@mui/material/Box';
import { CircleProgressBar } from './CircleProgressBar';
import Aims from './../../common/Aims';

export const FrontPage = React.memo(() => {
  return (
    <>
      <Box>
        <CircleProgressBar />
        <Box>
          <Aims isHome />
        </Box>
      </Box>
    </>
  )
})

