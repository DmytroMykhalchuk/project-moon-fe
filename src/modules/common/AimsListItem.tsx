import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import ListSubheader from '@mui/material/ListSubheader'
import RestoreIcon from '@mui/icons-material/Restore';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import Slide from '@mui/material/Slide';
import Typography from '@mui/material/Typography'

type ListAimsType = {
   [id: number | string]: {
      text: string
      isInTrash: boolean
      isFinished: boolean
   }
}

type AimsListItemType = {
   currentItem: string
   side: string
   listAims: Array<ListAimsType>,
   category: string
   header: string
   completeHandler: (arg1: string, arg2: string | number) => void
   rePutHandler: (arg1: string, arg2: string | number) => void
   toggleWindow: (arg1: string, arg2: string) => void
   setIdWindow: (arg1: string) => void
   setTask: (arg1: Object) => void
   setOldCategory: (arg1: string) => void

}

const AimsListItem: React.FC<AimsListItemType> = ({
   currentItem,
   side,
   listAims,
   category,
   setOldCategory,
   header,
   completeHandler,
   setIdWindow,
   setTask,
   rePutHandler,
   toggleWindow
}) => {

   const createTask = () => {
      let i = 0;

      let listItems = [];
      if (listAims) {
         for (const id in listAims) {
            if (Object.prototype.hasOwnProperty.call(listAims, id)) {
               const element = listAims[id];
               listItems.push(
                  <Collapse key={`${category}-${id}`} in={!(element.isFinished || element.isInTrash)} >
                     <ListItem key={`${category}-${id}`}
                        data-item={`${category}-${id}`}
                        disablePadding
                        divider
                     >
                        <ListItemButton role={undefined}
                           sx={{ padding: 0 }}
                        >
                           <Box sx={{
                              mr: '20px'
                           }}>

                              <Collapse in={currentItem === `${category}-${id}` && side === 'right'}
                                 orientation="horizontal"
                                 sx={{
                                    backgroundColor: '#EF8B6B', height: '50px', display: 'flex', justifyContent: 'center', alignItems: 'center',
                                 }}
                              >

                                 <Box
                                    sx={{

                                       width: '60px',
                                       borderRight: '2px solid #000', display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '13px'
                                    }}
                                    onClick={() => { rePutHandler(category, id) }}

                                 >
                                    <RestoreIcon />
                                 </Box>
                              </Collapse>
                           </Box>
                           <ListItemText id={`${i}`} primary={`${element.aim}`} sx={{ flexGrowh: 1 }} />
                           <Box sx={{ pr: 3 }} >
                              <IconButton edge="end" aria-label="completed" data-cat='cat'
                                 onClick={() => { completeHandler(category, id) }}>
                                 <EventAvailableIcon />
                              </IconButton>
                           </Box>
                           <Box sx={{ backgroundColor: '#EF8B6B', height: '50px' }}>
                              <Collapse in={currentItem === `${category}-${id}` && side === 'left'}
                                 style={{
                                    display: 'flex', justifyContent: 'center', alignItems: 'center'
                                 }}
                                 sx={{ backgroundColor: '#EF8B6B', height: '100%', }}
                                 orientation="horizontal">
                                 <Box sx={{
                                    width: '60px', borderLeft: '2px solid #000', display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '13px'
                                 }}
                                    onClick={() => { toggleWindow(category, `${element.aim}`); setIdWindow(id); setTask(element); setOldCategory(category) }}
                                 >
                                    <Slide direction="left"
                                       in={currentItem === `${category}-${id}` && side === 'left'}
                                       style={{ height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                                       className='s1'
                                       mountOnEnter unmountOnExit>
                                       <ModeEditIcon className='s' />
                                    </Slide>
                                 </Box>
                              </Collapse>
                           </Box>
                        </ListItemButton>
                     </ListItem>
                  </Collapse>
               )
               i++;
            }
         }


         let ret = [];

         ret.push(
               
            <ul key={i} style={{marginBottom:header?'20px':'0px',backgroundColor:'rgb(46 46 46 / 48%)',}}>
               <ListSubheader sx={{backgroundColor:'#fff',color:'#000'}}>{`${header}`}</ListSubheader>
               {/* <TransitionGroup> */}
               {listItems}
               {/* </TransitionGroup> */}

            </ul>
         )
         return ret;

      } else {
         return <Typography variant="subtitle1" color="initial">Not found</Typography>
      }
   }
   return (
      <>
         {createTask()}
      </>
   )
}
export default AimsListItem;