import { Container, Grid, Typography } from '@mui/material';
import { Button, Box, ImageList, ImageListItem } from '@mui/material';
import { Link } from "react-router-dom";
import { Paper } from '@mui/material';

export default function V5Index() {
  return (
    <Grid 
      container spacing={4} 
      direction="row"
      justifyContent="space-evenly"
      alignItems="center"
    >
      <Grid item xs={12} md={4}>
        <Button 
          color="primary"
          variant='outlined'
          size='large'
          href="https://discord.com/oauth2/authorize?client_id=814857851406647309&scope=bot%20applications.commands&permissions=278528"
          target="_blank"
          sx={{width: '100%', height: 60}}
        >
          Bot Invite Link
        </Button>
      </Grid>
      <Grid item xs={12} md={4}>
        <Button 
          color="primary"
          variant='outlined'
          component={Link}
          to='commands'
          size='large'
          sx={{width: '100%', height: 60}}
        >
          Bot Command Docs
        </Button>
      </Grid>
      <Grid item xs={12} md={4}>
        <Button 
          color="primary"
          variant='outlined'
          component={Link}
          to='probability'
          size='large'
          disabled
          sx={{width: '100%', height: 60}}
        >
          Dice Probability (Coming soon!)
        </Button>
      </Grid>
      <Grid item xs={12}>
        <Paper elevation={3}>
          <Container disableGutters sx={{py: 5, px: 5}}>
            <Typography variant="h3" component="h1" sx={{pb: 2, textAlign: "center"}}>
              5th Edition
            </Typography>
            <Typography sx={{pb: 2}}>
              The Realm of Darkness 5th edition bot contains both a dice roller,
              character tracker and new features are being added all the time.
            </Typography>
            <Typography variant="h4" component="h2">
              VtM v5 Dice Roller
            </Typography>
            <Typography component="div">
              <ul>
                <li>
                  Resonance specific roll command which supports full 
                  custom options
                </li>
                <li>
                  Seperate rouse command which supports a rouse reroll
                </li>
                <li>
                  Supports Hunger
                </li>
                <li>
                  Supports Difficulty
                </li>
                <li>
                  Supports Margin
                </li>
                <li>
                  Specifies the result of the roll as either (Total Failure, 
                  Bestial Failure, Failed, Success, Critical Success and 
                  Messy Critical)
                </li>
                <li>
                  Shows the results as a list of emojis as well as the actual 
                  numbers of the dice
                </li>
                <li>
                  Supports Rouse checks. Allows for 2 dice to be used for the 
                  rouse.
                </li>
                <li>
                  Supports Blood Surge. Takes your BP and automaticlly adds the 
                  correct number of dice to your pool
                </li>
                <li>
                  Supports Speciality. Adds 1 dice to your pool and displays 
                  the speciality in the roll
                </li>
                <li>
                  Support for Rerolls. Both a quick reroll button to reroll up 
                  to 3 failed dice as well as a Select Reroll where you can 
                  choose which dice you wish to reroll
                </li>
                <li>
                  Support for using a tracked character to automaticly add hunger 
                  dice and update willpower and hunger when needed
                </li>
              </ul>
            </Typography>
            <Typography variant="h4" component="h2">
              Hunter: the Reckoning Dice Roller
            </Typography>
            <Typography component="div">
              <ul>
                <li>Supports Desperation</li>
                <li>Supports Difficulty</li>
                <li>
                  Specifies the result of the roll as either (Total Failure, 
                  Despair, Failed, Success, Critical Success, Overreach 
                  and Critical Overreach)
                </li>
                <li>
                  Allows player choice of Overreach or Despair on a successful 
                  roll with a despair dice
                </li>
                <li>
                  Shows the results as a list of emojis as well as the actual
                  numbers of the dice
                </li>
                <li>
                  Supports Speciality. Adds 1 dice to your pool and displays 
                  the speciality in the roll.
                </li>
                <li>
                  Support for Rerolls. Both a quick reroll button to reroll 
                  up to 3 failed dice as well as a Select Reroll where you can 
                  choose which dice you wish to reroll.
                </li>
                <li>Support for using a tracked characters coming soon!</li>
              </ul>
            </Typography>
            <Typography variant="h4" component="h2">
              Character Tracker
            </Typography>
            <Typography component="div">
              <ul>
                <li>
                  Easy to use Discord Slash Commands walk you through all the
                  arguments with helpful descriptions on all of them
                </li>
                <li>
                  Character security, not just anyone can lookup or modify a
                  character you have made
                </li>
                <li>
                  Supports Admin/Mod viewing of characters made on their server
                </li>
                <li>
                  Supports private creation and editing in DMs with the bot
                </li>
                <li>
                  Supports an ST tracker channel to see all the character 
                  updates in real time in a channel no one else can view. 
                  No more metagaming
                </li>
                <li>
                  Does all calculations for you eg. turns superficial damage 
                  into Agg damage when you go over you max in v5
                </li>
                <li>
                  Gives mechanical help when required such as when you 
                  become impaired or hit hunger 5
                </li>
              </ul>
            </Typography>
            <Typography variant="h6" component="h3">
              Supported Character Types
            </Typography>
            <Typography component="div">
              <ul>
                <li>Vampire</li>
                <li>Mortal</li>
              </ul>
            </Typography>
          </Container>          
        </Paper>      
      </Grid>
      <Grid item xs={12}>
        <Box sx={{display: { xs: 'none', md: 'flex' }}}>
          <ImageList variant="masonry" cols={3} gap={18}>
            {itemData.map((item) => (
              <ImageListItem key={item.img}>
                <img
                  src={`${item.img}?w=248&fit=crop&auto=format`}
                  srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
                  alt={item.title}
                  loading="lazy"
                />
              </ImageListItem>
            ))}
          </ImageList>
        </Box>
        <Box sx={{display: { xs: 'flex', md: 'none' }}}>
          <ImageList cols={1} gap={20}>
            {itemData.map((item) => (
              <ImageListItem key={item.img}>
                <img
                  src={`${item.img}?w=248&fit=crop&auto=format`}
                  srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
                  alt={item.title}
                  loading="lazy"
                />
              </ImageListItem>
            ))}
          </ImageList>
        </Box>
      </Grid>
    </Grid>
  );
}

