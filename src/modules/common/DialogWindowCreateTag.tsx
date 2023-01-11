import React, { useEffect } from 'react'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createTag, createTaskThunk } from '../../redux/appReducer';
import { AppDispatch } from '../../redux/store';
import { grey } from '@mui/material/colors'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'

type DialogWindowCreateTagType = {
   isOpenDialog: boolean
   setIsOpenDialog: (bool: boolean) => void
   tagDialog?: string
}
export const DialogWindowCreateTag: React.FC<DialogWindowCreateTagType> = React.memo(({
   isOpenDialog,
   setIsOpenDialog,
   tagDialog = "",
}) => {
   const dispatch: AppDispatch = useDispatch()
   const [onChangeField, setOnChangeField] = useState('#' + tagDialog)
   useEffect(() => {
      setOnChangeField('#' + tagDialog)
   }, [tagDialog])
   const onCHangeHandler = (text: string) => {
      if (text.length === 0) return
      text.startsWith('#')
         ? setOnChangeField(text)
         : setOnChangeField('#' + text)
   }

   const saveTag = () => {
      if (onChangeField.length > 1) {
         dispatch(createTag(onChangeField))
         setOnChangeField('#')
      }
      setIsOpenDialog(false)
   }
   const closeDialog = () => {
      setIsOpenDialog(false)
      setOnChangeField('#')
   }
   return (
      <Dialog open={isOpenDialog}
         onClose={() => { setIsOpenDialog(false) }}
         fullWidth
         maxWidth="md"


      >
         <Box sx={{ backgroundColor: grey[900] }}>

            <DialogTitle>Новий тег</DialogTitle>
            <DialogContent>
               <DialogContentText>
               </DialogContentText>
               <Box sx={{ pb: 2 }}>
                  <TextField
                     label="Тег"
                     size='small'
                     fullWidth
                     variant="standard"
                     value={onChangeField}
                     onChange={(el) => onCHangeHandler(el.target.value as string)}

                  />
               </Box>
            </DialogContent>
            <DialogActions>
               <Button onClick={closeDialog}>Скасувати</Button>
               <Button variant="text" color="inherit" onClick={saveTag}>
                  Зберегти
               </Button>
            </DialogActions>
         </Box>
      </Dialog>
   )
})
