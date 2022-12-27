import { useState } from 'react'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';

type ConfirmWindowType = {
   isOpenConfirmation: boolean,
   setIsOpenConfirmation: (arg: boolean) => void
   fnToConfirmation: any
   actions: any
   header: string
}
const languages = [
   {
      value: 'Eng',
      label: 'English',
   },
   {
      value: 'Ua',
      label: 'Українська',
   },
];
export const DialogConfirmation: React.FC<ConfirmWindowType> = ({
   isOpenConfirmation,
   setIsOpenConfirmation,
   header,
   fnToConfirmation, actions
}) => {
   const [language, setLanguage] = useState(localStorage.langCites);
   const [onChangeField, setOnChangeField] = useState('')
   const onChangeHandle = (number: number | string) => {
      setOnChangeField(+number > 500 ? '500' : `${number}`)
   }
   return (
      <Dialog
         open={isOpenConfirmation}
         onClose={() => { setIsOpenConfirmation(false) }}
         aria-labelledby="alert-dialog-title"
         aria-describedby="alert-dialog-description"
         maxWidth="xs"
         fullWidth
      >
         <DialogContent sx={{ backgroundColor: "#323232" }}>
            <DialogContentText id="alert-dialog-description" sx={{  }}>
               {header}
               {fnToConfirmation === 'setNewDay' &&
                  <div>
                     <TextField
                        sx={{ mt: 3}}
                        color="warning"
                        autoFocus
                        margin="dense"
                        value={onChangeField}
                        type={fnToConfirmation === 'setNewDay' ? 'number' : 'text'}
                        id="outlined-size-small"
                        size="small"
                        onChange={(el) => { onChangeHandle(el.target.value) }}
                        fullWidth
                     />
                  </div>
               }
               {fnToConfirmation === 'changeLanguageCites' &&
                  <TextField
                     sx={{ mt: 3}}
                     color="warning"
                     autoFocus
                     margin="dense"
                     fullWidth
                     id="outlined-select-currency"
                     select
                     label="Мова"
                     value={language}
                     onChange={(el) => setLanguage(el.target.value)}

                  >
                     {languages.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                           {option.label}
                        </MenuItem>
                     ))}
                  </TextField>
               }

            </DialogContentText>
         </DialogContent>
         <DialogActions sx={{ backgroundColor: "#323232" }}>
            <Button 
            sx={{color:'#FFF'}}
            onClick={() => { setIsOpenConfirmation(false) }}>Скасувати</Button>
            <Button 
            sx={{color:'#FFF'}}
            onClick={() => {
               setIsOpenConfirmation(false);
               if (fnToConfirmation === 'setNewDay') {
                  actions[fnToConfirmation](onChangeField)
                  setOnChangeField('')

               } else if (fnToConfirmation === 'changeLanguageCites') {
                  actions[fnToConfirmation](language)
               } else {
                  actions[fnToConfirmation]()
               }

            }} autoFocus>
               Підтвердити
            </Button>
         </DialogActions>
      </Dialog>
   )
}