import { Typography, ListItem, IconButton, Tooltip } from "@mui/material";
import RatingInfo from './FiveDotRating';
import ExpandCircleDownIcon from '@mui/icons-material/ExpandCircleDown';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { slugify } from "../../utility";
import { useSheetContext } from '../../routes/Character/Vampire5thSheet';

export default function Skill(props)
{
  const { name, skill } = props;  
  const { lock, sheet, handleUpdate } = useSheetContext();

  function onChange(event, value)
  {
    const updateValue = value ?? 0;
    const slug = slugify(name);
    const update = {[slug]: updateValue};
    
    const newSkills = JSON.parse(JSON.stringify(sheet.skills));;
    newSkills[slug].value = updateValue;
    const sheetUpdate = {skills: newSkills};
    handleUpdate(update, sheetUpdate);
  }

  let specIcon;
  if (lock && skill.spec)
  {
    specIcon = (
      <Tooltip arrow title={skill.spec.join(', ')}>
        <ExpandCircleDownIcon 
          fontSize='small' 
          sx={{marginLeft: 0.5, color: '#63199c'}} 
        />
      </Tooltip>
      
    )
  }
  else if (lock)
  {
    
    specIcon = (
      <ExpandCircleDownIcon 
        fontSize='small' 
        sx={{marginLeft: 0.5, color: '#3d3d3d'}} 
      />
    )
  }
  else
  {
    const color = skill.spec ? 'secondary' : 'primary'
    specIcon = (
      <IconButton
        size='small'
        sx={{paddingX: 0.3, paddingY: 0.2}} 
      >
        <AddCircleOutlineIcon 
          fontSize="small"
          color={color}
        />
      </IconButton>
    )
  }
    

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
        value={skill.value}
        locked={lock ?? false} 
        onChange={onChange}
      />
      {specIcon}
    </ListItem>
  )
}