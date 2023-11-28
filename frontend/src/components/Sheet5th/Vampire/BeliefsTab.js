import Grid from '@mui/material/Unstable_Grid2';
import {
  Divider,
  Typography,
} from "@mui/material";
import ApiTextField from '../../Sheet/ApiTextField';

import { useSheetContext } from '../../../routes/Character/Vampire5thSheet';

export default function BeliefsTab() {
  const { sheet } = useSheetContext();

  return (
    <Grid
      spacing={2}
      container
      xs={12}
    >
      <Grid container xs={12} lg={6} xl={4}>
        <Grid xs={12}>
          <Divider variant="middle">
            <Typography variant="h4" component="h2" color='#80172f'>
              Chronicle Tenets
            </Typography>
          </Divider>
        </Grid>
        <Grid xs={12}>
          <ApiTextField
            slug='tenets'
            value={sheet.tenets}
            maxLength={1000}
            onEnter={false}
            rows={19}
            multiline
          />
        </Grid>
      </Grid>
      <Grid container xs={12} lg={6} xl={4}>
        <Grid xs={12}>
          <Divider variant="middle">
            <Typography variant="h4" component="h2" color='#80172f'>
              Touchstones
            </Typography>
          </Divider>
        </Grid>
        <Grid xs={12}>
          <ApiTextField
            slug='touchstones'
            value={sheet.touchstones}
            maxLength={2000}
            onEnter={false}
            rows={19}
            multiline
          />
        </Grid>
      </Grid>
      <Grid container xs={12} lg={12} xl={4}>
        <Grid xs={12}>
          <Divider variant="middle">
            <Typography variant="h4" component="h2" color='#80172f'>
              Convictions
            </Typography>
          </Divider>
        </Grid>
        <Grid xs={12}>
          <ApiTextField
            slug='convictions'
            value={sheet.convictions}
            maxLength={2000}
            onEnter={false}
            rows={19}
            multiline
          />
        </Grid>
      </Grid>
    </Grid>
  )
}