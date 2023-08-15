import Grid from '@mui/material/Unstable_Grid2';
import { Divider, Typography } from "@mui/material";
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
      <Grid xs={12} sm={4}>
        <Attribute name='Strength' dots={attr.strength} />
        <Attribute name='Dexterity' dots={attr.dexterity} />
        <Attribute name='Stamina' dots={attr.stamina} />
      </Grid>
      <Grid xs={12} sm={4}>
        <Attribute name='Charisma' dots={attr.charisma} />
        <Attribute name='Manipulation' dots={attr.manipulation} />
        <Attribute name='Composure' dots={attr.composure} />
      </Grid>
      <Grid xs={12} sm={4}>
        <Attribute name='Intelligence' dots={attr.intelligence} />
        <Attribute name='Wits' dots={attr.wits} />
        <Attribute name='Resolve' dots={attr.resolve} />
      </Grid>
    </Grid>
  )
}