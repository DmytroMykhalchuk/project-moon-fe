import React, { useState } from 'react'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import Collapse from '@mui/material/Collapse'
import SettingsIcon from '@mui/icons-material/Settings'
import styles from './styles.module.scss'
import { CreateTag } from './CreateTag'
import { useSelector } from 'react-redux'
import { getRecords } from '../../../redux/appStateSelector'
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteIcon from '@mui/icons-material/Delete';
import { RecordsByTag } from './RecordsByTag'
import { DailyPageContainer } from './DailyPageContainer'

export const Records = React.memo(() => {
   // const [isEditMode, setIsEditMode] = useState(false)
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
   return <DailyPageContainer />
})