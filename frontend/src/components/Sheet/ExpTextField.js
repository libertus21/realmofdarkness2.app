//import { useSheetContext } from '../../routes/Character/Vampire5thSheet';
import { TextField } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';

export default function ExpTextField(props)
{
  const { label, exp, xs } = props;
  //const { handleUpdate } = useSheetContext();

  const display = `${exp.current} / ${exp.total}`

  return (    
    <Grid xs={xs ?? 12} md='auto' >
      <TextField 
        disabled label={label} value={display} xs={xs} size='small' fullWidth 
      />
    </Grid>
  )
}