import React, { useEffect } from 'react';

// import { format } from 'date-fns'
import uk from 'date-fns/locale/uk'
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';

const css = `
  .my-selected:not([disabled]) { 
    font-weight: bold; 
    border: 2px solid #fff;
  }
  .my-selected:hover:not([disabled]) { 
    border-color: yellow;
    color: #000;
  }
  .rdp-day:hover{
   border-color: yellow;
   color: #000;
   font-weight: bold;
  }
  .my-today { 
    font-weight: bold;
    font-size: 140%; 
    color: red;
  }
`;
type DayPickerComponentType = {
   selectedDate: Date
   setSelectedDate: (arg1: Date) => void
}
export const DayPickerComponent: React.FC<DayPickerComponentType> = ({ selectedDate, setSelectedDate }) => {
   const [selected, setSelected] = React.useState<Date>();

   useEffect(() => {
      selected && setSelectedDate(selected)
   }, [selected])
   return (
      <>
          <style>{css}</style>
         <DayPicker
            showOutsideDays fixedWeeks
            mode="single"
            selected={selectedDate}
            onSelect={setSelected}
            locale={uk}
            modifiersClassNames={{
               selected: 'my-selected',
               // today: 'my-today'
             }}
            styles={{
               caption: { color: '#fff' }
          }}
      />
      </>

   );
}