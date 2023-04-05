import { Container, Grid, Tab, Tabs, Box } from '@mui/material';
import { Button, ButtonGroup } from '@mui/material';
import { Link } from "react-router-dom";
import { useState } from 'react';
import PropTypes from 'prop-types';
import CommandAccordion from '../../components/Commands/CommandAccordion';
const { Dice20thDoc, Tracker20thDoc } = require('../../components/Commands/v20Doc');
const { Init20thDoc } = require('../../components/Commands/20thInitDoc');
const { Server20thDoc } = require('../../components/Commands/20thServerDoc');

export default function V20Commands(props) {
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
      <Grid item xs={12} sx={{textAlign: 'center'}}>
        <ButtonGroup>
          <Button component={Link} to='/v5/commands/'>
            5th Edition
          </Button>
          <Button variant='contained'>
            20th Edition
          </Button>
          <Button component={Link} to='/cod/commands/'>
            Chronicles of Darkness
          </Button>
        </ButtonGroup>
      </Grid>
      <Grid item xs={12}>
        <Container disableGutters sx={{px: 2}}>
          <Tabs value={tabValue} onChange={handleTabChange} aria-label="basic tabs">
            <Tab label="Dice" {...allyProps(0)}/>
            <Tab label="Tracker" {...allyProps(1)} />
            <Tab label="Initiative" {...allyProps(2)} />
            <Tab label="Server" {...allyProps(3)} />
          </Tabs>
          <TabPanel value={tabValue} index={0}>
            <CommandAccordion commands={Dice20thDoc}/>
          </TabPanel>
          <TabPanel value={tabValue} index={1}>
            <CommandAccordion commands={Tracker20thDoc}/>
          </TabPanel>
          <TabPanel value={tabValue} index={2}>
            <CommandAccordion commands={Init20thDoc}/>
          </TabPanel>
          <TabPanel value={tabValue} index={3}>
            <CommandAccordion commands={Server20thDoc}/>
          </TabPanel>
        </Container>  
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
          20th Edition Home
        </Button>
      </Grid>
      <Grid item xs={12} md={4}>
        <Button 
          color="primary"
          variant='outlined'
          size='large'
          href="https://discord.com/oauth2/authorize?client_id=898894443757838418&scope=bot%20applications.commands&permissions=278528"
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
          size='large'
          disabled
          sx={{width: '100%', height: 60}}
        >
          Dice (Coming Soon)
        </Button>
      </Grid>
    </Grid>
  );
}