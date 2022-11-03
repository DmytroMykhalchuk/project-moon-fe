
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Collapse, Fab, TextField, Zoom } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
// import Box from '@mui/material/Box';
import { useState } from 'react';

type DailyPageType = {
   isOpenFab: boolean
   setIsOpenFab: (arg: boolean) => void
   isAlredyAdd: boolean
   setIsAlredyAdd: (arg: boolean) => void
   records: any,
   currentDay: string
   setDaily: (arg1: string, arg2: string) => void
}
const DailyPage = ({ records, isOpenFab, setIsOpenFab, isAlredyAdd, setIsAlredyAdd, currentDay, setDaily }: DailyPageType) => {
   
   let isEditMode=true;

   // console.log(t)
   const [newDaily, setNewDaily] = useState('')
   const [isExtended, setIsExtended] = useState(()=>{
      if (Object.keys(records).length > 0) {
         // @ts-ignore
         let lastRecordDate = new Date(+(Object.keys(records).pop()) * 1000);
         let lastRecordTime=new Date(lastRecordDate.getFullYear(),lastRecordDate.getMonth(),lastRecordDate.getDate()).getTime();
   
         let currentDate = new Date();
         let currentTime=new Date(currentDate.getFullYear(),currentDate.getMonth(),currentDate.getDate()).getTime();
         return !(currentTime===lastRecordTime)
      }else{
         return false;
      }
   })
   const saveDaily = () => {
      setIsAlredyAdd(true)
      setIsExtended(false)
      setIsOpenFab(false)
      setDaily(`${currentDay}`, newDaily)
   }
   
   const showAllRecords = () => {
      let elementRecords = [];
      let i = 0;
      let numberDay: number;
      for (const recordDate in records) {
         if (Object.prototype.hasOwnProperty.call(records, recordDate)) {
            const element = records[recordDate];
            const createDate = new Date(+recordDate * 1000);

            elementRecords.push(
               <Accordion key={recordDate}>
                  <AccordionSummary
                     expandIcon={<ExpandMoreIcon />}
                     aria-controls={`panel-content-${recordDate}`}

                     id={recordDate}
                  >
                     <Typography>{`${createDate.getDay()}.${createDate.getMonth() + 1}.${createDate.getFullYear()} День ${element.day}`}</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                     <Typography>
                        {element.text}
                     </Typography>
                  </AccordionDetails>
               </Accordion>
            )
         }
      }

      elementRecords.reverse()
      return elementRecords;
   }
   let date = new Date();

   return (
      <>
         <Zoom in={isOpenFab}>
            <Fab color="secondary"
               onClick={() => { saveDaily() }}
               aria-label="edit"
               sx={{
                  position: 'fixed',
                  bottom: '80px',
                  right: '16px'
               }}>
               <CheckIcon />
            </Fab>
         </Zoom>
         <Collapse in={!isExtended||isAlredyAdd}>
            <Zoom in={!isExtended||isAlredyAdd}>
               <Accordion sx={{mb:2}}>
                  <AccordionSummary
                     expandIcon={<ExpandMoreIcon />}
                     aria-controls="panel2a-content"
                     id="panel2aa-header"
                     disabled
                  >
                     <Typography>{`День ${+currentDay + 1}`}</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                     <Typography>

                     </Typography>
                  </AccordionDetails>
               </Accordion>
            </Zoom>
         </Collapse>
         <Collapse in={isExtended}>
            <Accordion
               defaultExpanded
            >
               <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
               >
                  <Typography>{`${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()} День ${currentDay}`}</Typography>
               </AccordionSummary>
               <AccordionDetails>
                  <TextField
                     id="outlined-multiline-static"
                     // label="Multiline"

                     multiline
                     rows={3}
                     placeholder={`День ${currentDay}`}
                     fullWidth
                     onFocus={() => { setIsOpenFab(true) }}
                     onChange={(el) => { setNewDaily(el.target.value) }}
                  />
               </AccordionDetails>
            </Accordion>
         </Collapse>

         {showAllRecords()}
      </>
   );
}

export default DailyPage;