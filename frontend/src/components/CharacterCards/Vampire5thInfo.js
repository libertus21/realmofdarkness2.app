import { CardActionArea, CardContent, CardMedia } from "@mui/material";
import { Typography, Rating, Divider, styled } from "@mui/material";
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';
import CircleIcon from '@mui/icons-material/Circle';
import { Fragment } from "react";
import V5DamageTracker from "../Trackers/V5DamageTracker";

const defaultImage = 'https://media.discordapp.net/attachments/886983353922891816/1024918662223769600/VampireLogo_xsmall_colour.png?width=1440&height=445'

const StyledRating = styled(Rating)({
  '& .MuiRating-iconFilled': {
    color: '#ab074e',
  },
  '& .MuiRating-iconHover': {
    color: '#ff3d47',
  },
});


export default function Vampire5thInfo(props) {
  const { character } = props;

  return (
    <CardActionArea>
      <CardContent>
        <CardMedia 
          component="img"
          image={character.thumbnail ? character.thumbnail : defaultImage}
          alt="Character Image"
          sx={{
            maxHeight: '200px', 
            maxWidth: '100%', 
            minHeight: '200px',
            minWidth: '100%',
            objectFit: 'contain',
            mb: 2
          }}
        />
        <Typography>Vampire 5th Edition</Typography>
        <Typography>Server: {character.guild}</Typography>
        <Divider sx={{my: 1}} />
        <Typography>Willpower</Typography>
        <V5DamageTracker tracker={character.willpower} />
        <Divider sx={{my: 1}} />
        <Typography>Health</Typography>
        <V5DamageTracker tracker={character.health} />
        <Divider sx={{my: 1}} />
        <Typography>Humanity {character.humanity.current}</Typography>
        <StyledRating 
          name='Humanity' 
          value={character.humanity.current} 
          max={10}
          icon={<CircleIcon fontSize="inherit" />}
          emptyIcon={<CircleOutlinedIcon fontSize="inherit" />}
          size='small'
          readOnly 
        /> 
        <Divider sx={{my: 1}} />
        <Typography>Hunger {character.hunger}</Typography>
        <StyledRating 
          name='Hunger' 
          value={character.hunger} 
          icon={<CircleIcon fontSize="inherit" />}
          emptyIcon={<CircleOutlinedIcon fontSize="inherit" />}
          size='small'
          readOnly 
        />       
        <Divider sx={{my: 1}} />        
        <Typography>Exp: {character.exp.current}/{character.exp.total}</Typography>
      </CardContent>
    </CardActionArea>
  )
}