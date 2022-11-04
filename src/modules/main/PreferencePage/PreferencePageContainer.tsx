import { useState } from "react";
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
            break;
         }
      }
      setOpenFinished(prev => {
         if (prev === el.getAttribute('data-list-name')) {
            return false;
         } else {
            return el.getAttribute('data-list-name');
         }
      });
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
            break;
         }
      }
      setOpenTrash(prev => {
         if (prev === el.getAttribute('data-list-name')) {
            return false;
         } else {
            return el.getAttribute('data-list-name');
         }
      });
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