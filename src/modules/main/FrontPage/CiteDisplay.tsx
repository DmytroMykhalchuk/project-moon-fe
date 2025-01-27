import React from 'react'
import { citesObj } from "../../../api/cites"
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

export const CiteDisplay: React.FC = React.memo(() => {
   const randomId = getRandomElementFromArray(Object.keys(citesObj));
   const languageCite = localStorage.langCites ? localStorage.langCites : 'Ua';
   return (
      <Box
         sx={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            p: 5
         }}
      >
         <Box sx={{ border: '2px solid',borderColor:'bgmode.light', p: 2 }}>
            <Typography variant="subtitle1" color="info">
               {citesObj[randomId][`text${languageCite}`]}
            </Typography>
         </Box>
      </Box>
   )
})

function getRandomElementFromArray(list: Array<any>) {
   return list[Math.floor((Math.random() * list.length))];
}