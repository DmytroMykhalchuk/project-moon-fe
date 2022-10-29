import List from '@mui/material/List';
import Box from '@mui/material/Box';
import { useSwipeable } from "react-swipeable";
import { useState } from "react";
import AimsListItem from './AimsListItem'
import { getDay, getMain, getMonth, getWeek } from "../../redux/appStateSelector";
import { connect, ConnectedProps } from 'react-redux';
import { AppStateType } from '../../redux/store';
import { completeTask, editTask, rePut } from '../../redux/appReducer';
import DialogWindow from './DialogWindow';

type AimsOwnType = {
   listName?: string
}


const Aims = ({ main, month, week, day, completeTask, rePut, editAim, listName = '' }: HeaderProps & AimsOwnType) => {
   const swipedLeft = (el: any) => {
      // el = el.target;
      const maxDepth = 5;
      let i = 0;
      let currentEl = null;
      while (true) {
         currentEl = el.parentNode;
         el = currentEl;
         i++;
         if (maxDepth < i || el.nodeName === 'LI') { break; }
      }
      setCurrentItem(el.getAttribute('data-item'));
      setSide('left');
   }
   const swipedRight = (el: any) => {

      const maxDepth = 5;
      let i = 0;
      let currentEl = null;
      while (true) {
         currentEl = el.parentNode;
         el = currentEl;
         i++;
         if (maxDepth < i || el.nodeName === 'LI') { break; }
      }
      setCurrentItem(el.getAttribute('data-item'));
      setSide('right');
   }
   const switchList = (fn: Function, cat: string, id: string | number) => {
      switch (cat) {
         case 'day': {
            fn(cat, id, day[id])
            break;
         }
         case 'week': {
            fn(cat, id, week[id])
            break;
         }
         case 'month': {
            fn(cat, id, month[id])
            break;
         }
         case 'main': {
            fn(cat, id, main[id])
            break;
         }
      }
   }
   const [currentItem, setCurrentItem] = useState('');
   const [side, setSide] = useState('');
   const [isOpenDialog, setIsOpenDialog] = useState(false)
   const [textDW, setTextDW] = useState('')
   const [categoryDW, setCategoryDW] = useState('')
   const [idWindow, setIdWindow] = useState('')
   const handlers = useSwipeable({
      onSwiping: (data) => {
         if (data.dir === "Left") {
            swipedLeft(data.event.target)
         } else if (data.dir === "Right") {
            swipedRight(data.event.target)

         }
      }
   });
   const completeHandler = (cat: string, id: string | number) => {
      switchList(completeTask, cat, id);

   }
   const toogleWindow = (category: string, text: string) => {
      // console.log(text,category)
      setCategoryDW(category);
      setTextDW(text)
      setIsOpenDialog(true);
   }
   const rePutHandler = (cat: string, id: string | number) => {
      switchList(rePut, cat, id);
   }
   const editItem = (cat: string, text: string) => {
      editAim(cat, idWindow, text);
   }


   switch (listName) {
      case 'day': {
         return (
            <Box sx={{}}>
               {isOpenDialog &&
                  <DialogWindow isOpenDialog={isOpenDialog}
                     setIsOpenDialog={setIsOpenDialog}
                     aimDialog={textDW}
                     categoryDialog={categoryDW}
                     editItemWindow={editItem}
                  />

               }
               <List {...handlers}
                  sx={{
                     width: '100%',
                     position: 'relative',
                     overflow: 'auto',
                     maxHeight: '100%',
                     '& ul': { padding: 0 },
                  }}
                  subheader={<li />}
                  dense
                  disablePadding
               >
                  <AimsListItem
                     currentItem={currentItem}
                     setCurrentItem={setCurrentItem}
                     side={side}
                     setSide={setSide}
                     listAims={day}
                     category="day"
                     header=""
                     completeHandler={completeHandler}
                     rePutHandler={rePutHandler}
                     toggleWindow={toogleWindow}
                     setIdWindow={setIdWindow}
                  />
               </List>
            </Box>)
      }
      case 'week': {
         return (
            <Box sx={{}}>
               {isOpenDialog &&
                  <DialogWindow isOpenDialog={isOpenDialog}
                     setIsOpenDialog={setIsOpenDialog}
                     aimDialog={textDW}
                     categoryDialog={categoryDW}
                     editItemWindow={editItem}
                  />

               }
               <List {...handlers}
                  sx={{
                     width: '100%',
                     position: 'relative',
                     overflow: 'auto',
                     maxHeight: '100%',
                     '& ul': { padding: 0 },
                  }}
                  subheader={<li />}
                  dense
                  disablePadding
               >
                  <AimsListItem
                     currentItem={currentItem}
                     setCurrentItem={setCurrentItem}
                     side={side}
                     setSide={setSide}
                     listAims={week}
                     category="week"
                     header=""
                     completeHandler={completeHandler}
                     rePutHandler={rePutHandler}
                     toggleWindow={toogleWindow}
                     setIdWindow={setIdWindow}
                  />
               </List>
            </Box>
         )
      }
      case 'month': {
         return (
            <Box sx={{}}>
               {isOpenDialog &&
                  <DialogWindow isOpenDialog={isOpenDialog}
                     setIsOpenDialog={setIsOpenDialog}
                     aimDialog={textDW}
                     categoryDialog={categoryDW}
                     editItemWindow={editItem}
                  />

               }
               <List {...handlers}
                  sx={{
                     width: '100%',
                     position: 'relative',
                     overflow: 'auto',
                     maxHeight: '100%',
                     '& ul': { padding: 0 },
                  }}
                  subheader={<li />}
                  dense
                  disablePadding
               >
                  <AimsListItem
                     currentItem={currentItem}
                     setCurrentItem={setCurrentItem}
                     side={side}
                     setSide={setSide}
                     listAims={month}
                     category="month"
                     header=""
                     completeHandler={completeHandler}
                     rePutHandler={rePutHandler}
                     toggleWindow={toogleWindow}
                     setIdWindow={setIdWindow}
                  />
               </List>
            </Box>)
      }

      case 'main': {
         return (
            <Box sx={{}}>
               {isOpenDialog &&
                  <DialogWindow isOpenDialog={isOpenDialog}
                     setIsOpenDialog={setIsOpenDialog}
                     aimDialog={textDW}
                     categoryDialog={categoryDW}
                     editItemWindow={editItem}
                  />

               }
               <List {...handlers}
                  sx={{
                     width: '100%',
                     position: 'relative',
                     overflow: 'auto',
                     maxHeight: '100%',
                     '& ul': { padding: 0 },
                  }}
                  subheader={<li />}
                  dense
                  disablePadding
               >
                  <AimsListItem
                     currentItem={currentItem}
                     setCurrentItem={setCurrentItem}
                     side={side}
                     setSide={setSide}
                     listAims={main}
                     category="main"
                     header=""
                     completeHandler={completeHandler}
                     rePutHandler={rePutHandler}
                     toggleWindow={toogleWindow}
                     setIdWindow={setIdWindow}
                  />
               </List>
            </Box>)
      }
      default:
         return (
            <Box sx={{}}>
               {isOpenDialog &&
                  <DialogWindow isOpenDialog={isOpenDialog}
                     setIsOpenDialog={setIsOpenDialog}
                     aimDialog={textDW}
                     categoryDialog={categoryDW}
                     editItemWindow={editItem}
                  />

               }
               <List {...handlers}
                  sx={{
                     width: '100%',
                     position: 'relative',
                     overflow: 'auto',
                     maxHeight: '100%',
                     '& ul': { padding: 0 },
                  }}
                  subheader={<li />}
                  dense
                  disablePadding
               >
                  <AimsListItem
                     currentItem={currentItem}
                     setCurrentItem={setCurrentItem}
                     side={side}
                     setSide={setSide}
                     listAims={day}
                     category="day"
                     header="Цілі на день"
                     completeHandler={completeHandler}
                     rePutHandler={rePutHandler}
                     toggleWindow={toogleWindow}
                     setIdWindow={setIdWindow}
                  />
                  <AimsListItem
                     currentItem={currentItem}
                     setCurrentItem={setCurrentItem}
                     side={side}
                     setSide={setSide}
                     listAims={week}
                     category="week"
                     header="Цілі на тиждень"
                     completeHandler={completeHandler}
                     rePutHandler={rePutHandler}
                     toggleWindow={toogleWindow}
                     setIdWindow={setIdWindow}
                  />
                  <AimsListItem
                     currentItem={currentItem}
                     setCurrentItem={setCurrentItem}
                     side={side}
                     setSide={setSide}
                     listAims={month}
                     category="month"
                     header="Цілі на місяць"
                     completeHandler={completeHandler}
                     rePutHandler={rePutHandler}
                     toggleWindow={toogleWindow}
                     setIdWindow={setIdWindow}
                  />
                  <AimsListItem
                     currentItem={currentItem}
                     setCurrentItem={setCurrentItem}
                     side={side}
                     setSide={setSide}
                     listAims={main}
                     category="main"
                     header="Dream"
                     completeHandler={completeHandler}
                     rePutHandler={rePutHandler}
                     toggleWindow={toogleWindow}
                     setIdWindow={setIdWindow}
                  />
               </List>
            </Box>
         )
   }

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
      completeTask: (category: string, id: string | number, object: Object) => {
         dispatch(completeTask(category, id, object));
      },
      rePut: (category: string, id: string | number, object: Object) => {
         dispatch(rePut(category, id, object))
      },
      editAim: (category: string, id: string, text: string) => {
         dispatch(editTask(category, id, text))
      }
   }
}

const connector = connect(mapStateToProps, mapDispatchToProps);
type HeaderProps = ConnectedProps<typeof connector>;
export default connector(Aims);
