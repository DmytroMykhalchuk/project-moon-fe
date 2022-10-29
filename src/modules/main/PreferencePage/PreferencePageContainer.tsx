import { useState } from "react";
import { EventHandler } from "redux-form";
import { JsxElement } from "typescript";
import PreferencePage from "./PreferencePage";


const PreferencePageContainer = () => {
   const [openFinished, setOpenFinished] = useState('')
   const [openTrash, setOpenTrash] = useState('')
   const [isOpenDialog, setIsOpenDialog] = useState(false);

   const onOpenFinishedList = (el:any) => {
      el = el.target ;
      const maxDepth = 5;
      let i = 0;
      let currentEl = null;
      while (true) {
         currentEl = el.parentNode;
         el = currentEl;
         i++;
         if (maxDepth < i || el.hasAttribute('data-list-name')) {
            setOpenFinished(prev => {
               if (prev === el.getAttribute('data-list-name')) {
                  return false;
               } else {
                  return el.getAttribute('data-list-name');
               }
            });
            break;
         }
      }
   }
   const onOpenTrashList = (el:any) => {
      el = el.target;
      const maxDepth = 5;
      let i = 0;
      let currentEl = null;
      while (true) {
         currentEl = el.parentNode;
         el = currentEl;
         i++;
         if (maxDepth < i || el.hasAttribute('data-list-name')) {
            setOpenTrash(prev => {
               if (prev === el.getAttribute('data-list-name')) {
                  return false;
               } else {
                  return el.getAttribute('data-list-name');
               }
            });
            break;
         }
      }
   }
 
   return (
      <PreferencePage
         openFinished={openFinished}
         setOpenFinished={setOpenFinished}
         openTrash={openTrash}
         setOpenTrash={setOpenTrash}
         isOpenDialog={isOpenDialog}
         setIsOpenDialog={setIsOpenDialog}
         onOpenFinishedList={onOpenFinishedList}
         onOpenTrashList={onOpenTrashList}
      />)
}
export default PreferencePageContainer;