import React, { useState } from 'react';
import {
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  Button,
  Tooltip,
} from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import AnnouncementOutlinedIcon from '@mui/icons-material/AnnouncementOutlined';

export default function SheetPreviewNews() {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Grid>
      <Tooltip title='Sheet News' arrow>
        <IconButton onClick={handleOpen}>
          <AnnouncementOutlinedIcon fontSize="large" color="secondary" />
        </IconButton>
      </Tooltip>

      <Dialog open={open} onClose={handleClose} maxWidth="md">
        <DialogTitle color='primary'>Sheet Early Access Preview</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Welcome to the Vampire 5th edition full sheet preview. This is
            currently a work in progress and will be updated over time until all
            the features are implemented. As this is a work in progress it may
            be necessary to delete parts of any stored data, I will try to avoid
            this but please make sure to keep backups of any data in case it
            needs to happen.
          </DialogContentText>
          <DialogContentText paddingTop={2} component='div'>
            The current features that have been released are:
            <ul>
              <li>Top bar fields (Name, Clan, Sire, Predator type and so on)</li>
              <li>Trackers (Willpower, Health, Hunger and Humanity)</li>
              <li>Attributes</li>
              <li>Skills</li>
              <li>Hunting</li>
              <li>Blood Potency</li>
            </ul>
          </DialogContentText>
        </DialogContent>
        <Button onClick={handleClose} color="primary">
          Close
        </Button>
      </Dialog>
    </Grid>
  );
}
