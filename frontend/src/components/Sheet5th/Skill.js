import { Typography, ListItem, IconButton, Tooltip } from "@mui/material";
import RatingInfo from './FiveDotRating';
import { useState } from 'react';
import ExpandCircleDownIcon from '@mui/icons-material/ExpandCircleDown';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

export default function Skill(props)
{
  const { name, locked, spec=false } = props;
  const [value, setValue] = useState(0);

  const handleRatingChange = (event, value) => 
  {
    console.log(value)
    setValue(value);
  }

  let specIcon;
  if (locked && spec)
  {
    specIcon = (
      <Tooltip arrow title={spec}>
        <ExpandCircleDownIcon 
          fontSize='small' 
          sx={{marginLeft: 0.5, color: '#63199c'}} 
        />
      </Tooltip>
      
    )
  }
  else if (locked)
  {
    
    specIcon = (
      <ExpandCircleDownIcon 
        fontSize='small' 
        sx={{marginLeft: 0.5, color: '#3d3d3d'}} 
      />
    )
  }
  else
    specIcon = (
      <IconButton
        size='small'
        sx={{paddingX: 0.3, paddingY: 0.2}} 
      >
        <AddCircleOutlineIcon 
          fontSize="small"
          color='primary'
        />
      </IconButton>
    )

  return (    
    <ListItem 
      sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center' 
      }} 
    >
      <Typography sx={{ marginRight: 'auto' }}>{name}</Typography>     
      <RatingInfo  
        value={value}
        onChange={handleRatingChange} 
        locked={locked ?? false} 
      />
      {specIcon}
    </ListItem>
  )
}