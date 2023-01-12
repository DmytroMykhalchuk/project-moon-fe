
import React, { useState } from 'react'
import Box from '@mui/material/Box'
import ListItemButton from '@mui/material/ListItemButton'
import Typography from '@mui/material/Typography'
import Collapse from '@mui/material/Collapse'
import { Aims } from "./Aims"
import AimsPreference from "./AimsPrefrence"
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import ExpandLess from '@mui/icons-material/ExpandLess'
import ExpandMore from '@mui/icons-material/ExpandMore'
import DoneAllIcon from '@mui/icons-material/DoneAll'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import { BACKGROUND_COLOR_CARDS } from '../../themes'

const trashName = 'Корзина'
const finishedName = 'Завершені'

type CardPreferenceItemType = {
   list: any
   nameList: string
   header: string
}
export const CardPreferenceItem: React.FC<CardPreferenceItemType> = React.memo(({ list, nameList, header = '' }) => {
   const [openFinished, setOpenFinished] = useState(false)
   const [openTrash, setOpenTrash] = useState(false)

   return (
      <Box sx={{ mb: 3, backgroundColor: BACKGROUND_COLOR_CARDS }}  >
         <Box>
            <Typography variant="h5" component="div" sx={{ p: 2, color: 'fpage.main' }}>
               {header}
            </Typography>
            <Aims listName={nameList} list={list} />
            <ListItemButton data-list-name={`finished-${nameList}`} onClick={() => setOpenFinished((prev: boolean) => !prev)}>
               <ListItemIcon sx={{color:'bgmode.light'}}>
                  <DoneAllIcon />
               </ListItemIcon>
               <ListItemText primary={finishedName} />
               {openFinished ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={openFinished}>
               <AimsPreference listName={nameList} listFinished={list} />
            </Collapse>
            <ListItemButton data-list-name={`trash-${nameList}`} onClick={() => setOpenTrash((prev: boolean) => !prev)}>
               <ListItemIcon sx={{color:'bgmode.light'}}>
                  <DeleteOutlineIcon />
               </ListItemIcon>
               <ListItemText primary={trashName} />
               {openTrash ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={openTrash}>
               <AimsPreference listName={nameList} listInTrash={list} />
            </Collapse>
         </Box>
      </Box >
   )
})