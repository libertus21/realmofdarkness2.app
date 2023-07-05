import Grid from '@mui/material/Unstable_Grid2';
import { Typography, ListItem } from "@mui/material";
import RatingInfo from './FiveDotRating';
import { useState } from 'react';

export default function Attribute(props)
{
  const { name, locked } = props;
  const [value, setValue] = useState(1);

  const handleRatingChange = (event, value) => 
  {
    console.log(value)
    setValue(value);
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
            value={value}
            onChange={handleRatingChange} 
            locked={locked ?? false} 
          />
        </Grid>
      </Grid>
    </ListItem>
  )
}