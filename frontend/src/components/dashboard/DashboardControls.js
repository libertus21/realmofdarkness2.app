import { IconButton } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import BlurOnOutlinedIcon from "@mui/icons-material/BlurOnOutlined";
import * as React from "react";
import NewSheetControl from "./NewSheetControl";
import StorytellerModeButton from "./StorytellerModeButton";

export default function DashboardControls(props) {
  const { sortOptions, handleStorytellerMode } = props;
  return (
    <Grid
      container
      columnSpacing={0}
      justifyContent="center"
      alignItems="center"
    >
      <NewSheetControl />
      <StorytellerModeButton
        sortOptions={sortOptions}
        handleChange={handleStorytellerMode}
      />
      <PlaceHolderButton />
      <PlaceHolderButton />
    </Grid>
  );
}

function PlaceHolderButton(props) {
  return (
    <Grid>
      <IconButton disabled>
        <BlurOnOutlinedIcon color="secondary" />
      </IconButton>
    </Grid>
  );
}
