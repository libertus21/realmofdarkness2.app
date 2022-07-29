import { Box, Container, Grid, Typography } from '@mui/material';
import { Button } from '@mui/material';
import { Link } from "react-router-dom";
import { Paper } from '@mui/material';

const large_logo = "https://cdn.discordapp.com/attachments/886983353922891816/998131572601540638/unknown.png";

export default function Index() {
  return (
    <Grid 
      container spacing={4} 
      direction="row"
      justifyContent="space-evenly"
      alignItems="center"
    >
      <Grid item xs={12}>
        <Box 
          component="img"
          sx={{width: '100%', height: '100%'}}
          alt="Realm of Darkness Logo"
          loading="lazy"
          src={`${large_logo}`}
        >
        </Box>      
      </Grid>
      <Grid item xs={12}>
        <Paper elevation={3}>
          <Container disableGutters sx={{py: 5, px: 5}}>
           <Typography>
            Some cool info here
           </Typography>
          </Container>          
        </Paper>      
      </Grid>
      <Grid item xs={12} md={4}>
        <Button 
          color="primary"
          variant='outlined'
          component={Link}
          to='v5'
          size='large'
          sx={{width: '100%', height: 60}}
        >
          5th Edition
        </Button>
      </Grid>
      <Grid item xs={12} md={4}>
        <Button 
          color="primary"
          variant='outlined'
          component={Link}
          to='20th'
          size='large'
          sx={{width: '100%', height: 60}}
        >
          20th Anniversary Edition
        </Button>
      </Grid>
      <Grid item xs={12} md={4}>
        <Button 
          color="primary"
          variant='outlined'
          component={Link}
          to='cod'
          size='large'
          sx={{width: '100%', height: 60}}
        >
          Chronicles of Darkness
        </Button>
      </Grid>
    </Grid>
  );
}