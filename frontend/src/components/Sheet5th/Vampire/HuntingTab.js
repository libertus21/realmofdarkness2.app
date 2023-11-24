import Grid from '@mui/material/Unstable_Grid2';
import { Divider, Typography } from "@mui/material";
import ApiTextField from '../../Sheet/ApiTextField';
import { useSheetContext } from '../../../routes/Character/Vampire5thSheet';


export default function HuntingTab(props) {
  const { sheet } = useSheetContext();

  return (
    <Grid
      container
      spacing={1}
      xs={12}
      md={4}
      direction='column'
    >
      <Grid xs={12}>
        <Divider variant="middle">
          <Typography variant="h4" component="h3" color='#80172f'>
            Hunting
          </Typography>
        </Divider>
      </Grid>
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
            label="Hunting Roll" value={sheet.hunting_roll} maxLength={50}
          />
        </Grid>
        <Grid>
          <ApiTextField
            label="Resonance" value={sheet.resonance} maxLength={50}
          />
        </Grid>
      </Grid>
    </Grid>
  )
}