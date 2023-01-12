import Box from '@mui/material/Box'
import Paper from "@mui/material/Paper"
import Typography from "@mui/material/Typography"
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { BACKGROUND_COLOR_CARDS } from "../../../themes"
import { useSelector } from 'react-redux'
import { getTags } from '../../../redux/appStateSelector'
import styles from './styles.module.scss'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import { DialogWindowCreateTag } from '../../common/DialogWindowCreateTag';
import { useState } from 'react';
import { ConfirmWindow } from '../../common/ConfirmWindow';
import { ConfirmWindowDeleteTag } from '../../common/ConfirmWindowDeleteTag';

export const PreferenceTags = () => {
   const tags = useSelector(getTags)

   const [isOpenDialogCreateTag, setIsOpenDialogCreateTag] = useState(false)
   const [isOpenDialogDeleteTag, setIsOpenDialogDeleteTag] = useState(false)
   const [currTag, setCurrTag] = useState('')
   const deleteTag = (tag: string) => {
      setCurrTag(tag)
      setIsOpenDialogDeleteTag(true)
   }
   const editTag = (tag: string) => {
      setCurrTag(tag)
      setIsOpenDialogCreateTag(true)
   }
   const showRecords = (tag: string) => {
      console.log(tag)
   }
   const renderTags = () => {
      if (!tags) return <div></div>
      let tagsComponent = [] as Array<JSX.Element>
      for (const tag of tags) {
         tagsComponent.push(<Paper elevation={2} className={styles.editRecords} key={tag}>
            <Box sx={{ minWidth: '50%', justifyContent: 'start' }}>
               {tag}
            </Box>
            <Box>
               <ModeEditIcon onClick={() => editTag(tag)} />
               <DeleteOutlineIcon onClick={() => deleteTag(tag)} />
            </Box>

         </Paper>)
      }
      return tagsComponent
   }

   return (<Box>
      <Box sx={{ mb: 3, backgroundColor: BACKGROUND_COLOR_CARDS ,p:0}}  >
         <Box>
            <Typography variant="h5" component="div" sx={{ p: 2, color: 'fpage.main' }}>
               Теги
            </Typography>
            {renderTags()}
         </Box>
      </Box >
      <DialogWindowCreateTag isOpenDialog={isOpenDialogCreateTag} setIsOpenDialog={setIsOpenDialogCreateTag} tagDialog={currTag} />
      <ConfirmWindowDeleteTag isOpenConfirmation={isOpenDialogDeleteTag} setIsOpenConfirmation={setIsOpenDialogDeleteTag} tag={currTag} />
   </Box>)
}