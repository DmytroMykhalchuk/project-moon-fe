import React, { useEffect } from 'react';

// import { format } from 'date-fns'
import uk from 'date-fns/locale/uk'
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';

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
      <DayPicker
         showOutsideDays fixedWeeks
         mode="single"
         selected={selectedDate}
         onSelect={setSelected}
         locale={uk}
      />
   );
}