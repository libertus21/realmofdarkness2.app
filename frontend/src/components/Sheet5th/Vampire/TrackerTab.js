import Grid from '@mui/material/Unstable_Grid2';
import { IconButton, Typography, Paper, Tooltip } from "@mui/material";
import V5DamageTracker from '../../Trackers/V5DamageTracker';
import { useSheetContext } from '../../../routes/Character/Vampire5thSheet';
import { useState } from 'react';

import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import { slugify } from '../../../utility';
import V5Humanity from '../../Trackers/V5Humanity';
import Hunger from '../../Trackers/Hunger';

export default function Tracker(props)
{
  const { sheet } = useSheetContext();
  const [damagePanel, setDamagePanel] = useState(false);
  const [humanityPanel, setHumanityPanel] = useState(false);

  function handleOpenDamagePanel(label) {
    if (humanityPanel) setHumanityPanel(false); 
    setDamagePanel((prev) => (prev === label ? null : label));
  }

  function handleOpenHumanityPanel() {
    if (damagePanel) setDamagePanel(false);
    setHumanityPanel(!humanityPanel);
  }

  return (
    <>
      <Grid  
        container
        paddingLeft={3} 
        rowGap={3}     
        columnGap={2}
        justifyContent="space-around"
        alignItems="center"
        marginBottom={(damagePanel || humanityPanel) ? 0 : 3}
      >
        <V5DamageTracker 
          label="Willpower" 
          textAlign='center'
          justifyContent='center'
          tracker={sheet.willpower} 
          onOpen={handleOpenDamagePanel}
          open={damagePanel}
        />
        <V5DamageTracker
          label='Health'
          textAlign='center'           
          justifyContent='center'
          tracker={sheet.health} 
          onOpen={handleOpenDamagePanel}
          open={damagePanel}
        />
        <V5Humanity 
          humanity={sheet.humanity} 
          stains={sheet.stains}
          justifyContent='center'
          textAlign='center'
          open={humanityPanel}
          onOpen={handleOpenHumanityPanel}
        />
        <Hunger 
          hunger={sheet.hunger}
          justifyContent='center'
          textAlign='center'
        />
      </Grid>
      {damagePanel ? <DamagePanel label={damagePanel} /> : ''}
      {humanityPanel ? <HumanityPanel /> : ''}
    </>
  )
}

function HumanityPanel(props)
{
  const { sheet, handleUpdate } = useSheetContext(); 

  function handleChangeDamage(event, amount) {
    const value = event.currentTarget.value;
    const change = sheet[value] + amount;

    handleUpdate({[value]: change });
  }

  return (

    <Grid 
      container
      alignItems="center"
      justifyContent="center"
      paddingBottom={2}
    >
      <Paper sx={{borderRadius: "10px"}}>
        <Grid
          container
          justifyContent="center"
          textAlign='center'
          columnGap={8}
        >
          <Grid xs={12} md='auto'>
            <Tooltip arrow title="Remove Humanity">
              <IconButton 
                value='humanity' 
                onClick={(e) => handleChangeDamage(e, -1)}
              >
                <RemoveCircleOutlineIcon style={{color: '#ac3757'}} />
              </IconButton>
            </Tooltip>
            Total
            <Tooltip arrow title="Add Humanity">
              <IconButton 
                value='humanity' 
                onClick={(e) => handleChangeDamage(e, 1)}
              >
                <AddCircleOutlineOutlinedIcon style={{color: '#ab0934'}} />
              </IconButton>
            </Tooltip>
          </Grid>
          <Grid xs={12} md='auto'>
            <Typography
              color='primary' 
              paddingTop={{xs: 0, md: 1}}
            >
              Humanity
            </Typography>
          </Grid>
          <Grid xs={12} md='auto'>
            <Tooltip arrow title="Remove Stain">
              <IconButton 
                value='stains' 
                onClick={(e) => handleChangeDamage(e, -1)}
              >
                <RemoveCircleOutlineIcon style={{color: '#cca454'}} />
              </IconButton>
            </Tooltip>
            Stains
            <Tooltip arrow title="Take Stain">
              <IconButton 
                value='stains' 
                onClick={(e) => handleChangeDamage(e, 1)}
              >
                <AddCircleOutlineOutlinedIcon style={{color: '#cf9013'}} />
              </IconButton>
            </Tooltip>
          </Grid>
        </Grid>
      </Paper>
    </Grid>
  )
}


function DamagePanel(props)
{
  const { label } = props;
  const slug = slugify(label);
  const { sheet, lock, handleUpdate } = useSheetContext();

  function handleChangeDamage(event, amount) {
    const value = event.currentTarget.value;
    const oldStore = { ...sheet[slug] };
    const change = oldStore[value] + amount;
    oldStore[value] = change;

    handleUpdate({ [`${slug}_${value}`]: change }, { [slug]: oldStore });
  }

  const unlocked = (
    <>
      <Grid xs={12} md='auto'>
        <Tooltip arrow title="Remove Aggravated Damage">
          <IconButton 
            value='aggravated' 
            onClick={(e) => handleChangeDamage(e, -1)}
          >
            <RemoveCircleOutlineIcon style={{color: '#ac3757'}} />
          </IconButton>
        </Tooltip>
        Aggravated Damage
        <Tooltip arrow title="Take Aggravated Damage">
          <IconButton 
            value='aggravated' 
            onClick={(e) => handleChangeDamage(e, 1)}
          >
            <AddCircleOutlineOutlinedIcon style={{color: '#ab0934'}} />
          </IconButton>
        </Tooltip>
      </Grid>
      <Grid xs={12} md='auto'>
        <Typography
          color='primary' 
          paddingTop={{xs: 0, md: 1}}
        >
          {label}
        </Typography>
      </Grid>
      <Grid xs={12} md='auto'>
        <Tooltip arrow title="Remove Superficial Damage">
          <IconButton 
            value='superficial' 
            onClick={(e) => handleChangeDamage(e, -1)}
          >
            <RemoveCircleOutlineIcon style={{color: '#cca454'}} />
          </IconButton>
        </Tooltip>
        Superficial Damage
        <Tooltip arrow title="Take Superficial Damage">
          <IconButton 
            value='superficial' 
            onClick={(e) => handleChangeDamage(e, 1)}
          >
            <AddCircleOutlineOutlinedIcon style={{color: '#cf9013'}} />
          </IconButton>
        </Tooltip>
      </Grid>
    </>
  )

  const locked = (
    <>
      <Grid>            
        <Tooltip arrow title={`Remove ${label}`}>
          <IconButton value='total' onClick={(e) => handleChangeDamage(e, -1)}>
            <RemoveCircleOutlineIcon style={{color: '#ac3757'}} />
          </IconButton>
        </Tooltip>
      </Grid>
      <Grid>
        <Typography color='primary' paddingTop={1}>
          {label}
        </Typography> 
      </Grid>
      <Grid>           
        <Tooltip arrow title={`Add ${label}`}>
          <IconButton value='total'  onClick={(e) => handleChangeDamage(e, 1)}>
            <AddCircleOutlineOutlinedIcon style={{color: '#ab0934'}} />
          </IconButton>
        </Tooltip>
      </Grid>
    </>
  )

  return (  
    <Grid 
      container
      alignItems="center"
      justifyContent="center"
      paddingBottom={2}
    >
      <Paper sx={{borderRadius: "10px"}} >
        <Grid
          container
          justifyContent="center"
          textAlign='center'
          columnGap={lock ? 8 : 2}
        >
          {lock ? unlocked : locked}
        </Grid>
      </Paper>
    </Grid>
  )
}