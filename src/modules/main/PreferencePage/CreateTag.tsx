import React, { useState } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import Button from '@mui/material/Button'
import { AppDispatch } from '../../../redux/store'
import { createTag } from '../../../redux/appReducer'
import { useDispatch } from 'react-redux'
import styles from './styles.module.scss'

export const CreateTag = () => {
   const dispatch: AppDispatch = useDispatch()
   const [onChangeField, setOnChangeField] = useState('#')

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
   }

   return <Accordion >
      <AccordionSummary
         expandIcon={<ExpandMoreIcon />}
         aria-controls="panel1a-content"
         id="panel1a-header"
      >
         <Typography variant="subtitle1" color="inherit">
            Створити тег
         </Typography>
      </AccordionSummary>
      <AccordionDetails>
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
         <Button variant="text" color="inherit" className={styles.buttonConfirm} onClick={saveTag}>
            Зберегти
         </Button>
      </AccordionDetails>
   </Accordion>


}