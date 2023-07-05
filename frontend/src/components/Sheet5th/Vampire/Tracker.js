import Grid from '@mui/material/Unstable_Grid2';
import { Typography } from "@mui/material";
import RatingInfo from '../FiveDotRating';

function Tracker(props)
{
  return (
    <Grid  
      container
      paddingLeft={3}
      marginBottom={4}      
      justifyContent="space-around"
      alignItems="center"
    >
      <Grid>
        <Grid><Typography>Willpower</Typography></Grid>
        <Grid><RatingInfo /></Grid>
      </Grid>
      <Grid>
        <Grid><Typography>Health</Typography></Grid>
        <Grid><RatingInfo /></Grid>
      </Grid>
      <Grid>
        <Grid><Typography>Humanity</Typography></Grid>
        <Grid><RatingInfo /></Grid>
      </Grid>
      <Grid>
        <Grid><Typography>Hunger</Typography></Grid>
        <Grid><RatingInfo /></Grid>
      </Grid>
    </Grid>
  )
}

export default Tracker;