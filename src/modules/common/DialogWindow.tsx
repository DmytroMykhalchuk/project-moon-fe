import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useState } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { createTaskThunk } from '../../redux/appReducer';
type DialogWindowType = {
   isOpenDialog: boolean
   setIsOpenDialog: (bool: boolean) => void
   categoryDialog?: string
   aimDialog?: string
   editItemWindow?: (arg1: string, arg2: string) => void

}
const DialogWindow = ({ 
isOpenDialog, 
setIsOpenDialog, 
createAim, 
categoryDialog = "", 
aimDialog = "", 
...props 
}: DialogWindowType & HeaderProps) => {
   const [category, setCategory] = useState(categoryDialog);
   const [aim, setAim] = useState(aimDialog)
   const handleChangeCategory = (event: any) => {
      setCategory(event.target.value);
   };
   const sendForm = () => {
      if (props.editItemWindow) {
         props.editItemWindow(category, aim)
      } else {
         createAim(category, aim)
      }
      setAim('')
      setCategory('');
   }

   return (
      <Dialog open={isOpenDialog}
         onClose={() => { setIsOpenDialog(false) }}
         fullWidth
         maxWidth="md"
      >
         <DialogTitle>Нова мета</DialogTitle>
         <DialogContent>
            <DialogContentText>
            </DialogContentText>
            <TextField
               autoFocus
               margin="normal"
               id="name"
               label="Ціль"
               type="text"
               fullWidth
               variant="standard"
               sx={{ mb: 2 }}
               value={aim}
               onChange={(el) => setAim(el.target.value)}
            />
            <FormControl fullWidth variant="standard">
               <InputLabel id="demo-simple-select-label">Категорія</InputLabel>
               <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={category}
                  label="Age"
                  onChange={handleChangeCategory}
               >
                  <MenuItem value={'day'}>На День</MenuItem>
                  <MenuItem value={'week'}>На тиждень</MenuItem>
                  <MenuItem value={'month'}>На місяць</MenuItem>
                  <MenuItem value={'main'}>Мрія</MenuItem>
               </Select>
            </FormControl>
         </DialogContent>
         <DialogActions>
            <Button onClick={() => { setIsOpenDialog(false) }}>Скасувати</Button>
            <Button onClick={() => {
               setIsOpenDialog(false);
               sendForm();
            }}>Підтвердити</Button>
         </DialogActions>
      </Dialog>
   )

}
const mapDispatchToProps = (dispatch: any) => {
   return {
      createAim: (category: string, text: string) => {
         dispatch(createTaskThunk(category, text))
      }
   }
}

const connector = connect(null, mapDispatchToProps);
type HeaderProps = ConnectedProps<typeof connector>;
export default connector(DialogWindow);