import React, { useState, useEffect } from 'react';
import Dialog from '@mui/material/Dialog';
import IconButton from '@mui/material/IconButton';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import Stack from '@mui/material/Stack';
import { useDispatch, useSelector } from 'react-redux';
import { getTags } from '../../../redux/appStateSelector';
import { savePomodoroThunk } from '../../../redux/appReducer';
import { PomodoroTimer } from './PomodoroTimer';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import PauseCircleOutlineIcon from '@mui/icons-material/PauseCircleOutline';
import LogoutIcon from '@mui/icons-material/Logout';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import useSound from 'use-sound';
//@ts-ignore
import clickSfx2 from './../../../sounds/subtle-95660.mp3'
//@ts-ignore
import clickSfx from './../../../sounds/success_bell-6776.mp3'

const Transition = React.forwardRef(function Transition(
   props: TransitionProps & {
      children: React.ReactElement;
   },
   ref: React.Ref<unknown>,
) {
   return <Slide direction="left" ref={ref} {...props} />;
});

type RecordsByTagType = {
   isPomodoro: boolean
   togglePomodoro: () => void
}
export const PomodorTimerContainer: React.FC<RecordsByTagType> = React.memo(({ isPomodoro, togglePomodoro }) => {
   const dispatch: any = useDispatch()
   const tags = useSelector(getTags)
   const [selectedTag, setSelectedTag] = useState('')
   const [isPause, setIsPause] = useState(true)
   const [percentOfCircle, setPercentOfCircle] = useState(0)
   const constTimeWork = 25
   const constTimeBreak = 5
   const [timeFocus, setTimeFocus] = useState(60 * constTimeWork)
   const [isBreak, setIsBreak] = useState(false)
   const [playSfx] = useSound(clickSfx2, { volume: 1 })
   const [play] = useSound(clickSfx, { volume: 1 })

   const handleCloseWithSave = () => {
      handleClose()
   }
   const handleClose = () => {
      togglePomodoro()
   }
   const toggleFlyingTimer = () => {
      setIsPause((prev: boolean) => !prev)

   }
   const savePomodoroCycle = (isToBreak = true) => {
      playSfx()
      dispatch(savePomodoroThunk(selectedTag, (constTimeWork * 60) - timeFocus))
      if (isToBreak) {
         setIsBreak(true)
         setTimeFocus(constTimeBreak * 60)
      }
   }
   const startWorking = () => {
      setTimeFocus(constTimeWork * 60)
      setIsBreak(false)
      play()
   }
   const restartTime = () => {
      if (isBreak) {
         setTimeFocus(60 * constTimeBreak)
      } else {
         setTimeFocus(60 * constTimeWork)
         savePomodoroCycle(false)
      }
      setIsPause(true)
      setPercentOfCircle(0)
   }
   const exit = () => {
      togglePomodoro()
      setTimeFocus(60 * constTimeWork)
      setPercentOfCircle(0)
      setIsBreak(false)
      setIsPause(true)
   }
   useEffect(() => {
      const totalTime = isBreak ? constTimeBreak * 60 : constTimeWork * 60
      if (!isPause) {
         const timeId = setInterval(() => {
            if (timeFocus === 0) { isBreak ? startWorking() : savePomodoroCycle() }
            setPercentOfCircle((timeFocus / totalTime) * 100)
            setTimeFocus((prev: number) => prev - 1)
         }, 1000)
         return () => {
            clearInterval(timeId)
         }
      }
   }, [isPause, timeFocus])
   return (
      <div>
         <Dialog
            fullScreen
            open={isPomodoro}
            onClose={handleCloseWithSave}
            TransitionComponent={Transition}
         >
            <Stack sx={{ minHeight: '100vh', pt: 6, backgroundColor: '#161616' }}>
               <Stack direction='row' justifyContent='center' sx={{ flexGrow: 1 }}>
                  <PomodoroTimer time={timeFocus} percentOfCircle={percentOfCircle} />
               </Stack >
               <Stack justifyContent='center' sx={{ pb: 5 }}>
                  <Stack direction='row' justifyContent='center'  >
                     <IconButton aria-label="start" disableRipple onClick={exit}>
                        <LogoutIcon fontSize='large' sx={{ color: 'bgmode.light' }} />
                     </IconButton>
                     <IconButton aria-label="start" disableRipple onClick={toggleFlyingTimer}>
                        {isPause
                           ? <PlayCircleOutlineIcon fontSize='large' sx={{ color: 'bgmode.light' }} />
                           : <PauseCircleOutlineIcon fontSize='large' sx={{ color: 'bgmode.light' }} />}
                     </IconButton>
                     <IconButton aria-label="start" disableRipple onClick={restartTime}>
                        <RestartAltIcon fontSize='large' sx={{ color: 'bgmode.light' }} />
                     </IconButton>
                  </Stack>
                  <Stack direction='row' justifyContent='center'  >
                     <FormControl variant="standard" sx={{ p: 1, width: 180, display: 'flex', justifyContent: 'center' }}>
                        <Select
                           labelId="demo-simple-select-standard-label"
                           id="demo-simple-select-standard"
                           value={selectedTag}
                           autoWidth
                           onChange={(el) => { setSelectedTag(el.target.value) }}
                        >
                           <MenuItem value="">
                              <em></em>
                           </MenuItem>
                           {tags.length > 0 && tags.map((tag: string) => <MenuItem key={tag} value={tag}>{tag}</MenuItem>)}
                        </Select>
                     </FormControl>
                  </Stack>
               </Stack >
            </Stack>
         </Dialog>
      </div >
   );
})
