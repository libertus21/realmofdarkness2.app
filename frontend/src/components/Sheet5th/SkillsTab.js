import Grid from '@mui/material/Unstable_Grid2';
import { Divider, Typography, List } from "@mui/material";
import Skill from './Skill';

export default function SkillsTab(props)
{
  const locked = true;

  return (
    <Grid 
      container 
      spacing={2} 
      marginBottom={4}
      xs={12}
    >
      <Grid xs={12}>      
        <Divider variant="middle">
          <Typography variant="h4" component="h2" color='#80172f'>
            Skills
          </Typography>
        </Divider>
      </Grid>
      <Grid direction="column" xs={12} xl={4}>
        <List>
          <Skill locked={locked} name='Athletics' spec="Running, Dodge" />
          <Skill locked={locked} name='Brawl' />
          <Skill locked={locked} name='Craft' />
          <Skill locked={locked} name='Drive' />
          <Skill locked={locked} name='Firearms' />
          <Skill locked={locked} name='Larceny' />
          <Skill locked={locked} name='Melee' />
          <Skill locked={locked} name='Stealth' />
          <Skill locked={locked} name='Survival' />
        </List>
      </Grid>
      <Grid direction="column" xs={12} xl={4}>
        <List>          
        <Skill locked={locked} name='Animal Ken' />
        <Skill locked={locked} name='Etiquette' />
        <Skill locked={locked} name='Insight' />
        <Skill locked={locked} name='Intimidation' />
        <Skill locked={locked} name='Leadership' />
        <Skill locked={locked} name='Performance' />
        <Skill locked={locked} name='Persuasion' spec="Seduction" />
        <Skill locked={locked} name='Streetwise' />
        <Skill locked={locked} name='Subterfuge' />
        </List>
      </Grid>
      <Grid direction="column" xs={12} xl={4}>
        <List>
        <Skill locked={locked} name='Academics' />
        <Skill locked={locked} name='Awareness' spec="Sight, Hearing, Smell, ambushes" />
        <Skill locked={locked} name='Finance' />
        <Skill locked={locked} name='Investigation' />
        <Skill locked={locked} name='Medicine' />
        <Skill locked={locked} name='Occult' />
        <Skill locked={locked} name='Politics' />
        <Skill locked={locked} name='Science' />
        <Skill locked={locked} name='Technology' />          
        </List>
      </Grid>
    </Grid>
  )
}