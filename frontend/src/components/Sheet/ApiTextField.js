import { TextField } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { useSheetContext } from '../../routes/Character/Vampire5thSheet';
import { useState, useEffect } from 'react';
import { slugify } from '../../utility';

export default function ApiTextField(props)
{
  const { label, value, slug, maxLength } = props;
  const { lock, handleUpdate } = useSheetContext();
  const [field, setField] = useState(value);
  const [error, setError] = useState(false);  
  const [color, setColor] = useState('primary');
  const [focused, setFocused] = useState(false);

  function onChange(event)
  {
    let newValue = event.target.value;
    if (maxLength && newValue.length > maxLength) return;
    setField(newValue);
  }

  function onClick()
  {
    setFocused(true);
  }

  async function onBlur()
  {
    if (value === field) return setFocused(false);
    setColor('secondary');
    const name = slug ?? slugify(label);
    const updatedValue = field ?? '';
    const response = {[name]: updatedValue};
    
    const res = await handleUpdate(response);
    if (res === 'error')
    {
      setError(true);
      setColor('primary');
      setFocused(false);
      setTimeout(() => setError(false), 5000);
    }
    else 
    {
      setColor('success');
      setTimeout(() => {setColor('primary'); setFocused(false)}, 2000);
    }
  }

  function onKeyDown(event) {
    if (event.key === 'Enter') {
      event.target.blur();
    }
  }

  useEffect(() => {
    setField(value);
  }, [value]);

  return (  
    <Grid xs={12} md='auto' >
      <TextField
        focused={focused}
        onClick={onClick}
        color={color}
        error={error}
        disabled={lock}
        value={field ?? ''}
        onChange={onChange}
        onBlur={onBlur}
        label={label} 
        variant='outlined' 
        onKeyDown={onKeyDown}
        fullWidth
        size='small'
      />
    </Grid>  
  )
}