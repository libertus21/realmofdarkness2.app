import Grid from "@mui/material/Unstable_Grid2";
import ApiTextField from "../../Sheet/ApiTextField";
import { useSheetContext } from "../../../routes/Character/Vampire5thSheet";
import Header from "../../Sheet/Header";

export default function HuntingTab(props) {
  const { sheet } = useSheetContext();

  return (
    <Grid container spacing={1} xs={12} md={4} direction="column">
      <Header>Hunting</Header>
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
        xs={12}
        paddingTop={1}
      >
        <Grid>
          <ApiTextField
            label="Hunting Roll"
            value={sheet.hunting_roll}
            maxLength={50}
          />
        </Grid>
        <Grid>
          <ApiTextField
            label="Resonance"
            value={sheet.resonance}
            maxLength={50}
          />
        </Grid>
      </Grid>
    </Grid>
  );
}
