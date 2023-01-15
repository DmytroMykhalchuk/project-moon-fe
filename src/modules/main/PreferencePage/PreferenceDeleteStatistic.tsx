import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import ListSubheader from '@mui/material/ListSubheader';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select'
import Box from '@mui/material/Box'
import { BACKGROUND_COLOR_CARDS } from '../../../themes';

export const PreferenceDeleteStatistic = () => {
   return (
      <Box sx={{ mb: 3, backgroundColor: BACKGROUND_COLOR_CARDS, p: 0, pb: 2 }}  >
         <FormControl sx={{ m: 1, minWidth: 120,width: '100%' }}>
            <InputLabel htmlFor="grouped-select">Grouping</InputLabel>
            <Select defaultValue="" id="grouped-select" label="Grouping" autoWidth sx={{  }}>
               <MenuItem value="">
                  <em>None</em>
               </MenuItem>
               <ListSubheader>Category 1</ListSubheader>
               <MenuItem value={1}>Option 1</MenuItem>
               <MenuItem value={2}>Option 2</MenuItem>
               <ListSubheader>Category 2</ListSubheader>
               <MenuItem value={3}>Option 3</MenuItem>
               <MenuItem value={4}>Option 4</MenuItem>
            </Select>
         </FormControl>
      </Box>
   );
}