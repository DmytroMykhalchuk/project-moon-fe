import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { useSelector } from 'react-redux';
import { getTags } from '../../../redux/appStateSelector'
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

type TagsSelectType = {
  isTagsMenuOpen: boolean
  toggleTagsMenu: () => void
  setSelectedTags: (arg1: Array<string>) => void
  selectedTags: Array<string>
}

export const TagsSelect: React.FC<TagsSelectType> = React.memo(({ isTagsMenuOpen, toggleTagsMenu, setSelectedTags, selectedTags }) => {

  const tags = useSelector(getTags)
  // console.log(tags.map((tag: string, index: number) => {
  //   if (selectedTags.includes(tag)) {
  //     return index
  //   }
  // }).filter((tag: string) => tag !== undefined))
  const [selected, setSelected] = useState(() => tags.map((tag: string, index: number) => {
    if (selectedTags.includes(tag)) {
      return index
    }
  }).filter((tag: string) => tag !== undefined))
  useEffect(() => {
    setSelected(() => tags.map((tag: string, index: number) => {
      if (selectedTags.includes(tag)) {
        return index
      }
    }).filter((tag: string) => tag !== undefined))
  }, [isTagsMenuOpen])
  const onCloseDrawer = () => {
    const tagsSelected = selected.map((tag: number) => tags[tag])
    setSelectedTags(tagsSelected)
    toggleTagsMenu()
    setSelected([] as Array<number>)
  }
  const pushOrRemoveTag = (checked: boolean, index: number) => {
    checked
      ? setSelected([...selected, index])
      : setSelected((prev: Array<number>) => prev.filter((tag: number) => tag !== index))
  }
  const list = () => {
    return (<>
      <List>
        {tags.map((text: string, index: number) => (
          <ListItem key={index}>
            <FormGroup>
              <FormControlLabel control={
                <Checkbox checked={selected.includes(index)}
                  onChange={(el: any) => {
                    const inputChecked = el.target as HTMLInputElement
                    pushOrRemoveTag(inputChecked.checked as boolean, index)
                  }}
                />
              } label={text}
              />
            </FormGroup>
          </ListItem>
        ))}
      </List>
    </>
    )
  }

  return (
    <Drawer
      anchor={'right'}
      open={isTagsMenuOpen}
      onClose={() => onCloseDrawer()}
      sx={{ position: 'relative', zIndex: 2000, height: '100vh', "& .MuiPaper-root": { height: '100vh' } }}
    >
      <AppBar position="static">
        <Toolbar variant="dense">
          <IconButton edge="start" color="inherit" aria-label="back" sx={{ mr: 2 }} onClick={() => onCloseDrawer()}>
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h6" color="inherit" component="div">
            Теги
          </Typography>
        </Toolbar>
        <Box sx={{ backgroundColor: 'bgmode.dark', height: '100vh', width: '300px' }}>
          {list()}
        </Box>
      </AppBar>
    </Drawer>
  );
})