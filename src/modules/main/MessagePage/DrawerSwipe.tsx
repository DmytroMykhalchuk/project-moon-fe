import React, { useState } from 'react'
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import { styled } from '@mui/material/styles';
import { grey } from '@mui/material/colors';
import { Global } from '@emotion/react';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import { DialogConfirmation } from "./DialogConfirmation";
import { useDispatch } from 'react-redux';
import { changeLangCites, changeThemeColor, deleteMessageHistory, setCurrentDay, setNewMessage, ThemeColorType, themeValues } from '../../../redux/appReducer';


const StyledBox = styled(Box)(({ theme }) => ({
   backgroundColor: theme.palette.mode === 'light' ? '#fff' : grey[900],
}));

const Puller = styled(Box)(({ theme }) => ({
   width: 30,
   height: 6,
   backgroundColor: theme.palette.mode === 'light' ? grey[300] : grey[900],
   borderRadius: 3,
   position: 'absolute',
   top: 8,
   left: 'calc(50% - 15px)',
}));

type DrawerSwipeType = {
   setOpen: (arg: boolean) => void
   open: boolean
   sendMessageHandler: () => void,
   switcherHandler: () => void
   window?: any
   onScrollDummy: () => void
}

const DrawerSwipe: React.FC<DrawerSwipeType> = React.memo(({ switcherHandler, open, setOpen, sendMessageHandler, window, onScrollDummy }: DrawerSwipeType) => {
   const dispatch: any = useDispatch();
   const [isOpenConfirmation, setIsOpenConfirmation] = useState(false)
   const [fnToConfirmation, setfnToConfirmation] = useState('')
   const [dialogHeader, setDialogHeader] = useState('')
   const actions = {
      deleteMessageHistory: () => {
         dispatch(deleteMessageHistory())
      },
      setNewDay: (number: number) => {
         if (number !== undefined)
            dispatch(setCurrentDay(number))
         setTimeout(() => { onScrollDummy() }, 800);
      },
      changeLanguageCites: (lang: string) => {
         dispatch(changeLangCites(lang))
         setTimeout(() => { onScrollDummy() }, 800);

      },
      contactWithDev: () => {
         const text = `Пишіть мені: \n
         Instagram: @night__tramway 
         `;
         dispatch(setNewMessage(text));
         setTimeout(() => { onScrollDummy() }, 800);

      },
      supportProject: () => {
         const text = "https://t.me/projectmoon21";
         dispatch(setNewMessage(text));
         setTimeout(() => { onScrollDummy() }, 800);
      },
      changeTheme: (color: ThemeColorType) => {
         const theme = themeValues.filter(item => item.value === color)
         const text = 'Колір теми змінено на ' + theme[0].labelUa.toLowerCase();
         dispatch(setNewMessage(text));
         dispatch(changeThemeColor(color))
         setTimeout(() => { onScrollDummy() }, 800);
      }
   }
   return (
      <>

         <DialogConfirmation
            isOpenConfirmation={isOpenConfirmation}
            setIsOpenConfirmation={setIsOpenConfirmation}
            fnToConfirmation={fnToConfirmation}
            actions={actions}
            header={dialogHeader}
         />
         <Global
            styles={{
               '.MuiDrawer-root > .MuiPaper-root': {
                  height: `100px`,
                  overflow: 'visible',
               },
            }}
         />
         <SwipeableDrawer
            //@ts-ignore
            container={window !== undefined ? () => window().document.body : undefined}
            anchor="bottom"
            open={open}
            onClose={() => switcherHandler()}
            onOpen={() => switcherHandler()}
            swipeAreaWidth={0}
            disableSwipeToOpen={true}
            ModalProps={{
               keepMounted: false,
            }}
         >
            <StyledBox
               sx={{
                  position: 'absolute',
                  top: '-28px',
                  height: '100%',
                  borderTopLeftRadius: 8,
                  borderTopRightRadius: 8,
                  visibility: 'visible',
                  right: 0,
                  left: 0,
                  zIndex: '-1',
                  backgroundColor: 'bgmode.light'
               }}
            >
               <Puller />
            </StyledBox>
            <StyledBox
               sx={{
                  // px: 2,
                  pb: 2,
                  height: '98%',
                  overflow: 'auto',
                  display: 'flex',
                  justifyContent: 'center',
                  flexDirection: 'column'
               }}
            >
               <Stack direction="row" spacing={1} sx={{ p: 0 }}>

                  <Chip
                     label="Видалити історію повідомлень"
                     component="button"
                     variant="outlined"
                     clickable
                     onClick={() => { setfnToConfirmation('deleteMessageHistory'); setDialogHeader('Дійсно хочете очистити історію повідомлень?'); setIsOpenConfirmation(true) }}
                  />
                  <Chip
                     label="Змінити день"
                     component="button"
                     variant="outlined"
                     clickable
                     onClick={() => { setfnToConfirmation('setNewDay'); setDialogHeader('Введіть номер дня'); setIsOpenConfirmation(true) }}
                  />
                  <Chip
                     label="Змінити мову цитат"
                     component="button"
                     variant="outlined"
                     clickable
                     onClick={() => { setfnToConfirmation('changeLanguageCites'); setDialogHeader("Оберіть мову"); setIsOpenConfirmation(true) }}
                  />
                  <Chip
                     label="Змінити колір теми"
                     component="button"
                     variant="outlined"
                     clickable
                     onClick={() => { setfnToConfirmation('changeTheme'); setDialogHeader('Виберіть колір теми'); setIsOpenConfirmation(true) }}
                  />
                  <Chip
                     label="Підтримати проєкт"
                     component="button"
                     variant="outlined"
                     clickable
                     onClick={() => { actions.supportProject() }}
                  />
                  <Chip
                     label="Зв'язок із автором"
                     component="button"
                     variant="outlined"
                     clickable
                     onClick={() => { actions.contactWithDev() }}
                  />
                  <Chip
                     label="Повідомити про помилку"
                     component="button"
                     variant="outlined"
                     clickable
                     onClick={() => { actions.contactWithDev() }}
                  />

               </Stack>
            </StyledBox>
         </SwipeableDrawer>
      </>
   )
})
export default DrawerSwipe;