import Grid from "@mui/material/Unstable_Grid2";
import ApiTextField from "../../Sheet/ApiTextField";
import Header from "../../Sheet/Header";

import { useSheetContext } from "../../../routes/Character/Vampire5thSheet";

export default function BeliefsTab() {
  const { sheet } = useSheetContext();

  return (
    <Grid spacing={2} container xs={12}>
      <Grid xs={12} lg={6} xl={4}>
        <Header>Chronicle Tenets</Header>
        <ApiTextField
          slug="tenets"
          value={sheet.tenets}
          maxLength={1000}
          onEnter={false}
          rows={19}
          multiline
        />
      </Grid>
      <Grid xs={12} lg={6} xl={4}>
        <Header>Touchstones</Header>
        <ApiTextField
          slug="touchstones"
          value={sheet.touchstones}
          maxLength={2000}
          onEnter={false}
          rows={19}
          multiline
        />
      </Grid>
      <Grid xs={12} lg={12} xl={4}>
        <Header>Convictions</Header>
        <ApiTextField
          slug="convictions"
          value={sheet.convictions}
          maxLength={2000}
          onEnter={false}
          rows={19}
          multiline
        />
      </Grid>
    </Grid>
  );
}
