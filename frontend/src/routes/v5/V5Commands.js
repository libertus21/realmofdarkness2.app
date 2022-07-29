import { Container, Grid, Tab, Tabs, Box } from '@mui/material';
import { Button } from '@mui/material';
import { Link } from "react-router-dom";
import { Paper } from '@mui/material';
import { useState } from 'react';
import PropTypes from 'prop-types';
import CommandAccordion from '../../components/Commands/CommandAccordion';
const { DiceV5Doc, TrackerV5Doc } = require('../../components/Commands/V5Doc');

export default function V5Commands(props) {
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  function allyProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }

  function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ py: 3 }}>
            {children}
          </Box>
        )}
      </div>
    );
  }
  
  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };

  return (
    <Grid 
      container spacing={4} 
      direction="row"
      justifyContent="space-evenly"
      alignItems="center"
    >
      <Grid item xs={12}>
        <Paper elevation={3}>
          <Container disableGutters sx={{px: 2}}>
            <Tabs value={tabValue} onChange={handleTabChange} aria-label="basic tabs example">
              <Tab label="Dice" {...allyProps(0)}/>
              <Tab label="Tracker" {...allyProps(1)} />
            </Tabs>
            <TabPanel value={tabValue} index={0}>
              <CommandAccordion commands={DiceV5Doc}/>
            </TabPanel>
            <TabPanel value={tabValue} index={1}>
              <CommandAccordion commands={TrackerV5Doc}/>
            </TabPanel>
          </Container>          
        </Paper>      
      </Grid>
      <Grid item xs={12} md={4}>
        <Button 
          color="primary"
          variant='outlined'
          component={Link}
          to='../'
          size='large'
          sx={{width: '100%', height: 60}}
        >
          5th Edition Home
        </Button>
      </Grid>
      <Grid item xs={12} md={4}>
        <Button 
          color="primary"
          variant='outlined'
          size='large'
          href="https://discord.com/oauth2/authorize?client_id=814857851406647309&scope=bot%20applications.commands&permissions=278528"
          target="_blank"
          sx={{width: '100%', height: 60}}
        >
          Bot Invite Link
        </Button>
      </Grid>
      <Grid item xs={12} md={4}>
        <Button 
          color="primary"
          variant='outlined'
          component={Link}
          to='probability'
          size='large'
          disabled
          sx={{width: '100%', height: 60}}
        >
          Dice Probability (Coming soon!)
        </Button>
      </Grid>
    </Grid>
  );
}