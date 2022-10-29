
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
   currentDay: number | string
   setDaily: (arg1: string) => void
}
const DailyPage = ({ records, isOpenFab, setIsOpenFab, isAlredyAdd, setIsAlredyAdd, currentDay, setDaily }: DailyPageType) => {

   const [newDaily, setNewDaily] = useState('')
   const [isExtended, setIsExtended] = useState(true)
   const saveDaily = () => {
      setIsAlredyAdd(true)
      setIsExtended(false)
      setIsOpenFab(false)
      setDaily(newDaily)
   }
   const showAllRecords = () => {
      let elementRecords = [];
      let i = 0;
      let numberDay: number;
      for (const recordDate in records) {
         if (Object.prototype.hasOwnProperty.call(records, recordDate)) {
            const element = records[recordDate];

            elementRecords.push(
               <Accordion key={recordDate}>
                  <AccordionSummary
                     expandIcon={<ExpandMoreIcon />}
                     aria-controls={`panel-content-${recordDate}`}

                     id={recordDate}
                  >
                     <Typography>{`${recordDate} День ${element.day}`}</Typography>
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
         <Collapse in={isAlredyAdd}>
            <Zoom in={isAlredyAdd}>
               <Accordion>
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
                     rows={4}
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