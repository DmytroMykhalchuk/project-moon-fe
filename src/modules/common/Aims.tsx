import List from '@mui/material/List';
import Box from '@mui/material/Box';
import { useSwipeable } from "react-swipeable";
import { useState, useEffect } from "react";
import AimsListItem from './AimsListItem'
import { getDay, getMain, getMonth, getWeek } from "../../redux/appStateSelector";
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../redux/store';
import { finishTaskThunk, rePutTaskThunk, editTaskThunk } from '../../redux/appReducer';
import DialogWindow from './DialogWindow';

const isNumberElementsToShow = (list: any, cat: string) => {
   let counter = 0;
   for (const item in list) {
      if (!list[item].isFinished) {
         counter++;
      }
   }
   if (cat === 'day') {
      return true
   }
   if (cat === 'main') {
      return true
   }
   return counter !== 0;
}

type AimsOwnType = {
   listName?: string
   isHome?: boolean
}
const Aims: React.FC<AimsOwnType> = ({ listName = '', isHome }) => {
   const listConfig: any = {
      main: { list: useSelector(getMain), header: "Мрія" },
      month: { list: useSelector(getMonth), header: "Цілі на місяць" },
      week: { list: useSelector(getWeek), header: "Цілі на тиждень" },
      day: { list: useSelector(getDay), header: "Цілі на день" }
   }
   const dispatch: AppDispatch = useDispatch();
   const [currentItem, setCurrentItem] = useState('');
   const [side, setSide] = useState('');
   const [isOpenDialog, setIsOpenDialog] = useState(false)
   const [textDW, setTextDW] = useState('')
   const [categoryDW, setCategoryDW] = useState('')
   const [idWindow, setIdWindow] = useState('')
   const [task, setTask] = useState({} as any);
   const [oldCategory, setOldCategory] = useState('')
   const [listElements, setListElements] = useState(['day', 'week', 'month', 'main'])

   useEffect(() => {
      setListElements(() => {
         let str = [] as Array<string>
         if (isHome) {
            isNumberElementsToShow(listConfig['day']['list'], 'day') && str.push('day');
            isNumberElementsToShow(listConfig['week']['list'], 'week') && str.push('week')
            isNumberElementsToShow(listConfig['month']['list'], 'month') && str.push('month')
            isNumberElementsToShow(listConfig['main']['list'], 'main') && str.push('main')
         }
         return str;
      });
   }, [listConfig.day.list, listConfig.week.list, listConfig.month.list, listConfig.main.list])

   const switchList = (fn: Function, cat: string, id: string | number) => {
      dispatch(fn(cat, id, listConfig[cat].list[id]));
   }
   const swipeHandlers = useSwipeable({
      onSwipeStart: (data) => {
         if (data.dir === "Left") {
            swipedLeft(data.event.target)
         } else if (data.dir === "Right") {
            swipedRight(data.event.target)
         }
      },
   });
   const swipedLeft = (el: any) => {
      const maxDepth = 5;
      let i = 0;
      let currentEl = null;
      while (true) {
         currentEl = el.parentNode;
         el = currentEl;
         i++;
         if (maxDepth < i || el.nodeName === 'LI') { break; }
      }
      if (side === 'right') {
         setSide('');
         setCurrentItem('');
         return;
      } else {
         setSide('left')
         setCurrentItem(el.getAttribute('data-item'));
         return;
      }
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
      if (side === 'left') {
         setSide('');
         setCurrentItem('');
         return;
      } else {
         setSide('right')
         setCurrentItem(el.getAttribute('data-item'));
         return;
      }
   }

   const completeHandler = (cat: string, id: string | number) => {
      switchList(finishTaskThunk, cat, id);
   }

   const rePutHandler = (cat: string, id: string | number) => {
      switchList(rePutTaskThunk, cat, id);
   }
   const editItem = (cat: string, text: string) => {
      dispatch(editTaskThunk(oldCategory, cat, idWindow, text, task));
   }
   const toogleWindow = (category: string, text: string) => {
      setCategoryDW(category);
      setTextDW(text)
      setIsOpenDialog(true);
   }

   const listToShow = () => {
      if (listName) {
         return (
            <AimsListItem
               currentItem={currentItem}
               side={side}
               listAims={listConfig
               [listName].list}
               category={listName}
               header=""
               completeHandler={completeHandler}
               rePutHandler={rePutHandler}
               toggleWindow={toogleWindow}
               setIdWindow={setIdWindow}
               setTask={setTask}
               setOldCategory={setOldCategory}
            />
         )
      } else {
         return (
            listElements.map(item => {
               return <AimsListItem
                  key={item}
                  currentItem={currentItem}
                  side={side}
                  listAims={listConfig
                  [item].list}
                  category={`${item}`}
                  header={listConfig
                  [item].header}
                  completeHandler={completeHandler}
                  rePutHandler={rePutHandler}
                  toggleWindow={toogleWindow}
                  setIdWindow={setIdWindow}
                  setTask={setTask}
                  setOldCategory={setOldCategory}
               />
<<<<<<< HEAD
            </List>
         </Box>)
   } else {
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
            <List {...swipeHandlers}
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
               {listElements.map(item => {
                  return <AimsListItem
<<<<<<< HEAD
=======
                     key={item}
>>>>>>> d5b297a (minimal functioanal completed)
                     currentItem={currentItem}
                     setCurrentItem={setCurrentItem}
                     side={side}
                     setSide={setSide}
                     listAims={listConfig
                     [item][item]}
                     category={`${item}`}
                     header={listConfig
                     [item].header}
                     completeHandler={completeHandler}
                     rePutHandler={rePutHandler}
                     toggleWindow={toogleWindow}
                     setIdWindow={setIdWindow}
                     setTask={setTask}
                     setOldCategory={setOldCategory}
                  />
               })}
            </List>
         </Box>
      )
   }
   // switch (listName) {
   //    case 'day': {
   //       return (
   //          <Box sx={{}}>
   //             {isOpenDialog &&
   //                <DialogWindow isOpenDialog={isOpenDialog}
   //                   setIsOpenDialog={setIsOpenDialog}
   //                   aimDialog={textDW}
   //                   categoryDialog={categoryDW}
   //                   editItemWindow={editItem}
   //                />

   //             }
   //             <List {...swipeHandlers}
   //                sx={{
   //                   width: '100%',
   //                   position: 'relative',
   //                   overflow: 'auto',
   //                   maxHeight: '100%',
   //                   '& ul': { padding: 0 },
   //                }}
   //                subheader={<li />}
   //                dense
   //                disablePadding
   //             >
   //                <AimsListItem
   //                   currentItem={currentItem}
   //                   setCurrentItem={setCurrentItem}
   //                   side={side}
   //                   setSide={setSide}
   //                   listAims={day}
   //                   category="day"
   //                   header=""
   //                   completeHandler={completeHandler}
   //                   rePutHandler={rePutHandler}
   //                   toggleWindow={toogleWindow}
   //                   setIdWindow={setIdWindow}
   //                   setTask={setTask}
   //                   setOldCategory={setOldCategory}
   //                />
   //             </List>
   //          </Box>)
   //    }
   //    case 'week': {
   //       return (
   //          <Box sx={{}}>
   //             {isOpenDialog &&
   //                <DialogWindow isOpenDialog={isOpenDialog}
   //                   setIsOpenDialog={setIsOpenDialog}
   //                   aimDialog={textDW}
   //                   categoryDialog={categoryDW}
   //                   editItemWindow={editItem}
   //                />

   //             }
   //             <List {...swipeHandlers}
   //                sx={{
   //                   width: '100%',
   //                   position: 'relative',
   //                   overflow: 'auto',
   //                   maxHeight: '100%',
   //                   '& ul': { padding: 0 },
   //                }}
   //                subheader={<li />}
   //                dense
   //                disablePadding
   //             >
   //                <AimsListItem
   //                   currentItem={currentItem}
   //                   setCurrentItem={setCurrentItem}
   //                   side={side}
   //                   setSide={setSide}
   //                   listAims={week}
   //                   category="week"
   //                   header=""
   //                   completeHandler={completeHandler}
   //                   rePutHandler={rePutHandler}
   //                   toggleWindow={toogleWindow}
   //                   setIdWindow={setIdWindow}
   //                   setTask={setTask}
   //                   setOldCategory={setOldCategory}
   //                />
   //             </List>
   //          </Box>
   //       )
   //    }
   //    case 'month': {
   //       return (
   //          <Box sx={{}}>
   //             {isOpenDialog &&
   //                <DialogWindow isOpenDialog={isOpenDialog}
   //                   setIsOpenDialog={setIsOpenDialog}
   //                   aimDialog={textDW}
   //                   categoryDialog={categoryDW}
   //                   editItemWindow={editItem}
   //                />

   //             }
   //             <List {...swipeHandlers}
   //                sx={{
   //                   width: '100%',
   //                   position: 'relative',
   //                   overflow: 'auto',
   //                   maxHeight: '100%',
   //                   '& ul': { padding: 0 },
   //                }}
   //                subheader={<li />}
   //                dense
   //                disablePadding
   //             >
   //                <AimsListItem
   //                   currentItem={currentItem}
   //                   setCurrentItem={setCurrentItem}
   //                   side={side}
   //                   setSide={setSide}
   //                   listAims={month}
   //                   category="month"
   //                   header=""
   //                   completeHandler={completeHandler}
   //                   rePutHandler={rePutHandler}
   //                   toggleWindow={toogleWindow}
   //                   setIdWindow={setIdWindow}
   //                   setTask={setTask}
   //                   setOldCategory={setOldCategory}
   //                />
   //             </List>
   //          </Box>)
   //    }

   //    case 'main': {
   //       return (
   //          <Box sx={{}}>
   //             {isOpenDialog &&
   //                <DialogWindow isOpenDialog={isOpenDialog}
   //                   setIsOpenDialog={setIsOpenDialog}
   //                   aimDialog={textDW}
   //                   categoryDialog={categoryDW}
   //                   editItemWindow={editItem}
   //                />

   //             }
   //             <List {...swipeHandlers}
   //                sx={{
   //                   width: '100%',
   //                   position: 'relative',
   //                   overflow: 'auto',
   //                   maxHeight: '100%',
   //                   '& ul': { padding: 0 },
   //                }}
   //                subheader={<li />}
   //                dense
   //                disablePadding
   //             >
   //                <AimsListItem
   //                   currentItem={currentItem}
   //                   setCurrentItem={setCurrentItem}
   //                   side={side}
   //                   setSide={setSide}
   //                   listAims={main}
   //                   category="main"
   //                   header=""
   //                   completeHandler={completeHandler}
   //                   rePutHandler={rePutHandler}
   //                   toggleWindow={toogleWindow}
   //                   setIdWindow={setIdWindow}
   //                   setTask={setTask}
   //                   setOldCategory={setOldCategory}
   //                />
   //             </List>
   //          </Box>)
   //    }
   //    default:
   //       return (
   //          <Box sx={{}}>
   //             {isOpenDialog &&
   //                <DialogWindow isOpenDialog={isOpenDialog}
   //                   setIsOpenDialog={setIsOpenDialog}
   //                   aimDialog={textDW}
   //                   categoryDialog={categoryDW}
   //                   editItemWindow={editItem}
   //                />

   //             }
   //             <List {...swipeHandlers}
   //                sx={{
   //                   width: '100%',
   //                   position: 'relative',
   //                   overflow: 'auto',
   //                   maxHeight: '100%',
   //                   '& ul': { padding: 0 },
   //                }}
   //                subheader={<li />}
   //                dense
   //                disablePadding
   //             >
   //                <AimsListItem
   //                   currentItem={currentItem}
   //                   setCurrentItem={setCurrentItem}
   //                   side={side}
   //                   setSide={setSide}
   //                   listAims={day}
   //                   category="day"
   //                   header="Цілі на день"
   //                   completeHandler={completeHandler}
   //                   rePutHandler={rePutHandler}
   //                   toggleWindow={toogleWindow}
   //                   setIdWindow={setIdWindow}
   //                   setTask={setTask}
   //                   setOldCategory={setOldCategory}
   //                />
   //                <AimsListItem
   //                   currentItem={currentItem}
   //                   setCurrentItem={setCurrentItem}
   //                   side={side}
   //                   setSide={setSide}
   //                   listAims={week}
   //                   category="week"
   //                   header="Цілі на тиждень"
   //                   completeHandler={completeHandler}
   //                   rePutHandler={rePutHandler}
   //                   toggleWindow={toogleWindow}
   //                   setIdWindow={setIdWindow}
   //                   setTask={setTask}
   //                   setOldCategory={setOldCategory}
   //                />
   //                <AimsListItem
   //                   currentItem={currentItem}
   //                   setCurrentItem={setCurrentItem}
   //                   side={side}
   //                   setSide={setSide}
   //                   listAims={month}
   //                   category="month"
   //                   header="Цілі на місяць"
   //                   completeHandler={completeHandler}
   //                   rePutHandler={rePutHandler}
   //                   toggleWindow={toogleWindow}
   //                   setIdWindow={setIdWindow}
   //                   setTask={setTask}
   //                   setOldCategory={setOldCategory}
   //                />
   //                <AimsListItem
   //                   currentItem={currentItem}
   //                   setCurrentItem={setCurrentItem}
   //                   side={side}
   //                   setSide={setSide}
   //                   listAims={main}
   //                   category="main"
   //                   header="Dream"
   //                   completeHandler={completeHandler}
   //                   rePutHandler={rePutHandler}
   //                   toggleWindow={toogleWindow}
   //                   setIdWindow={setIdWindow}
   //                   setTask={setTask}
   //                   setOldCategory={setOldCategory}
   //                />
   //             </List>
   //          </Box>
   //       )
   // }

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
      finishTask: (category: string, id: string, task: TaskType) => {
         dispatch(finishTaskThunk(category, id, task));
      },
      rePutTask: (category: string, id: string, task: TaskType) => {
         dispatch(rePutTaskThunk(category, id, task))
      },
      editAim: (oldCategory: string, category: string, id: string, text: string, task: TaskType) => {
         dispatch(editTaskThunk(oldCategory, category, id, text, task))
=======
            })
         )
>>>>>>> ed8e90c (optimized)
      }
   }

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
         <List {...swipeHandlers}
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
            {
               listToShow()
            }
         </List>
      </Box>)
}

export default Aims;