const itemData = [
  {
    img: 'https://media.discordapp.net/attachments/719420620701564968/1001685688925831188/unknown.png',
    title: 'VtM Roll Failed',
  },
  {
    img: 'https://media.discordapp.net/attachments/719420620701564968/1001685794332880896/unknown.png',
    title: 'VtM Roll Passed Willpower',
  },
  {
    img: 'https://media.discordapp.net/attachments/719420620701564968/1001691638424416276/unknown.png',
    title: 'VtM Roll with Character Reroll',
  },
  {
    img: 'https://media.discordapp.net/attachments/719420620701564968/1001686104338075768/unknown.png',
    title: 'VtM Roll with Character',
  },    
  {
    img: 'https://media.discordapp.net/attachments/719420620701564968/1001686527946010704/unknown.png',
    title: 'Character tracker',
  },  
  {
    img: 'https://media.discordapp.net/attachments/719420620701564968/1001687912741609636/unknown.png',
    title: 'Rouse Check Failed',
  },
  {
    img: 'https://media.discordapp.net/attachments/719420620701564968/1001688146158833724/unknown.png',
    title: 'Resonance Roll Intense Melancholy',
  },
  {
    img: 'https://media.discordapp.net/attachments/719420620701564968/1001687079194988554/unknown.png',
    title: 'VtM Roll Messy Crit',
  },
  {
    img: 'https://media.discordapp.net/attachments/719420620701564968/1001688373221666816/unknown.png',
    title: 'Resonance Roll Fleeting Sanguine',
  },
  {
    img: 'https://media.discordapp.net/attachments/719420620701564968/1001689451094868008/unknown.png',
    title: 'Character Tracker Impaired',
  },
  {
    img: 'https://media.discordapp.net/attachments/719420620701564968/1001688813262880898/unknown.png',
    title: 'VtM Roll Bestial Failure',
  },
  {
    img: 'https://media.discordapp.net/attachments/719420620701564968/1001689648843722893/unknown.png',
    title: 'Tracker Hunger 5',
  },
  {
    img: 'https://media.discordapp.net/attachments/719420620701564968/1001692804369616996/unknown.png',
    title: 'General Roll 1 set',
  },
  {
    img: 'https://media.discordapp.net/attachments/719420620701564968/1001693052622082079/unknown.png',
    title: 'General Roll 2 sets',
  },
  {
    img: 'https://media.discordapp.net/attachments/719420620701564968/1001694657027256351/unknown.png',
    title: 'Hunter Roll Crit',
  },
  {
    img: 'https://media.discordapp.net/attachments/719420620701564968/1001695305865105498/unknown.png',
    title: 'Hunter Roll Despair',
  },
];