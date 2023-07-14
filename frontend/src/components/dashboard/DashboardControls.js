import { Tooltip, IconButton } from "@mui/material";
import Grid from '@mui/material/Unstable_Grid2';
import BlurOnOutlinedIcon from '@mui/icons-material/BlurOnOutlined';
import * as React from "react";
import NewSheetControl from "./NewSheetControl";


export default function DashboardControls(props)
{
  return (
    <Grid 
      container 
      columnSpacing={0}
      justifyContent="center"
      alignItems="center"
    >
      <NewSheetControl />
      <PlaceHolderButton />
      <PlaceHolderButton />
      <PlaceHolderButton />
    </Grid>
  )
}

function PlaceHolderButton(props)
{
  return (
    <Grid>
      <Tooltip title="Place Holder" arrow> 
        <IconButton>
          <BlurOnOutlinedIcon color="secondary" />
        </IconButton>         
      </Tooltip>
    </Grid>
  )
}