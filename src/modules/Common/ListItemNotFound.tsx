import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import Typography from '@mui/material/Typography'
import styles from './style.module.scss'

export const ListItemNotFound = () => {
   return <ListItem
      disablePadding
      disableGutters
      className={styles.listItem + " " + styles.listItem__dense}
   >
      <ListItemText primary={
         <Typography variant="body2">
            Не знайдено
         </Typography>
      } />
   </ListItem>
}