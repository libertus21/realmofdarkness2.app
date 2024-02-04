import Grid from "@mui/material/Unstable_Grid2";
import ApiTextField from "../../Sheet/ApiTextField";
import Header from "../../Sheet/Header";

import { useSheetContext } from "../../../routes/Character/Vampire5thSheet";

export default function BeliefsTab() {
  const { sheet } = useSheetContext();

  return (
    <Grid spacing={2} container xs={12}>
      <Grid container xs={12} lg={6} xl={4}>
        <Header>Chronicle Tenets</Header>
        <Grid xs={12}>
          <ApiTextField
            slug="tenets"
            value={sheet.tenets}
            maxLength={1000}
            onEnter={false}
            rows={19}
            multiline
          />
        </Grid>
      </Grid>
      <Grid container xs={12} lg={6} xl={4}>
        <Header>Touchstones</Header>
        <Grid xs={12}>
          <ApiTextField
            slug="touchstones"
            value={sheet.touchstones}
            maxLength={2000}
            onEnter={false}
            rows={19}
            multiline
          />
        </Grid>
      </Grid>
      <Grid container xs={12} lg={12} xl={4}>
        <Header>Convictions</Header>
        <Grid xs={12}>
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
    </Grid>
  );
}
