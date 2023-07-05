import { Container, Paper, Tab, Tabs } from "@mui/material";
import Grid from '@mui/material/Unstable_Grid2';

import GeneralInfo from "../../components/Sheet5th/Vampire/GeneralInfo";
import Attributes from "../../components/Sheet5th/AttributesTab";
import Skills from "../../components/Sheet5th/SkillsTab";
import Tracker from "../../components/Sheet5th/Vampire/Tracker";
import Disciplines from "../../components/Sheet5th/DisciplinesTab";
import BloodPotency from "../../components/Sheet5th/Vampire/BloodPotencyTab";
import HuntingTab from "../../components/Sheet5th/Vampire/HuntingTab";
import { useState } from "react";



function Vampire5thSheet(props)
{
  const [value, setValue] = useState('Core');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Container maxWidth='false' sx={{ mt: 10 }}>
      <GeneralInfo />
      <Tracker />
      <Grid container>
        <Grid container md={5} direction="column">
          <Attributes />
          <Skills />
        </Grid>
        <Grid 
          container 
          md={7} 
          direction="column"
          spacing={1}
          rowGap={3}
        > 
          <Paper 
            elevation={0} sx={{ borderRadius: '20px', marginBottom: '10px' }}
          >             
            <Tabs
              value={value}
              onChange={handleChange}
              textColor="secondary"
              indicatorColor="secondary"
              aria-label="secondary tabs example"
              centered

            >
              <Tab value="Core" label="Core" />
              <Tab value="Advantages" label="Advantages" />           
              <Tab value="Haven" label="Haven" />          
              <Tab value="Possessions" label="Possessions" />   
              <Tab value="Background" label="Background" />
              <Tab value="Gallery" label="Gallery" />
            </Tabs>
          </Paper>
          <Disciplines />
          <BloodPotency />
          <HuntingTab />
        </Grid>
      </Grid>
    </Container>
  )
}

export default Vampire5thSheet;