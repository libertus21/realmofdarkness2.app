import Grid from '@mui/material/Unstable_Grid2';
import { Divider, Typography } from "@mui/material";
import { Fragment } from 'react';

function Skills(props)
{
  return (
    <Fragment>      
      <Divider variant="middle">
        <Typography variant="h3" component="h2" color='#80172f'>
          Skills
        </Typography>
      </Divider>
      <Grid>
        Skills
      </Grid>
    </Fragment>
  )
}

export default Skills;