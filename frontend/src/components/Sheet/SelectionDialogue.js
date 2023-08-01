import { Dialog, DialogTitle, DialogContent, TextField } from "@mui/material";
import { Button, Typography, IconButton } from "@mui/material";
import Grid from '@mui/material/Unstable_Grid2';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { useSheetContext } from "../../routes/Character/Vampire5thSheet";
import { slugify } from "../../utility";


export default function SelectionDialogue(props)
{
  const {label, selected, onClose, open, getData} = props;
  const { handleUpdate } = useSheetContext();
  
  let buttons = [];
  for (const element of getData())
  {
    let color = 'primary'
    if (selected === element) color = 'success' 
    buttons.push(
      <DialogueButton 
        key={element} 
        label={element} 
        color={color} 
        onClick={onSelect} 
      />
    )
  }

  function handleClose()
  {
    onClose();
  };

  async function onSelect(value)
  {
    handleUpdate({[slugify(label)]: value});
    onClose();
  }

  return (
    <Dialog open={open} onClose={handleClose} fullWidth>         
      <DialogTitle style={{ textAlign: 'center' }} color='primary'>
        {label}
      </DialogTitle>
      <DialogContent>
        <Grid 
          container 
          columnGap={2}
          rowGap={2}
          justifyContent='center'
        >
          {buttons}
          <Grid 
            paddingTop={2} 
            container xs={12} 
            justifyContent='center' 
            columnGap={1}
            rowGap={1}
          >
            <Grid>
              <TextField disabled label={`Custom ${label}`} size='small' />
            </Grid>
            <Grid paddingTop={0.25}>
              <Button variant="outlined" color='secondary' disabled>
                {`Create Custom ${label}`}
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  )
}

function DialogueButton(props)
{
  const { label, color, onClick } = props;

  function handleClick(event)
  {
    onClick(event.currentTarget.value);
  }

  return (
    <Grid container>
      <Grid minWidth={150}>
        <Button 
          variant='outlined' 
          color={color}
          onClick={handleClick} 
          value={label}
          fullWidth
        >
          <Typography value={label} style={{ textTransform: 'none' }}>
            {label}
          </Typography>
        </Button>
      </Grid>
      <Grid>
        <IconButton>
          <InfoOutlinedIcon sx={{color: '#808080'}} />
        </IconButton>
      </Grid>
    </Grid>
  )
}