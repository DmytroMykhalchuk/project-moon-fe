import React from 'react'
import Box from '@mui/material/Box';
import { CircleProgressBar } from './CircleProgressBar';
import { AimsHome } from '../../Common/AimsHome';

export const FrontPage = React.memo(() => {
  return (
    <>
      <Box>
        <CircleProgressBar />
        <Box>
          <AimsHome />
        </Box>
      </Box>
    </>
  )
})

