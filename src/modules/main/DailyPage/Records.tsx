import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getDaily } from '../../../redux/appStateSelector'
import styles from './styles.module.scss'
import Typography from '@mui/material/Typography'
import Zoom from '@mui/material/Zoom'
import Box from '@mui/material/Box'
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import { CreateRecord } from './CreateRecord'
import { DailyRecordType, filterDailyRecords } from '../../../redux/appReducer'
import { PlaceHolder } from './PlaceHolder'
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import FilterListIcon from '@mui/icons-material/FilterList';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import { TagsSelect } from './TagsSelect'
import { grey } from '@mui/material/colors'

export const triggerLetter = ['a', 'у', 'е', 'о', 'и', 'і', 'e', 'u', 'o', 'i', 'a']

export const Records = React.memo(() => {
   const dispatch: any = useDispatch()
   const [isEditMode, setIsEditMode] = useState(false)
   const [selctedItem, setSelctedItem] = useState({} as DailyRecordType)
   const [selectedTags, setSelectedTags] = useState([] as string[])
   const [isOpenFilter, setIsOpenFilter] = useState(false)
   const toggleOpenFilter = () => {
      setIsOpenFilter((prev: boolean) => !prev)
   }
   const checkSpelling = (str: string): string => {
      const sizeShrink = 3;
      for (let i = sizeShrink; i < str.length; i++) {
         if (!triggerLetter.includes(str[i - 1])) {
            return str.substring(0, i) + '.'
         }
      }
      return ''
   }
   const records = useSelector(getDaily)
   useEffect(() => {

      selectedTags.length > 0
         ? dispatch(filterDailyRecords(selectedTags))
         : dispatch(filterDailyRecords())
   }, [selectedTags])
   const showAllRecords = () => {
      let elementRecords = [];
      const recordsKeys = Object.keys(records)
      recordsKeys.sort((a, b) => +a - +b)

      for (const recordDate of recordsKeys) {
         const element = records[recordDate];
         const createDate = new Date(+recordDate);
         const nameMonth = checkSpelling(createDate.toLocaleString('default', { month: 'long' }))
         elementRecords.push(
            <Box key={recordDate} sx={{ backgroundColor: '#2e2e2ec9', p: 1 }} className={styles.recordWrapper}
               onClick={() => { setSelctedItem({ [recordDate]: element }); setIsEditMode(true) }}
            >
               <Box className={styles.recordWrapper__titleBox} sx={{ borderColor: 'bgmode.light' }}>
                  <Typography variant="h6" color="inherit">{createDate.getDate()}</Typography>
                  <Typography variant="caption" color="inherit">{nameMonth}</Typography>
               </Box>
               <Box className={styles.recordWrapper__contentBox}>
                  {element.title && <Typography variant="body1" color="inherit">{element.title}</Typography>}
                  {element.text && <Typography variant="body2" color="inherit">
                     {element.text.length > 50 ? `${element.text.slice(0, 50)}...` : element.text}
                  </Typography>}
               </Box>
            </Box>
         )
      }
      if (elementRecords.length === 0) {
         return <PlaceHolder />
      }
      elementRecords.reverse()
      return elementRecords;
   }
   return (
      <Box>
         <Box sx={{ display: 'flex', }}>
            <CssBaseline />
            <AppBar component="nav">
               <Toolbar className='row' sx={{ backgroundColor: grey[900], p: 0 }} >
                  <Box sx={{ flexGrow: '1', pl: 1 }}>
                     <Typography variant="h6" color="inherit">Щоденник</Typography>
                  </Box>
                  <Button onClick={() => { setIsEditMode(true) }}>
                     <PlaylistAddIcon sx={{ color: 'bgmode.light' }} />
                  </Button>
                  <Button onClick={toggleOpenFilter}>
                     <FilterListIcon sx={{ color: 'bgmode.light' }} />
                  </Button>
               </Toolbar>
            </AppBar>
            <CreateRecord isEditMode={isEditMode} setIsEditMode={setIsEditMode} selctedItem={selctedItem} setSelctedItem={setSelctedItem} />
            <TagsSelect toggleTagsMenu={toggleOpenFilter} isTagsMenuOpen={isOpenFilter} setSelectedTags={setSelectedTags} selectedTags={selectedTags} />
         </Box>

         {showAllRecords()}
      </Box>
   )
})