import React from 'react'
import List from '@mui/material/List';
import Box from '@mui/material/Box';
import { useSwipeable } from "react-swipeable";
import { useState, useEffect } from "react";
import { AimsListItem } from './AimsListItem'
import { getDay, getMain, getMonth, getWeek } from "../../redux/appStateSelector";
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../redux/store';
import { finishTaskThunk, rePutTaskThunk, editTaskThunk } from '../../redux/appReducer';
import { DialogWindowCreateAim } from './DialogWindowCreateAim';
import styles from './style.module.scss'

const isNumberElementsToShow = (list: any, cat: string) => {
   let counter = 0;
   for (const item in list) {
      if (!list[item].isFinished) {
         counter++;
      }
   }

   if (cat === 'main') {
      return true
   }
   return counter !== 0;
}

type AimsOwnType = {
}

export const AimsHome: React.FC<AimsOwnType> = React.memo(() => {
   const listConfig: any = {
      main: { list: useSelector(getMain), header: "Мрія" },
      month: { list: useSelector(getMonth), header: "Цілі на місяць" },
      week: { list: useSelector(getWeek), header: "Цілі на тиждень" },
      day: { list: useSelector(getDay), header: "Цілі на день" }
   }
   const dispatch: any = useDispatch();
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
         isNumberElementsToShow(listConfig['day']['list'], 'day') && str.push('day');
         isNumberElementsToShow(listConfig['week']['list'], 'week') && str.push('week')
         isNumberElementsToShow(listConfig['month']['list'], 'month') && str.push('month')
         isNumberElementsToShow(listConfig['main']['list'], 'main') && str.push('main')
         return str;
      });
   }, [])

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



   return (
      <Box sx={{}}>
         {isOpenDialog &&
            <DialogWindowCreateAim isOpenDialog={isOpenDialog}
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
            subheader={<li className={styles.subheader} />}
            dense
            disablePadding
         >
            {
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
               })
            }
         </List>
      </Box>)
})

