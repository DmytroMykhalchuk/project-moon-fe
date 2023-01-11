import React from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { triggerLetter } from './Records';
import styles from './styles.module.scss'

const checkSpelling = (str: string): string => {
   const sizeShrink = 3;
   for (let i = sizeShrink; i < str.length; i++) {
      if (!triggerLetter.includes(str[i - 1])) {
         return str.substring(0, i) + '.'
      }
   }
   return ''
}

export const PlaceHolder = React.memo(() => {
   const element = {title:'Запис', text:'Щось тут важливе написане :) '};
   const createDate = new Date();
   const nameMonth = checkSpelling(createDate.toLocaleString('default', { month: 'long' }))
   return <div>
      <Box sx={{ backgroundColor: '#2e2e2ec9', p: 1 }} className={styles.recordWrapper}
         onClick={() => { alert("Щоб редагувати запис - створіть його") }}
      >
         <Box className={styles.recordWrapper__titleBox} sx={{ borderColor: 'bgmode.light' }}>
            <Typography variant="h6" color="inherit">{createDate.getDate()}</Typography>
            <Typography variant="caption" color="inherit">{nameMonth}</Typography>
         </Box>
         <Box className={styles.recordWrapper__contentBox}>
            {element.title && <Typography variant="body1" color="inherit">{element.title}</Typography>}
            {element.text && <Typography variant="body2" color="inherit">
               {element.text.length > 50 ? `${element.text.slice(0, 50)}...` : element.text}
            </Typography>}
         </Box>
      </Box>
   </div>
})