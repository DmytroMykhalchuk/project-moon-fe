import React, { useState } from 'react'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';
import { getThemeColor } from '../../../redux/appStateSelector';
import { useSelector } from 'react-redux';
import { themeValues } from '../../../redux/appReducer';

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

const textCansel = 'Скасувати'
const textConfirm = 'Підтвердити'

type ConfirmWindowType = {
   isOpenConfirmation: boolean,
   setIsOpenConfirmation: (arg: boolean) => void
   fnToConfirmation: string
   actions: any
   header: string
}

export const DialogConfirmation: React.FC<ConfirmWindowType> = React.memo(({
   isOpenConfirmation,
   setIsOpenConfirmation,
   header,
   fnToConfirmation, actions
}) => {
   const [selectedItem, setSelectedItem] = useState(localStorage.langCites);
   const [onChangeField, setOnChangeField] = useState('')
   const onChangeHandle = (number: string) => {
      setOnChangeField(+number > 500 ? '500' : `${number}`)
   }
   const switchDialogContent = {
      changeLanguageCites: <FieldLanguageCites selectedItem={selectedItem} setSelectedItem={setSelectedItem} setIsOpenConfirmation={setIsOpenConfirmation} actions={actions} fnToConfirmation={fnToConfirmation} />,
      setNewDay: <FieldSetDay onChangeHandle={onChangeHandle} onChangeField={onChangeField} setIsOpenConfirmation={setIsOpenConfirmation} actions={actions} fnToConfirmation={fnToConfirmation} />,
      changeTheme: <FieldThemeColor selectedItem={selectedItem} setSelectedItem={setSelectedItem} setIsOpenConfirmation={setIsOpenConfirmation} actions={actions} fnToConfirmation={fnToConfirmation} />,
   }
   const renderDialogContent = () => {
      //@ts-ignore
      if (switchDialogContent[fnToConfirmation]) {//@ts-ignore
         return switchDialogContent[fnToConfirmation]
      } else {
         return <div />
      }
   }
   const renderDialogFooter = () => {
      //@ts-ignore
      if (!switchDialogContent[fnToConfirmation]) {
         return <ConfirmationSecondary actions={actions} fnToConfirmation={fnToConfirmation} setIsOpenConfirmation={setIsOpenConfirmation} />
      } else {
         return <div />
      }
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
            <DialogContentText id="alert-dialog-description" sx={{}}>
               {header}
            </DialogContentText>

            {renderDialogContent()}
         </DialogContent>
         {renderDialogFooter()}
      </Dialog>
   )
})

type FieldLanguageCitesType = {
   selectedItem: string
   setSelectedItem: (arg1: string) => void
   setIsOpenConfirmation: (arg1: boolean) => void
   actions: any
   fnToConfirmation: string
}
const FieldLanguageCites: React.FC<FieldLanguageCitesType> = ({ selectedItem, setSelectedItem, setIsOpenConfirmation, actions, fnToConfirmation }) => {
   return (<>
      <Box>
         <TextField
            sx={{ mt: 3 }}
            color="warning"
            autoFocus
            margin="dense"
            fullWidth
            id="outlined-select-currency"
            select
            label="Мова"
            value={selectedItem}
            onChange={(el) => setSelectedItem(el.target.value)}
         >
            {languages.map((option) => (
               <MenuItem key={option.value} value={option.value}>
                  {option.label}
               </MenuItem>
            ))}
         </TextField>
      </Box>
      <DialogActions sx={{ backgroundColor: "#323232" }}>
         <Button
            sx={{ color: '#FFF' }}
            onClick={() => { setIsOpenConfirmation(false) }}>{textCansel}</Button>
         <Button
            sx={{ color: '#FFF' }}
            onClick={() => {
               setIsOpenConfirmation(false);
               actions[fnToConfirmation](selectedItem)
            }} autoFocus>
            {textConfirm}
         </Button>
      </DialogActions>
   </>
   )
}
type FieldSetDayType = {
   onChangeHandle: (arg1: string) => void
   onChangeField: string
   setIsOpenConfirmation: (arg1: boolean) => void
   actions: any
   fnToConfirmation: string
}
const FieldSetDay: React.FC<FieldSetDayType> = ({ onChangeHandle, onChangeField, setIsOpenConfirmation, actions, fnToConfirmation }) => {
   return <>
      <div>
         <TextField
            sx={{ mt: 3 }}
            color="warning"
            autoFocus
            margin="dense"
            value={onChangeField}
            type='number'
            id="outlined-size-small"
            size="small"
            onChange={(el) => { onChangeHandle(el.target.value) }}
            fullWidth
         />
      </div>
      <DialogActions sx={{ backgroundColor: "#323232" }}>
         <Button
            sx={{ color: '#FFF' }}
            onClick={() => { setIsOpenConfirmation(false) }}>{textCansel}</Button>
         <Button
            sx={{ color: '#FFF' }}
            onClick={() => {
               setIsOpenConfirmation(false);
               actions[fnToConfirmation](onChangeField)
            }} autoFocus>
            {textConfirm}
         </Button>
      </DialogActions>
   </>
}
type FieldThemeColorType = {
   selectedItem: string
   setSelectedItem: (arg1: string) => void
   setIsOpenConfirmation: (arg1: boolean) => void
   actions: any
   fnToConfirmation: string
}
const FieldThemeColor: React.FC<FieldThemeColorType> = ({ selectedItem, setSelectedItem, setIsOpenConfirmation, actions, fnToConfirmation }) => {
   const themeColor = useSelector(getThemeColor)
   return <>
      <Box>
         <TextField
            sx={{ mt: 3 }}
            color="warning"
            autoFocus
            margin="dense"
            fullWidth
            id="outlined-select-currency"
            select
            label="Колір"
            value={selectedItem}
            onChange={(el) => setSelectedItem(el.target.value)}
         >
            {themeValues.map((option) => {
               return <MenuItem key={option.value} value={option.value} defaultChecked={option.value === themeColor}>
                  {`${option.labelUa.charAt(0).toLocaleUpperCase()}${option.labelUa.slice(1)}`}
               </MenuItem>
            })}
         </TextField>
      </Box>
      <DialogActions sx={{ backgroundColor: "#323232" }}>
         <Button
            sx={{ color: '#FFF' }}
            onClick={() => { setIsOpenConfirmation(false) }}>{textCansel}</Button>
         <Button
            sx={{ color: '#FFF' }}
            onClick={() => {
               setIsOpenConfirmation(false);
               actions[fnToConfirmation](selectedItem)
            }} autoFocus>
            {textConfirm}
         </Button>
      </DialogActions>
   </>
}
type ConfirmationSecondaryType = {
   fnToConfirmation: string,
   setIsOpenConfirmation: (arg1: boolean) => void
   actions: any
}
const ConfirmationSecondary: React.FC<ConfirmationSecondaryType> = ({ fnToConfirmation, actions, setIsOpenConfirmation }) => {
   return <DialogActions sx={{ backgroundColor: "#323232" }}>
      <Button
         sx={{ color: '#FFF' }}
         onClick={() => { setIsOpenConfirmation(false) }}>{textCansel}</Button>
      <Button
         sx={{ color: '#FFF' }}
         onClick={() => {
            setIsOpenConfirmation(false);
            actions[fnToConfirmation]()
         }} autoFocus>
         {textConfirm}
      </Button>
   </DialogActions>
}