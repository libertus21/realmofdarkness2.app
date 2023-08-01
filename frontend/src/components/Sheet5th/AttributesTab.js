import Grid from '@mui/material/Unstable_Grid2';
import { Divider, Typography, List } from "@mui/material";
import Attribute from './Attribute';
import { useSheetContext } from '../../routes/Character/Vampire5thSheet';

export default function AttributesTab(props)
{  
  const { sheet } = useSheetContext();
  const attr = sheet.attributes;

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
          <Attribute name='Strength' dots={attr.strength} />
          <Attribute name='Dexterity' dots={attr.dexterity} />
          <Attribute name='Stamina' dots={attr.stamina} />
        </List>
      </Grid>
      <Grid direction="column" xs={12} md={4}>
        <List>
          <Attribute name='Charisma' dots={attr.charisma} />
          <Attribute name='Manipulation' dots={attr.manipulation} />
          <Attribute name='Composure' dots={attr.composure} />
        </List>
      </Grid>
      <Grid direction="column" xs={12} md={4}>
        <List>
          <Attribute name='Intelligence' dots={attr.intelligence} />
          <Attribute name='Wits' dots={attr.wits} />
          <Attribute name='Resolve' dots={attr.resolve} />
        </List>
      </Grid>
    </Grid>
  )
}