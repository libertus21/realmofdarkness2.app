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
    if (!value) return;
    const updateValue = value ?? 0;
    const slug = slugify(name);
    const update = {[slug]: updateValue};    
    
    const newAttributes = JSON.parse(JSON.stringify(sheet.attributes));;
    newAttributes[slug] = updateValue;
    const sheetUpdate = {attributes: newAttributes};

    if (slug === 'stamina' || slug === 'composure' || slug === 'resolve')
    {
      const tracker = (slug === 'stamina') ? 'health' : 'willpower';
      updateDamageTracker(
        updateValue, sheet, update, sheetUpdate, slug, tracker
      );
    }
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

function updateDamageTracker(
  value, sheet, update, sheetUpdate, attribute, tracker)
{
  const diff = value - sheet.attributes[attribute];  
  const total = sheet[tracker].total + diff;
  let superficial = sheet[tracker].superficial;
  let agg = sheet[tracker].aggravated;

  if (superficial + agg > total)
  {
    let count = (superficial + agg) - total;
    while (count > 0 && superficial > 0)
    {
      count--;
      superficial--;
    }
    while (count > 0 && agg > 0)
    {
      count--;
      agg--;
    }
  }

  update[`${tracker}_total`] = total;
  if (superficial !== sheet[tracker].superficial) 
    update[`${tracker}_superficial`] = superficial;
  if (agg !== sheet[tracker].aggravated)
    update[`${tracker}_aggravated`] = agg;

  sheetUpdate[tracker] = 
  {
    total: total,
    superficial: superficial,
    aggravated: agg,
  }
}