import Grid from '@mui/material/Unstable_Grid2';
import { Typography, ListItem } from "@mui/material";
import RatingInfo from './FiveDotRating';
import { slugify } from "../../utility";
import { useSheetContext } from '../../routes/Character/Vampire5thSheet';

export default function Attribute(props)
{
  const { name, dots } = props;
  const { lock, sheet, handleUpdate } = useSheetContext();

  function onChange(event, value)
  {
    const updateValue = value ?? 0;
    const slug = slugify(name);
    const update = {[slug]: updateValue};
    
    const newAttributes = JSON.parse(JSON.stringify(sheet.attributes));;
    newAttributes[slug] = updateValue;
    const sheetUpdate = {attributes: newAttributes};
    handleUpdate(update, sheetUpdate);
  }


  return (    
    <ListItem>
      <Grid container alignItems="center" sx={{width: '100%'}}>
        <Grid>
          <Typography>{name}</Typography>
        </Grid>
        <Grid xs={true} sx={{mr: -3}} />
        <Grid >                  
          <RatingInfo  
            value={dots}
            locked={lock ?? false} 
            onChange={onChange}
          />
        </Grid>
      </Grid>
    </ListItem>
  )
}