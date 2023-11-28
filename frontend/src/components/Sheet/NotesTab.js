import Grid from '@mui/material/Unstable_Grid2';
import ApiTextField from '../Sheet/ApiTextField';

import { useSheetContext } from '../../routes/Character/Vampire5thSheet';

export default function NotesTab() {
  const { sheet } = useSheetContext();

  return (
    <Grid
      spacing={0}
      container
      xs={12}
      rowSpacing={1}
    >
      <Grid xs={12} lg={6}>
        <ApiTextField
          slug='notes'
          value={sheet.notes}
          noLock
          onEnter={false}
          maxLength={6000}
          multiline
          rows={22}
        />
      </Grid>
      <Grid xs={12} lg={6}>
        <ApiTextField
          slug='notes2'
          value={sheet.notes2}
          noLock
          onEnter={false}
          maxLength={6000}
          multiline
          rows={22}
        />
      </Grid>
    </Grid>
  )
}