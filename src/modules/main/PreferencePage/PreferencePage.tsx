import { Button, Card, CardActions, CardContent, Fab, Typography } from "@mui/material";
import { Box } from "@mui/system"
import Aims from "../../common/Aims";
import EditIcon from '@mui/icons-material/Edit';
import AimsPreference from "../../common/AimsPrefrence";
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import DialogWindow from "../../common/DialogWindow";
import { getDay, getMain, getMonth, getWeek } from "../../../redux/appStateSelector";
import { connect, ConnectedProps } from "react-redux";
import { AppStateType } from "../../../redux/store";


type PrefrencePageType = {
   openFinished: string
   setOpenFinished: (arg: string) => void
   openTrash: string
   setOpenTrash: (arg: string) => void
   isOpenDialog: boolean
   setIsOpenDialog: (arg: boolean) => void
   onOpenFinishedList: (arg: any) => void
   onOpenTrashList: (arg: any) => void
}
const PreferencePage = ({
   openFinished,
   setOpenFinished,
   openTrash,
   setOpenTrash,
   isOpenDialog,
   setIsOpenDialog,
   onOpenFinishedList,
   onOpenTrashList,
   day,
   week, month, main
}: PrefrencePageType & HeaderProps) => {

   return (
      <Box>

         <DialogWindow isOpenDialog={isOpenDialog} setIsOpenDialog={setIsOpenDialog} />
         <Fab color="secondary"
            onClick={() => { setIsOpenDialog(true); }}
            aria-label="edit"
            sx={{
               position: 'fixed',
               bottom: '80px',
               right: '16px'
            }}>
            <EditIcon />
         </Fab>

         <Card variant='outlined' sx={{ mb: 3 }}>
            <CardContent>
               <Typography variant="h5" color="text.secondary" component="div">
                  Цілі на день
               </Typography>
               <Aims listName={'day'} />

               <ListItemButton data-list-name="finished-day" onClick={onOpenFinishedList}>
                  <ListItemIcon>
                     <DoneAllIcon />
                  </ListItemIcon>
                  <ListItemText primary="Завершені" />
                  {openFinished === 'finished-main' ? <ExpandLess /> : <ExpandMore />}
               </ListItemButton>
               <Collapse in={openFinished === 'finished-day'}>
                  <AimsPreference listName={'day'} listFinished={day} />
               </Collapse>
               <ListItemButton data-list-name="trash-day" onClick={onOpenTrashList}>
                  <ListItemIcon>
                     <DeleteOutlineIcon />
                  </ListItemIcon>
                  <ListItemText primary="Корзина" />
                  {openTrash === 'trash-main' ? <ExpandLess /> : <ExpandMore />}
               </ListItemButton>
               <Collapse in={openTrash === 'trash-day'}>
                  <AimsPreference listName={'day'} listInTrash={day} />
               </Collapse>
            </CardContent>
         </Card>
         
         <Card variant='outlined' sx={{ mb: 3 }}>
            <CardContent>
               <Typography variant="h5" color="text.secondary" component="div">
                  Цілі на week
               </Typography>
               <Aims listName={'week'} />

               <ListItemButton data-list-name="finished-week" onClick={onOpenFinishedList}>
                  <ListItemIcon>
                     <DoneAllIcon />
                  </ListItemIcon>
                  <ListItemText primary="Завершені" />
                  {openFinished === 'finished-week' ? <ExpandLess /> : <ExpandMore />}
               </ListItemButton>
               <Collapse in={openFinished === 'finished-week'}>
                  <AimsPreference listName={'week'} listFinished={week} />
               </Collapse>
               <ListItemButton data-list-name="trash-week" onClick={onOpenTrashList}>
                  <ListItemIcon>
                     <DeleteOutlineIcon />
                  </ListItemIcon>
                  <ListItemText primary="Корзина" />
                  {openTrash === 'trash-week' ? <ExpandLess /> : <ExpandMore />}
               </ListItemButton>
               <Collapse in={openTrash === 'trash-week'}>
                  <AimsPreference listName={'week'} listInTrash={week} />
               </Collapse>
            </CardContent>
         </Card>


         <Card variant='outlined' sx={{ mb: 3 }}>
            <CardContent>
               <Typography variant="h5" color="text.secondary" component="div">
                  Цілі на month
               </Typography>
               <Aims listName={'month'} />

               <ListItemButton data-list-name="finished-month" onClick={onOpenFinishedList}>
                  <ListItemIcon>
                     <DoneAllIcon />
                  </ListItemIcon>
                  <ListItemText primary="Завершені" />
                  {openFinished === 'finished-month' ? <ExpandLess /> : <ExpandMore />}
               </ListItemButton>
               <Collapse in={openFinished === 'finished-month'}>
                  <AimsPreference listName={'month'} listFinished={month} />
               </Collapse>
               <ListItemButton data-list-name="trash-month" onClick={onOpenTrashList}>
                  <ListItemIcon>
                     <DeleteOutlineIcon />
                  </ListItemIcon>
                  <ListItemText primary="Корзина" />
                  {openTrash === 'trash-month' ? <ExpandLess /> : <ExpandMore />}
               </ListItemButton>
               <Collapse in={openTrash === 'trash-month'}>
                  <AimsPreference listName={'month'} listInTrash={month} />
               </Collapse>
            </CardContent>
         </Card>

         <Card variant='outlined' sx={{ mb: 3 }}>
            <CardContent>
               <Typography variant="h5" color="text.secondary" component="div">
                  Цілі на день
               </Typography>
               <Aims listName={'main'} />

               <ListItemButton data-list-name="finished-main" onClick={onOpenFinishedList}>
                  <ListItemIcon>
                     <DoneAllIcon />
                  </ListItemIcon>
                  <ListItemText primary="Завершені" />
                  {openFinished === 'finished-main' ? <ExpandLess /> : <ExpandMore />}
               </ListItemButton>
               <Collapse in={openFinished === 'finished-main'}>
                  <AimsPreference listName={'main'} listFinished={main} />
               </Collapse>
               <ListItemButton data-list-name="trash-main" onClick={onOpenTrashList}>
                  <ListItemIcon>
                     <DeleteOutlineIcon />
                  </ListItemIcon>
                  <ListItemText primary="Корзина" />
                  {openTrash === 'trash-main' ? <ExpandLess /> : <ExpandMore />}
               </ListItemButton>
               <Collapse in={openTrash === 'trash-main'}>
                  <AimsPreference listName={'main'} listInTrash={main} />
               </Collapse>
            </CardContent>
         </Card>
      </Box>
   )
}

const mapStateToProps = (state: AppStateType) => {
   return {
      main: getMain(state),
      month: getMonth(state),
      week: getWeek(state),
      day: getDay(state),
   }
}
const mapDispatchToProps = (dispatch: any) => {
   return {
      
   }
}

const connector = connect(mapStateToProps, mapDispatchToProps);
type HeaderProps = ConnectedProps<typeof connector>;
export default connector(PreferencePage);