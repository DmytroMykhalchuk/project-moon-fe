import React, { useState } from 'react';
import Backdrop from '@mui/material/Backdrop';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import AddIcon from '@mui/icons-material/Add';
import TagIcon from '@mui/icons-material/Tag';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import { DialogWindowCreateAim } from '../../common/DialogWindowCreateAim';
import { DialogWindowCreateTag } from '../../common/DialogWindowCreateTag';
import styles from './styles.module.scss'


export const SpeedDialTooltip = React.memo(() => {

   const [isOpenDialog, setIsOpenDialog] = useState(false);
   const [isOpenDialogCreateTag, setIsOpenDialogCreateTag] = useState(false);
   const [open, setOpen] = useState(false)
   const handleOpen = () => setOpen(true);
   const handleClose = () => setOpen(false);
   const openDialogCreateAim = () => {
      setOpen(false)
      setIsOpenDialog(true)
   }
   const openDialogCreateTag = () => {
      setOpen(false)
      setIsOpenDialogCreateTag(true)
   }
   const actions = [
      { icon: <ReceiptLongIcon />, name: 'Ціль', fn: openDialogCreateAim },
      { icon: <TagIcon />, name: 'Тег', fn: openDialogCreateTag },
   ];
   return (
      <>
         <Backdrop open={open} sx={{ zIndex: 1 }} />
         <SpeedDial
            ariaLabel="SpeedDial tooltip example"
            className={styles.fabButton}
            sx={{ position: 'fixed', bottom: 80, right: 16, '& button, & button:hover': { backgroundColor: 'bgmode.light' } }}
            icon={<AddIcon sx={{ color: 'fpage.main',transition:'all 0.6s' }} className={open ? styles._activeRotate : ''} />}
            onClose={handleClose}
            onOpen={handleOpen}
            open={open}
         >
            {actions.map((action) => (
               <SpeedDialAction
                  key={action.name}
                  icon={action.icon}
                  tooltipTitle={action.name}
                  tooltipOpen
                  onClick={action.fn}
               />
            ))}
         </SpeedDial>
         <DialogWindowCreateAim isOpenDialog={isOpenDialog} setIsOpenDialog={setIsOpenDialog} />
         <DialogWindowCreateTag isOpenDialog={isOpenDialogCreateTag} setIsOpenDialog={setIsOpenDialogCreateTag} />
      </>
   );
})