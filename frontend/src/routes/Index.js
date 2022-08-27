import { Box, Grid, Typography } from '@mui/material';
import { Button, ButtonGroup } from '@mui/material';
import { Link } from "react-router-dom";
import Slideshow from '../components/Slideshow';

const large_logo = "https://cdn.discordapp.com/attachments/886983353922891816/998131572601540638/unknown.png";

export default function Index() {
  return (
    <Grid 
      container spacing={{md: 0, xs: 4}} 
      direction="row"
      justifyContent="space-evenly"
      alignItems="flex-start"
    >
      <Grid item md={7} xs={12}>
        <Box sx={{pt: {xs: 0, md: 6}}}>
          <Box 
            component="img"
            sx={{borderRadius: 5, width: '100%', height: '100%'}}
            alt="Realm of Darkness Logo"
            loading="eager"
            src={`${large_logo}`}
          >
          </Box>
          <Box sx={{py: 2}}>
            <Typography>
              Realm of Darkness is redefining the way you play World of 
              Darkness TTRPGs on Discord, with bots for all major versions of
              the game.
            </Typography>
          </Box>   
          <ButtonGroup 
            variant="outlined" 
            aria-label="outlined button group"   
            sx={{textAlign: 'center'}}    
          >
            <Button 
              component={Link}
              to='v5/'
            >
              5th Edition
            </Button>
            <Button 
              component={Link}
              to='20th/'
            >
              20th Anniversary
            </Button>
            <Button 
              component={Link}
              to='cod/'
            >
              Chronicles of Darkness
            </Button>
          </ButtonGroup>           
        </Box>
      </Grid>        
      <Grid item md={5} xs={12} sx={{height: {xs: '500px', lg: '600px'}}}>
        <Slideshow 
          imageList={itemData} 
          timer={5000} 
        />    
      </Grid>
    </Grid>
  );
}


const itemData = [
  {
    img: 'https://media.discordapp.net/attachments/719420620701564968/1007610254248398939/unknown.png',
    title: 'Hunter Dice rolls',
  },
  {
    img: 'https://media.discordapp.net/attachments/719420620701564968/1007610567567101952/unknown.png',
    title: 'Resonance Rolls',
  },
  {
    img: 'https://media.discordapp.net/attachments/719420620701564968/1007610980303380480/unknown.png',
    title: 'Trackers',
  },
  {
    img: 'https://media.discordapp.net/attachments/719420620701564968/1007611135106756648/unknown.png',
    title: 'Vampire v5 dice rolls',
  },
  {
    img: 'https://media.discordapp.net/attachments/719420620701564968/1007611406906032158/unknown.png',
    title: 'Vampire v5 dice rolls',
  },
  {
    img: 'https://media.discordapp.net/attachments/719420620701564968/1007610405985730621/unknown.png',
    title: 'Vampire v5 dice rolls',
  },
  {
    img: 'https://media.discordapp.net/attachments/719420620701564968/1007614265223561276/unknown.png',
    title: '20th dice rolls',
  },
];