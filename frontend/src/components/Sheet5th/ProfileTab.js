import Grid from '@mui/material/Unstable_Grid2';
import {
  Divider,
  TextField,
  Typography,
} from "@mui/material";
import ApiTextField from '../Sheet/ApiTextField';

import { useSheetContext } from '../../routes/Character/Vampire5thSheet';

export default function ProfileTab() {
  const { sheet } = useSheetContext();

  return (
    <Grid
      spacing={2}
      container
      xs={12}
    >
      <Grid container xs={12} md={7}>
        <Grid xs={12}>
          <Divider variant="middle">
            <Typography variant="h4" component="h2" color='#80172f'>
              History
            </Typography>
          </Divider>
        </Grid>
        <Grid xs={12}>
          <ApiTextField
            slug='history'
            value={sheet.history}
            maxLength={6000}
            onEnter={false}
            rows={19}
            multiline
          />
        </Grid>
      </Grid>
      <Grid
        xs={12}
        md={5}
        container
        justifyContent="flex-start"
        direction='column'
        spacing={0}
      >
        <Grid xs={12} paddingBottom={2}>
          <Divider variant="middle">
            <Typography variant="h4" component="h2" color='#80172f'>
              Profile
            </Typography>
          </Divider>
        </Grid>
        <Grid xs={12} container>
          <Grid xs={12} md={6}>
            <ApiTextField
              label="Date of Birth"
              slug='date_of_birth'
              value={sheet.date_of_birth}
              maxLength={20}
            />
          </Grid>
          <Grid xs={12} md={6}>
            <ApiTextField
              label="Date of Death"
              slug='date_of_death'
              value={sheet.date_of_death}
              maxLength={20}
            />
          </Grid>
        </Grid>
        <Grid xs={12} container>
          <Grid xs={12} md={6}>
            <ApiTextField
              label="Age"
              slug='age'
              value={sheet.age}
              maxLength={20}
            />
          </Grid>
          <Grid xs={12} md={6}>
            <ApiTextField
              label="Apparent Age"
              slug='apparent_age'
              value={sheet.apparent_age}
              maxLength={20}
            />
          </Grid>
        </Grid>
        <Grid xs={12}>
          <ApiTextField
            label="Appearance"
            slug='appearance'
            value={sheet.appearance}
            maxLength={1000}
            multiline
            rows={14}
          />
        </Grid>
      </Grid>
    </Grid>
  )
}