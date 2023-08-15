import { Container, Tab, Tabs, Box, useMediaQuery } from "@mui/material";
import Grid from '@mui/material/Unstable_Grid2';

import GeneralInfo from "../../components/Sheet5th/Vampire/GeneralInfoTab";
import Attributes from "../../components/Sheet5th/AttributesTab";
import Skills from "../../components/Sheet5th/SkillsTab";
import TrackerTab from "../../components/Sheet5th/Vampire/TrackerTab";
import Disciplines from "../../components/Sheet5th/DisciplinesTab";
import BloodPotency from "../../components/Sheet5th/Vampire/BloodPotencyTab";
import HuntingTab from "../../components/Sheet5th/Vampire/HuntingTab";
import SheetSkeleton from "../../components/SheetSkeleton";
import { useState, useEffect, createContext, useContext } from "react";
import { useParams, useNavigate } from 'react-router-dom';

import { getHost, getCSRFToken } from '../../utility';
import { useClientContext } from "../../components/ClientProvider";
import { useAlertContext } from "../../components/AlertProvider";

const SheetContext = createContext(null);
export const useSheetContext = () => useContext(SheetContext);
export const SyncState = 
{
  SYNC: 'Synced',
  UNSYNC: 'Uploading',
  ERROR: 'Error',
  SYNC_COMPLETE: 'Upload Complete',
}

export default function Vampire5thSheet(props)
{
  const [lock, setLock] = useState(true);
  const [syncState, setSyncState] = useState(SyncState.SYNC);
  const { client, sheet, setSheet } = useClientContext();
  const { pushAlert } = useAlertContext();
  const { id } = useParams(); 
  const navigate = useNavigate();

  /**
   * Sends an API update request for the sheet if successful apllies the changes to the sheet 
   * @param {object} apiUpdate - Update in the ORM JSON format
   * @param {object} sheetUpdate - Sheet update in the Sheet JSON format
   */
  async function handleUpdate(apiUpdate, update)
  {
    // Creating a deep copy of Skills
    const oldSheet = JSON.parse(JSON.stringify(sheet));
    const sheetUpdate = update ?? apiUpdate;

    // Optimistic update
    setSyncState(SyncState.UNSYNC);
    setSheet((prevSheet) => ({ ...prevSheet, ...sheetUpdate }));

    // API call to update server
    try
    {
      // Make the API request to update the character's skills
      const response = await fetch(
        `${getHost(true)}/api/character/update/v5/${sheet.id}`, 
        {
          method: 'PUT',
          headers: 
          {
            'Content-Type': 'application/json',
            'X-CSRFToken': getCSRFToken(),
          },
          body: JSON.stringify(apiUpdate),
      });

      if (!response.ok) 
      { 
        const data = await response.json();
        const errorMessage = data ?? "There was an error with this request and the changes have not been applied."
        pushAlert({title: 'API Error', message: errorMessage});
        setSheet(oldSheet);
        setSyncState(SyncState.ERROR)
        setTimeout(() => setSyncState(SyncState.SYNC), 5000);
        return 'error'
      }
    }
    catch (error)
    {
      const message = "There was an error with this request and the changes have not been applied.";      
      pushAlert({title: 'API Error', message: message});
      setSheet(oldSheet);      
      setSyncState(SyncState.ERROR)
      setTimeout(() => setSyncState(SyncState.SYNC), 5000);
      return 'error'
    }
    setSyncState(SyncState.SYNC_COMPLETE); 
    setTimeout(() => setSyncState(SyncState.SYNC), 5000);   
  }

  function handleLockChange()
  {
    setLock(!lock);
  }
  
  ///////////////////////////// Fetch Sheet data /////////////////////////////
  useEffect(() => {
    const fetchSheetData = async () => 
    {
      try 
      {
        const response = 
          await fetch(`/api/character/get/v5?id=${id}&sheet=true`);
        const data = await response.json();

        if (!response.ok) 
        {
          pushAlert({title: 'API Error', message: data});
          return navigate('/');
        }
        setSheet(data);
      } 
      catch (error) 
      { 
        const message = 'There was an unknown error fetching this sheet.'       
        pushAlert({title: 'API Error', message: message})
        navigate('/');
      }
    };  
    fetchSheetData();
    return () => {setSheet(null)}
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {    
    client.sheetSubscribe(id);
    return () => {client.sheetSubscribe(null)}
  }, []);  // eslint-disable-line react-hooks/exhaustive-deps

  const sheetPage = (
    <Container maxWidth='false' sx={{ mt: 10 }}> 
      <GeneralInfo handleLockChange={handleLockChange} />
      <TrackerTab />
      <Grid container>
        <Grid container xs={12} md={5} direction="column">
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
          <SheetNav />
          <Disciplines />
          <BloodPotency />
          <HuntingTab />
        </Grid>
      </Grid>
    </Container>
  )

  return (
    <SheetContext.Provider value={{sheet, lock, handleUpdate, syncState}}>
      {sheet ? sheetPage : (<SheetSkeleton />)}
    </SheetContext.Provider>
  )
}


function SheetNav(props)
{
  const [value] = useState('Core');
  const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down('xl'));

  const centered = isSmallScreen ? false : true;
  const scrollable = isSmallScreen ? 'scrollable' : 'standard';


  return (   
    <Grid xs={12}>
      <Box 
        sx={{ 
          borderRadius: '20px', 
          marginBottom: '10px', 
          maxWidth: '100%',
          bgcolor: 'background.paper' 
        }}
      >              
        <Tabs
          value={value}
          textColor="secondary"
          indicatorColor="secondary"
          variant={scrollable}
          centered={centered}
          scrollButtons
        >
          <Tab label="Core" value='Core' />
          <Tab label="Advantages" />           
          <Tab label="Haven" /> 
          <Tab label="Exp" />     
          <Tab label="Possessions" />   
          <Tab label="Background" />
          <Tab label="Gallery" />
        </Tabs>
      </Box> 
    </Grid>
  )
}