
import React, { useState } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { Aims } from "./Aims"
import { BACKGROUND_COLOR_CARDS } from '../../themes'
import { AimsInTrash } from './AimsInTrash'
import { AimsFinished } from './AimsFinished'


type CardPreferenceItemType = {
   list: any
   nameList: string
   header: string
}
export const CardPreferenceItem: React.FC<CardPreferenceItemType> = React.memo(({ list, nameList, header = '' }) => {
   return (
      <Box sx={{ mb: 3, backgroundColor: BACKGROUND_COLOR_CARDS, pb: 2 }}  >
         <Box>
            <Typography variant="h5" component="div" sx={{ p: 2, color: 'fpage.main' }}>
               {header}
            </Typography>
            <Aims listName={nameList} list={list} />
            <AimsFinished listName={nameList} list={list} />
            <AimsInTrash listName={nameList} list={list} />
         </Box>
      </Box >
   )
})