import React, { useState } from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import ListSubheader from '@mui/material/ListSubheader';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { BACKGROUND_COLOR_CARDS } from '../../../themes';
import Button from '@mui/material/Button'
import styles from './styles.module.scss'
import { ConfirmWindowDelete } from '../../Common/ConfirmWindowDelete';
import { useDispatch, useSelector } from 'react-redux';
import { getPomodoroStatistic } from '../../../redux/appStateSelector'
import { deleteStatisticSection, hardReset, removeStatisticPomodoro } from '../../../redux/appReducer';


const GLOBAL_DELETE = 'GLOBAL_DELETE'
const STATISTIC = 'STATISTIC'
const POMODORO = 'POMODORO'
const textDialog = {
   [`${STATISTIC}day`]: '',
   [`${STATISTIC}week`]: '',
   [`${STATISTIC}month`]: '',
}

export const PreferenceDeleteStatistic = React.memo(() => {
   const dispatch: any = useDispatch()
   const [sectionOfStat, setSectionOfStat] = useState('')
   const [isOpenConfirmation, setIsOpenConfirmation] = useState(false)

   const tags = Object.keys(useSelector(getPomodoroStatistic))
   const deleteHandler = () => {
      if (sectionOfStat.startsWith(STATISTIC)) {
         const section = sectionOfStat.slice(STATISTIC.length)
         dispatch(deleteStatisticSection(section))

      } else if (sectionOfStat.startsWith(POMODORO)) {
         const tag = sectionOfStat.slice(POMODORO.length)
         dispatch(removeStatisticPomodoro(tag))

      } else if (sectionOfStat === GLOBAL_DELETE) {
         dispatch(hardReset())
      }
   }
   const onChangeSelectHandler = (section: string) => {
      setSectionOfStat(section)
   }
   return (
      <Box sx={{ mb: 3, backgroundColor: BACKGROUND_COLOR_CARDS, p: 0, pb: 2 }}  >
         <Typography variant="body1" component="div" sx={{ p: 2, color: 'error.main' }}>
            Видалити одну з секцій статистки
         </Typography>
         <Box sx={{ p: 1 }}>
            <FormControl sx={{ minWidth: 120, width: '100%', mb: 2 }}>
               <InputLabel size='small' htmlFor="grouped-select">Cекція статистики</InputLabel>
               <Select defaultValue="" id="grouped-select"
                  label="Cекція статистики"
                  autoWidth
                  onChange={(el) => onChangeSelectHandler(el.target.value)}
                  size='small' sx={{}}>
                  <MenuItem value="">
                     <em>None</em>
                  </MenuItem>
                  <SubHeader title='Цілі' />
                  <MenuItem value={`${STATISTIC}day`}>Щоденні цілі</MenuItem>
                  <MenuItem value={`${STATISTIC}week`}>Тижневі цілі</MenuItem>
                  <MenuItem value={`${STATISTIC}month`}>Місячні цілі</MenuItem>
                  <SubHeader title='Pomodoro' />
                  {tags.length > 0 &&
                     tags.map((tag: string, index: number) => <MenuItem key={index} value={`${POMODORO}${tag}`}>{tag}</MenuItem>)}
                  <SubHeader title='Глобальні' />
                  <MenuItem value={GLOBAL_DELETE}>Очистити усі дані</MenuItem>

               </Select>
            </FormControl>
            <Button variant="outlined" className={styles.buttonDelete} color="inherit" size='medium'
               sx={{ color: 'bgmode.light', borerColor: 'bgmode.light' }}
               onClick={() => setIsOpenConfirmation(true)}
            >
               Очистити
            </Button>
         </Box>
         <ConfirmWindowDelete title='Ви впевнені?' text='Відновити дані буде неможливо.'
            deleting={deleteHandler}
            isOpenConfirmation={isOpenConfirmation}
            setIsOpenConfirmation={setIsOpenConfirmation}
         />
      </Box>
   );
})

type SubHeaderType = {
   title: string
}
const SubHeader: React.FC<SubHeaderType> = ({ title }) => {
   return <ListSubheader sx={{ backgroundColor: 'bgmode.main', color: 'fpage.main' }}>{title}</ListSubheader>
}