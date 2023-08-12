import Grid from '@mui/material/Unstable_Grid2';
import { useSheetContext } from '../../../routes/Character/Vampire5thSheet';
import SheetControls from '../SheetControls';
import DialogueTextField from '../../Sheet/DialogueTextField';
import ExpTextField from '../../Sheet/ExpTextField';
import ApiTextField from '../../Sheet/ApiTextField';
import { getClans, getPredatorTypes } from '../../../constants/';
import ApiSelect from '../../Sheet/ApiSelect';
import GenerationMenuItems from './GenerationMenuItems';
import SheetStatusMenuItems from '../../Sheet/SheetStatusMenuItems';
import ChronicleMenuItems from './ChronicleMenuItems';

export default function GeneralInfoTab(props)
{
  const { sheet } = useSheetContext();
  const { handleLockChange } = props;

  return (
    <Grid 
      container 
      spacing={2} 
      xs={12}
    >
      <Grid 
        container 
        md={10} 
        paddingY={3} 
        columnGap={1} 
        justifyContent='center'
        >
        <Grid 
          container minWidth={315} direction='column' xs={12} md='auto' 
        >          
          <ApiTextField label="Name" value={sheet.name} maxLength={50} />
          <ApiSelect 
            label="Chronicle" 
            value={sheet.chronicle ?? ''} 
            getOptions={ChronicleMenuItems}
          />
        </Grid>
        <Grid 
          container 
          minWidth={{xs: 315, lg: 415}} 
          direction='column' 
          xs={12} md='auto' 
        >          
          <ApiTextField label="Ambition" value={sheet.ambition} maxLength={100} /> 
          <ApiTextField label="Desire" value={sheet.desire} maxLength={100} />
        </Grid>
        <Grid 
          container minWidth={315} direction='column' xs={12} md='auto' 
        >          
          <DialogueTextField 
            label="Clan" 
            value={sheet.clan} 
            getData={getClans} 
          />         
          <ApiSelect 
            label="Generation"
            value={sheet.generation} 
            getOptions={GenerationMenuItems} 
          />
        </Grid>
        <Grid 
          container minWidth={315} direction='column' xs={12} md='auto' 
        >          
          <ApiTextField label="Sire" value={sheet.sire} maxLength={50} />  
          <DialogueTextField 
            label="Predator Type" 
            value={sheet.predator_type} 
            getData={getPredatorTypes} 
          /> 
        </Grid>
        <Grid 
          container 
          maxWidth={{xs: 'auto', md: 215}} 
          direction={{xs: 'row', md: 'column'}} 
          xs={12} 
          md='auto' 
        >          
          <ApiSelect 
            label="Sheet Status" 
            value={sheet.status} 
            slug='status'
            getOptions={SheetStatusMenuItems} 
            xs={6} 
          />  
          <ExpTextField label="Experiance" exp={sheet.exp} xs = {6} />
        </Grid>
      </Grid>
      <SheetControls handleLockChange={handleLockChange} />
    </Grid>
  )
}