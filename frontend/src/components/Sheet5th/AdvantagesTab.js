import Grid from "@mui/material/Unstable_Grid2";
import { Stack } from "@mui/material";
import Header from "../Sheet/Header";
import Advantages from "./Advantages";
import AdvantagesViewDialogue from "./AdvantagesViewDialogue";
import { useState } from "react";

export default function AdvantagesTab() {
  const [isViewOpen, setIsViewOpen] = useState(false);

  function handleOpenView(item) {
    setIsViewOpen(item);
  }

  return (
    <Grid rowSpacing={2} container xs={12}>
      <Grid md={12} lg={6}>
        <Stack
          justifyContent="flex-start"
          sx={{ width: "100%" }}
          paddingBottom={2}
        >
          <Header>Merits</Header>
          <Advantages name="merits" handleOpenView={handleOpenView} />
        </Stack>
        <Stack
          justifyContent="flex-start"
          sx={{ width: "100%" }}
          paddingBottom={2}
        >
          <Header>Flaws</Header>
          <Advantages name="flaws" handleOpenView={handleOpenView} />
        </Stack>
        <Stack justifyContent="flex-start" sx={{ width: "100%" }}>
          <Header>Haven</Header>
          <Advantages name="haven" handleOpenView={handleOpenView} />
        </Stack>
      </Grid>
      <Grid md={12} lg={6}>
        <Stack
          justifyContent="flex-start"
          sx={{ width: "100%" }}
          paddingBottom={2}
        >
          <Header>Backgrounds</Header>
          <Advantages name="backgrounds" handleOpenView={handleOpenView} />
        </Stack>
        <Stack justifyContent="flex-start" sx={{ width: "100%" }}>
          <Header>Loresheets</Header>
          <Advantages name="loresheets" handleOpenView={handleOpenView} />
        </Stack>
      </Grid>
      <AdvantagesViewDialogue
        open={isViewOpen}
        handleClose={() => {
          setIsViewOpen(false);
        }}
      />
    </Grid>
  );
}
