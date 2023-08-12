import Grid from '@mui/material/Unstable_Grid2';
import { Divider, Typography } from "@mui/material";
import Discipline from './Discipline';

export default function DisciplinesTab(props)
{
  return (
    <Grid 
      container 
      spacing={2} 
      xs={12}
    >  
      <Grid xs={12}>                    
        <Divider variant="middle">
          <Typography variant="h4" component="h2" color='#80172f'>
            Disciplines
          </Typography>
        </Divider>
      </Grid>
      <Grid 
        container 
        direction="row"
        justifyContent="center"
        alignItems="center"
        xs={12}
        paddingTop={2}
      >
        <Discipline name='Potence' />
        <Discipline name='Protean' />
        <Discipline name='Dominate' />
      </Grid>
    </Grid>
  )
}