import React, { useState, useEffect } from 'react';
import { DayPickerComponent } from './DayPickerComponent'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Box from '@mui/material/Box';
import styles from './styles.module.scss'
import Fab from '@mui/material/Fab';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import Zoom from '@mui/material/Zoom'
import InputBase from '@mui/material/InputBase';
import { grey } from '@mui/material/colors'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import CheckIcon from '@mui/icons-material/Check';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../../redux/store';
import { getCurrentDay } from '../../../redux/appStateSelector';
import { DailyRecordType, setNewDailyRecord } from '../../../redux/appReducer';
import TagIcon from '@mui/icons-material/Tag';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { ConfirmWindowDeleteRecord } from '../../common/ConfirmWindowDeleteRecord';
import { TagsSelect } from './TagsSelect';



const Transition = React.forwardRef(function Transition(
   props: TransitionProps & {
      children: React.ReactElement;
   },
   ref: React.Ref<unknown>,
) {
   return <Slide direction="left" ref={ref} {...props} />;
});

type RecordsByTagType = {
   isEditMode: boolean
   setIsEditMode: (arg1: boolean) => void
   selctedItem: DailyRecordType
   setSelctedItem: (arg1: DailyRecordType) => void
}
export const CreateRecord: React.FC<RecordsByTagType> = ({ isEditMode, setIsEditMode, selctedItem, setSelctedItem }) => {
   const dispatch: AppDispatch = useDispatch()
   const currDate = useSelector(getCurrentDay)
   const [isEditDate, setIsEditDate] = useState(false)
   const [selectedDate, setSelectedDate] = useState(() => {
      const dataMark = Object.keys(selctedItem)
      if (dataMark.length > 0) {
         return new Date(+dataMark[0])
      }
      return new Date()
   })
   const [recordId, setRecordId] = useState('')
   const [title, setTitle] = useState('')
   const [text, setText] = useState('')
   const [isOpenConfirmWindow, setisOpenConfirmWindow] = useState(false)
   const [isTagsMenuOpen, setisTagsMenuOpen] = useState(false)
   const [selectedTags, setSelectedTags] = useState([] as Array<string>)

   useEffect(() => {
      const dataMark = Object.keys(selctedItem)
      if (dataMark.length > 0) {
         const id = dataMark[0]
         setRecordId(id)
         setSelectedDate(new Date(+dataMark[0]))
         setTitle(selctedItem[id].title)
         setText(selctedItem[id].text)
      } else {
         setSelectedDate(new Date())
      }
   }, [selctedItem])

   const toggleTagsMenu = () => {
      setisTagsMenuOpen((prev: boolean) => !prev)
   }

   const handleClose = () => {
      setIsEditMode(false);
      setTitle('')
      setText('')
      setSelectedDate(new Date())
      setSelctedItem({} as DailyRecordType)
   }
   const saveRecord = () => {
      dispatch(setNewDailyRecord(currDate, title, text, [], selectedDate))
      setIsEditMode(false)
      setTitle('')
      setText('')
      setSelectedDate(new Date())
      setSelctedItem({} as DailyRecordType)
   }
   return (
      <div>
         <TagsSelect isTagsMenuOpen={isTagsMenuOpen} toggleTagsMenu={toggleTagsMenu} setSelectedTags={setSelectedTags} selectedTags={selectedTags} />
         <Dialog
            fullScreen
            open={isEditMode}
            onClose={handleClose}
            TransitionComponent={Transition}
         >
            <Zoom in={true}>
               <Fab
                  onClick={() => { saveRecord() }}
                  aria-label="edit"
                  sx={{
                     position: 'fixed',
                     bottom: '20px',
                     right: '16px',
                     backgroundColor: 'bgmode.light',
                     color: 'bgmode.circle',
                     '&:hover': {
                        backgroundColor: 'bgmode.dark'
                     }
                  }}>
                  <CheckIcon />
               </Fab>
            </Zoom>
            <AppBar sx={{ position: 'relative' }}>
               <Toolbar>
                  <Box sx={{ flexGrow: 1 }}>

                     <IconButton
                        edge="start"
                        color="inherit"
                        onClick={handleClose}
                        aria-label="close"

                     >
                        <ArrowBackIosIcon />
                     </IconButton>
                  </Box>
                  <Box sx={{ display: 'flex', gap: '2em' }}>
                     <DeleteOutlineIcon onClick={() => setisOpenConfirmWindow(true)} sx={{ cursor: 'pointer' }} />
                     <TagIcon onClick={() => { setisTagsMenuOpen(true) }} sx={{ cursor: 'pointer' }} />
                  </Box>
               </Toolbar>
            </AppBar>

            <Box sx={{ p: 1, pt: 2 }} >
               <Box className={styles.wrapperFormRecord} sx={{ backgroundColor: grey[800] }}>
                  <Box  >
                     <InputBase placeholder='Title' type='text'
                        fullWidth
                        value={title}
                        onChange={(el) => setTitle(el.target.value)}
                        sx={{ fontSize: '1.4em', mt: 2 }}
                     />
                  </Box>
                  <Box>
                     <InputBase
                        sx={{ fontSize: '0.9em' }}
                        placeholder='........'
                        type='text'
                        fullWidth
                        multiline
                        value={text}
                        onChange={(el) => setText(el.target.value)}
                        minRows={8}
                     />
                  </Box>
                  <Box>
                     <Typography variant="body2" color="inherit">Теги: {selectedTags.map((tag: string) => `#${tag}`).join(', ')}</Typography>
                  </Box>
                  <Box className={styles.wrapperFormRecord__footer} sx={{ borderColor: 'bgmode.light', paddingTop: '8px !important' }} >
                     <Typography variant="caption" color="inherit">{new Date().toLocaleTimeString().slice(0, 5)}</Typography>
                     <Box className={styles.dataPick}>
                        <Typography variant="caption" color="inherit" onClick={() => setIsEditDate(true)}>
                           {selectedDate.toLocaleDateString('ua-US', { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric' })}
                        </Typography>
                        <CalendarMonthIcon sx={{ fontSize: '1.2em' }} />
                     </Box>
                  </Box>
               </Box>
               <Box>
                  <DailogDatePicker isEditDate={isEditDate} setSelectedDate={setSelectedDate} setIsEditDate={setIsEditDate} selectedDate={selectedDate} />
               </Box>
            </Box>
            <ConfirmWindowDeleteRecord isOpenConfirmation={isOpenConfirmWindow} setIsOpenConfirmation={setisOpenConfirmWindow} id={recordId} handleCloseDialog={handleClose} />
         </Dialog>
      </div >
   );
}
type DailogDatePickerType = {
   isEditDate: boolean
   setSelectedDate: (arg1: Date) => void
   selectedDate: Date
   setIsEditDate: (arg1: boolean) => void
}
const DailogDatePicker: React.FC<DailogDatePickerType> = ({ isEditDate, setSelectedDate, setIsEditDate, selectedDate }) => {
   return <Dialog open={isEditDate} aria-labelledby={'data-picker'}>
      <Box sx={{ backgroundColor: grey[800] }}>
         <DialogContent>
            <DayPickerComponent selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
         </DialogContent>
         <DialogActions>
            <Button onClick={() => setIsEditDate(false)}>
               Ok
            </Button>
         </DialogActions>
      </Box>
   </Dialog>
}
