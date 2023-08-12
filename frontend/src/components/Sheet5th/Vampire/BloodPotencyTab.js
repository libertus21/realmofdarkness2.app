import Grid from '@mui/material/Unstable_Grid2';
import { Divider, Rating, Typography, TextField } from "@mui/material";
import CircleIcon from '@mui/icons-material/Circle';
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';

export default function BloodPotencyTab(props)
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
            Blood Potency
          </Typography>
        </Divider>
      </Grid>
      <Grid 
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
        paddingTop={2}
        xs={12}
      >
        <Grid><Typography>Potency</Typography></Grid>
        <Grid>             
          <Rating 
            disabled
            max={10}
            icon={<CircleIcon fontSize="inherit" />} 
            emptyIcon={<CircleOutlinedIcon fontSize="inherit" />}            
            sx={{
              paddingTop: 0.5,
              '& .MuiRating-iconFilled': {color: '#ab074e'},
              '& .MuiRating-iconHover': {color: '#ff3d47'},
            }}
          />
        </Grid>
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
            disabled
            label="Blood Surge" 
            variant='outlined' 
            defaultValue=' ' 
            fullWidth
            size='small'
          />
        </Grid>
        <Grid>                  
          <TextField 
            disabled
            label="Mend Amount" 
            variant='outlined' 
            defaultValue=' ' 
            fullWidth
            size='small'
          />
        </Grid>
        <Grid>                  
          <TextField 
            disabled
            label="Power Bonus" 
            variant='outlined' 
            defaultValue=' ' 
            fullWidth
            size='small'
          />
        </Grid>
        <Grid>                  
          <TextField 
            disabled
            label="Rouse Re-Roll" 
            variant='outlined' 
            defaultValue=' ' 
            fullWidth
            size='small'
          />
        </Grid>
        <Grid>                  
          <TextField 
            disabled
            label="Feeding Penalty" 
            variant='outlined' 
            defaultValue=' ' 
            fullWidth
            size='small'
          />
        </Grid>
        <Grid>                  
          <TextField 
            disabled
            label="Bane Severity" 
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