import { Button, Divider } from "@mui/material";
import Grid from '@mui/material/Unstable_Grid2';
import { useState } from 'react';
import { Typography, TextField } from "@mui/material";
import { Dialog, DialogTitle, DialogContent } from "@mui/material";
import PropTypes from 'prop-types';
import SendIcon from '@mui/icons-material/Send';
import { useNavigate } from 'react-router-dom';

import { useAlertContext } from "../AlertProvider";

export default function NewSheetDialogue(props)
{
  const { onClose, open } = props;
  const [type, setType] = useState('v5');
  const [name, setName] = useState('');
  const [error, setError] = useState(false);    
  const navigate = useNavigate();

  const { pushAlert } = useAlertContext();

  const handleClose = () => {
    onClose();
  };

  const handleNameChange = (event) => {
    const value = event.target.value;
    setName(value);
    if (value?.length < 1 || value?.length > 50) setError(true);
    else setError(false);
  }

  const handleTypeChange = (event) => {
    if (event.target.value === type) setType(undefined);
    else setType(event.target.value);
  }

  const onCreateSheet = async () => {  
    const url = `/api/character/new/${type}?name=${name}`;
    try {
      const response = await fetch(url);
      
      if (!response.ok) {
        const data = await response.json();
        return pushAlert({title: 'API Error', message: data});
      }
      const data = await response.json();
      const sheetId = data.id;
      console.log("Redirecting")
      navigate(`/character/${type}/${sheetId}`);

    } catch (error) {
      return pushAlert({title: 'API Error', message: "Unknown Error"});
    }
  };

  return (
    <Dialog 
      onClose={handleClose} 
      open={open}
      fullWidth
      maxWidth='md'
      PaperProps={{
        elevation: 8,
        sx: {
          borderRadius: '10px',
        },
      }}
    >
      <DialogTitle color='primary' align="center">New Character Sheet</DialogTitle>
      <DialogContent>
        <Grid 
          paddingTop={3}
          container
          spacing={2}
          direction="row"
          justifyContent="center"
          alignItems="baseline"
        >
          <Grid container xs justifyContent="center">
            <Grid xs={12}>
              <Typography align="center">5th Edition</Typography>
            </Grid>
            <GameCards 
              name='Vampire' 
              value='v5'
              //onClick={handleTypeChange}
              selected={type}
              // TODO Do not need to handle clicks right now as there is only
              // one type 
            />
            <GameCards 
              name='Hunter' 
              value='h5'
              onClick={handleTypeChange}
              selected={type}
              disabled
            />
            <GameCards 
              name='Werewolf' 
              value='w5'
              onClick={handleTypeChange}
              selected={type}
              disabled
            />
            <GameCards 
              name='human' 
              value='human5'
              onClick={handleTypeChange}
              selected={type}
              disabled
            />
            <GameCards 
              name='ghoul' 
              value='ghoul5'
              onClick={handleTypeChange}
              selected={type}
              disabled
            />
          </Grid>
          <Divider 
            orientation="vertical" 
            flexItem
            sx={{marginX: 2}} 
          />
          <Grid container xs justifyContent="center">             
            <Grid xs={12}>
              <Typography align="center">20th Edition</Typography> 
            </Grid>
            <GameCards 
              name='Vampire' 
              value='v20'
              onClick={handleTypeChange}
              selected={type}
              disabled
            />
            <GameCards 
              name='Werewolf' 
              value='w20'
              onClick={handleTypeChange}
              selected={type}
              disabled
            />
            <GameCards 
              name='Mage' 
              value='m20'
              onClick={handleTypeChange}
              selected={type}
              disabled
            />
            <GameCards 
              name='Changeling' 
              value='c20'
              onClick={handleTypeChange}
              selected={type}
              disabled
            />
            <GameCards 
              name='Wraith' 
              value='wr20'
              onClick={handleTypeChange}
              selected={type}
              disabled
            />
            <GameCards 
              name='Human' 
              value='human20'
              onClick={handleTypeChange}
              selected={type}
              disabled
            />
            <GameCards 
              name='ghoul' 
              value='ghoul20'
              onClick={handleTypeChange}
              selected={type}
              disabled
            />
          </Grid>
        </Grid>
        <Grid 
          paddingTop={3}
          container
          spacing={2}
          direction="row"
          justifyContent="center"
          alignItems="center"
        >
          <Grid>
            <TextField 
              label="Character Name"
              value={name}
              error={error}
              onChange={handleNameChange}
            />
          </Grid>
          <Grid>
            <Button 
              disabled={!name||!type||error} 
              size="large" 
              variant="contained"
              endIcon={<SendIcon />}
              onClick={onCreateSheet}
            >
              Create
            </Button>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
}

NewSheetDialogue.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};

function GameCards(props)
{
  let color = 'primary';
  if (props.selected === props.value) color = 'success';
  return (
    <Grid>
      <Button 
        onClick={props.onClick}
        variant="outlined"
        value={props.value}
        color={color}
        disabled={props.disabled}
      >
        {props.name}
      </Button>
    </Grid>
  )
}
