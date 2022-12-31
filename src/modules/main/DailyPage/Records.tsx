import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { getDaily, getRecords } from '../../../redux/appStateSelector'
import styles from './styles.module.scss'
import { RecordsByTag } from './RecordsByTag'
import { DailyPageContainer } from './DailyPageContainer'
import Typography from '@mui/material/Typography'
import Zoom from '@mui/material/Zoom'
import Paper from '@mui/material/Paper'
import Box from '@mui/material/Box'
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Fab from '@mui/material/Fab';
import SettingsIcon from '@mui/icons-material/Settings'
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import AddIcon from '@mui/icons-material/Add';
import { CreateRecord } from './CreateRecord'
import { DailyRecordType } from '../../../redux/appReducer'



const triggerLetter = ['a', 'у', 'е', 'о', 'и', 'і', 'e', 'u', 'o', 'i', 'a']

export const Records = React.memo(() => {
   const [isEditMode, setIsEditMode] = useState(false)
   const [selctedItem, setSelctedItem] = useState({} as DailyRecordType)
   // const [renderTag, setRenderTag] = useState('')
   // const records = useSelector(getRecords)

   // const deleteTag = (tag: string) => {
   //    console.log(tag)
   // }
   // const editTag = (tag: string) => {
   //    console.log(tag)
   // }
   // const showRecords = (tag: string) => {
   //    setRenderTag(tag)
   // }

   // const renderTags = () => {
   //    let tags = [] as Array<JSX.Element>
   //    for (const tag in records) {
   //       if (Object.prototype.hasOwnProperty.call(records, tag)) {
   //          const element = records[tag];
   //          tags.push(<Paper elevation={isEditMode ? 2 : 21} className={styles.editRecords} key={tag} onClick={() => showRecords(tag)}>
   //             <Typography variant="subtitle1" component='div' color="inherit">
   //                {tag}
   //                {isEditMode && <Box>
   //                   <ModeEditIcon onClick={() => editTag(tag)} />
   //                   <DeleteIcon onClick={() => deleteTag(tag)} />
   //                </Box>}
   //             </Typography>
   //          </Paper>)
   //       }
   //    }
   //    return tags
   // }

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
      elementRecords.reverse()
      return elementRecords;
   }
   return (
      <Box>


         {showAllRecords()}
         <Zoom in={true}>
            <Fab
               onClick={() => { setIsEditMode(true) }}
               aria-label="edit"
               sx={{
                  position: 'fixed',
                  bottom: '80px',
                  right: '16px',
                  backgroundColor: 'bgmode.light',
                  color: 'bgmode.circle',
                  '&:hover': {
                     backgroundColor: 'bgmode.dark'
                  }
               }}>
               <AddIcon />
            </Fab>
         </Zoom>
         <CreateRecord isEditMode={isEditMode} setIsEditMode={setIsEditMode} selctedItem={selctedItem} setSelctedItem={setSelctedItem} />
      </Box>
   )

   // return (
   //    <Box>
   //       <RecordsByTag tag={renderTag} setRenderTag={setRenderTag} records={records} />
   //       <Box sx={{ mb: 2 }}>
   //          {renderTags()}
   //       </Box>

   //       <Box sx={{ mb: 2 }}>
   //          <Paper elevation={isEditMode ? 22 : 7} className={styles.editRecords} onClick={() => { setIsEditMode((prev) => !prev) }}>
   //             <Typography variant="h6" component='div' color="inherit">
   //                <SettingsIcon /> Редагувати
   //             </Typography>
   //          </Paper>
   //       </Box>

   //       <Collapse in={isEditMode}>
   //          <CreateTag />
   //       </Collapse>
   //    </Box >
   // )
   // return <DailyPageContainer />
})