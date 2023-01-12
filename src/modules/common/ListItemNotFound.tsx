import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import Typography from '@mui/material/Typography'

export const ListItemNotFound = () => {
   return <ListItem
      disablePadding
      disableGutters
      divider
      sx={{ height: '50px', padding: '0 10px' }}
   >
      <ListItemText primary={
         <Typography variant="body2">
            Не знайдено
         </Typography>
      } />
   </ListItem>
}