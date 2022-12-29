import React from 'react'
import Box from '@mui/material/Box';
import { CircleProgressBar } from './CircleProgressBar';
import { AimsHome } from '../../common/AimsHome';

export const FrontPage = React.memo(() => {
  return (
    <>
      <Box>
        <CircleProgressBar />
        <Box>
          <AimsHome isHome />
        </Box>
      </Box>
    </>
  )
})

