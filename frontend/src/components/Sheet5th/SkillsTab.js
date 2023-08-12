import Grid from '@mui/material/Unstable_Grid2';
import { Divider, Typography, List } from "@mui/material";
import Skill from './Skill';
import { useSheetContext } from '../../routes/Character/Vampire5thSheet';


export default function SkillsTab(props)
{  
  const { sheet } = useSheetContext();
  const skills = sheet.skills;

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
          <Skill name='Athletics' skill={skills.athletics} />
          <Skill name='Brawl' skill={skills.brawl} />
          <Skill name='Craft' skill={skills.craft} />
          <Skill name='Drive' skill={skills.drive} />
          <Skill name='Firearms' skill={skills.firearms} />
          <Skill name='Larceny' skill={skills.larceny} />
          <Skill name='Melee' skill={skills.melee} />
          <Skill name='Stealth' skill={skills.stealth} />
          <Skill name='Survival' skill={skills.survival} />
        </List>
      </Grid>
      <Grid direction="column" xs={12} xl={4}>
        <List>          
        <Skill name='Animal Ken' skill={skills.animal_ken} />
        <Skill name='Etiquette' skill={skills.etiquette} />
        <Skill name='Insight' skill={skills.insight} />
        <Skill name='Intimidation' skill={skills.intimidation} />
        <Skill name='Leadership' skill={skills.leadership} />
        <Skill name='Performance' skill={skills.performance} />
        <Skill name='Persuasion' skill={skills.persuasion} />
        <Skill name='Streetwise' skill={skills.streetwise} />
        <Skill name='Subterfuge' skill={skills.subterfuge} />
        </List>
      </Grid>
      <Grid direction="column" xs={12} xl={4}>
        <List>
        <Skill name='Academics' skill={skills.academics} />
        <Skill name='Awareness' skill={skills.awareness} />
        <Skill name='Finance' skill={skills.finance} />
        <Skill name='Investigation' skill={skills.investigation} />
        <Skill name='Medicine' skill={skills.medicine} />
        <Skill name='Occult' skill={skills.occult} />
        <Skill name='Politics' skill={skills.politics} />
        <Skill name='Science' skill={skills.science} />
        <Skill name='Technology' skill={skills.technology} />
        </List>
      </Grid>
    </Grid>
  )
}