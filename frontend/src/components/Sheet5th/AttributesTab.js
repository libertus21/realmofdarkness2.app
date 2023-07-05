import Grid from '@mui/material/Unstable_Grid2';
import { Divider, Typography, List } from "@mui/material";
import Attribute from './Attribute';

export default function AttributesTab(props)
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
            Attributes
          </Typography>
        </Divider>
      </Grid>
      <Grid direction="column" xs={12} md={4}>
        <List>
          <Attribute name='Strength' />
          <Attribute name='Dexterity' />
          <Attribute name='Stamina' />
        </List>
      </Grid>
      <Grid direction="column" xs={12} md={4}>
        <List>
          <Attribute name='Charisma' />
          <Attribute name='Manipulation' />
          <Attribute name='Composure' />
        </List>
      </Grid>
      <Grid direction="column" xs={12} md={4}>
        <List>
          <Attribute name='Intelligence' />
          <Attribute name='Wits' />
          <Attribute name='Resolve' />
        </List>
      </Grid>
    </Grid>
  )
}