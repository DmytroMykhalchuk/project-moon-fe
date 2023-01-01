import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { getDaily } from '../../../redux/appStateSelector'
import styles from './styles.module.scss'
import Typography from '@mui/material/Typography'
import Zoom from '@mui/material/Zoom'
import Box from '@mui/material/Box'
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import { CreateRecord } from './CreateRecord'
import { DailyRecordType } from '../../../redux/appReducer'
import { PlaceHolder } from './PlaceHolder'



export const triggerLetter = ['a', 'у', 'е', 'о', 'и', 'і', 'e', 'u', 'o', 'i', 'a']

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
      if (elementRecords.length === 0) {
         return <PlaceHolder />
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
})