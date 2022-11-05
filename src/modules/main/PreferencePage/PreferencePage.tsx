import { Card, CardContent, Fab, Typography } from "@mui/material";
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
import AddIcon from '@mui/icons-material/Add';

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

   const listConfig: any = {
      main: {
         main,
         header: "Мрія"
      }, month: { month, header: "Цілі на місяць" },
      week: { week, header: "Цілі на тиждень" },
      day: { day, header: "Цілі на день" },
      trashName: 'Корзина',
      finishedName: 'Завершені'
   }
   return (
      <Box>

         <DialogWindow isOpenDialog={isOpenDialog} setIsOpenDialog={setIsOpenDialog} />
         <Fab color="secondary"
            onClick={() => { setIsOpenDialog(true); }}
            aria-label="edit"
            sx={{
               position: 'fixed',
               bottom: '80px',
               right: '16px',
               backgroundColor:'#fff'
            }}>
               <AddIcon />
         </Fab>

         {['day', 'week', 'month', 'main'].map(item => {
            return <Card variant='outlined' sx={{ mb: 3 }} key={item}>
               <CardContent>
                  <Typography variant="h5" color="text.secondary" component="div">
                     {listConfig[item].header}
                  </Typography>
                  <Aims listName={item} />
                  <ListItemButton data-list-name={`finished-${item}`} onClick={onOpenFinishedList}>
                     <ListItemIcon>
                        <DoneAllIcon />
                     </ListItemIcon>
                     <ListItemText primary={listConfig.finishedName} />
                     {openFinished === `finished-${item}` ? <ExpandLess /> : <ExpandMore />}
                  </ListItemButton>
                  <Collapse in={openFinished === `finished-${item}`}>
                     <AimsPreference listName={item} listFinished={listConfig[item][item]} />
                  </Collapse>
                  <ListItemButton data-list-name={`trash-${item}`} onClick={onOpenTrashList}>
                     <ListItemIcon>
                        <DeleteOutlineIcon />
                     </ListItemIcon>
                     <ListItemText primary={listConfig.trashName} />
                     {openTrash === 'trash-main' ? <ExpandLess /> : <ExpandMore />}
                  </ListItemButton>
                  <Collapse in={openTrash === `trash-${item}`}>
                     <AimsPreference listName={item} listInTrash={listConfig[item][item]} />
                  </Collapse>
               </CardContent>
            </Card>
         })}
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