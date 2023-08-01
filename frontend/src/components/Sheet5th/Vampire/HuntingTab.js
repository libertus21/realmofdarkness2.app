import Grid from '@mui/material/Unstable_Grid2';
import { Divider, Typography, TextField } from "@mui/material";

export default function HuntingTab(props)
{
  return (
    <Grid 
      container 
      spacing={2} 
      xs={12}
    >  
      <Grid xs={12}>                    
        <Divider variant="middle">
          <Typography variant="h4" component="h3" color='#80172f'>
            Hunting
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
        <Grid>                  
          <TextField 
            label="Hunting Roll" 
            variant='outlined' 
            defaultValue=' ' 
            fullWidth
            size='small'
          />
        </Grid>
        <Grid>                  
          <TextField 
            label="Resonance" 
            variant='outlined' 
            defaultValue=' ' 
            fullWidth
            size='small'
          />
        </Grid>        
      </Grid>
    </Grid>
  )
}