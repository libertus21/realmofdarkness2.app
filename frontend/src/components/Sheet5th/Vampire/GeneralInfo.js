import { List, ListItem, TextField } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';

function GeneralInfo(props)
{
  return (
    <Grid 
      container 
      spacing={2} 
      marginBottom={4}
    >
      <Grid direction="column" xs={12} md={4}>
        <List>
          <ListItem>
            <TextField 
              label="Name:" 
              variant='standard' 
              defaultValue=' ' 
              fullWidth
            />
          </ListItem>
          <ListItem>
            <TextField 
              label="Concept:" 
              variant='standard' 
              defaultValue=' ' 
              fullWidth
            />
          </ListItem>
          <ListItem>
            <TextField 
              label="Chroncile:" 
              variant='standard' 
              defaultValue=' ' 
              fullWidth
            />     
          </ListItem>
        </List>
      </Grid>
      <Grid direction="column" xs={12} md={4}>
        <List>
          <ListItem>
            <TextField 
              label="Ambition:" 
              variant='standard' 
              defaultValue=' ' 
              fullWidth
            />
          </ListItem>
          <ListItem>
            <TextField 
              label="Desire:" 
              variant='standard' 
              defaultValue=' ' 
              fullWidth
            />
          </ListItem>
          <ListItem>
            <TextField 
              label="Predator Type:" 
              variant='standard' 
              defaultValue=' ' 
              fullWidth
            />       
          </ListItem>
        </List>
      </Grid>
      <Grid direction="column" xs={12} md={4}>
        <List>
          <ListItem>
            <TextField 
              label="Clan:" 
              variant='standard' 
              defaultValue=' ' 
              fullWidth
            />
          </ListItem>
          <ListItem>
            <TextField 
              label="Generation:" 
              variant='standard' 
              defaultValue=' ' 
              fullWidth
            />
          </ListItem>
          <ListItem>
            <TextField 
              label="Sire:" 
              variant='standard' 
              defaultValue=' ' 
              fullWidth
            />       
          </ListItem>
        </List>
      </Grid>
    </Grid>
  )
}

export default GeneralInfo;