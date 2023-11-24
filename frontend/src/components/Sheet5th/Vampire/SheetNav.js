import { Tab, Tabs, Box, useMediaQuery } from "@mui/material";
import Grid from '@mui/material/Unstable_Grid2';
import DisciplinesTab from "../DisciplinesTab";
import BloodPotencyTab from "./BloodPotencyTab";
import HuntingTab from "./HuntingTab";
import ProfileTab from "../ProfileTab";
import { useSheetContext } from "../../../routes/Character/Vampire5thSheet";

import { useState } from "react";
import ApiTextField from "../../Sheet/ApiTextField";

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && (
        <>
          {children}
        </>
      )}
    </div>
  );
}

export default function SheetNav(props) {
  const [value, setValue] = useState(0);
  const { sheet } = useSheetContext();
  const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down('xl'));

  const centered = isSmallScreen ? false : true;
  const scrollable = isSmallScreen ? 'scrollable' : 'standard';

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <Grid xs={12}>
        <Box
          sx={{
            borderRadius: '20px',
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
            onChange={handleChange}
          >
            <Tab label="Core" value={0} />
            <Tab label="Advantages" value={1} disabled />
            <Tab label="Haven" value={2} disabled />
            <Tab label="Exp" value={3} disabled />
            <Tab label="Profile" value={4} />
            <Tab label="Notes" value={5} />
            <Tab label="Gallery" value={6} disabled />
          </Tabs>
        </Box>
      </Grid>
      {/* Core Tab */}
      <CustomTabPanel value={value} index={0}>
        <DisciplinesTab />
        <Grid container paddingTop={2} >
          <BloodPotencyTab />
          <HuntingTab />
        </Grid>
      </CustomTabPanel>
      {/* Profile Tab */}
      <CustomTabPanel value={value} index={4}>
        <ProfileTab />
      </CustomTabPanel>
      {/* Notes Tab */}
      <CustomTabPanel value={value} index={5}>
        <ApiTextField
          slug='notes'
          value={sheet.notes}
          noLock
          onEnter={false}
          multiline
          rows={22}
        />
      </CustomTabPanel>
    </>
  )
}