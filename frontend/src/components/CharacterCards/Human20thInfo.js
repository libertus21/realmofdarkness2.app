import { CardActionArea, CardContent, CardMedia } from "@mui/material";
import { Typography, Divider } from "@mui/material";
import V20HealthTracker from "../Trackers/V20HealthTracker";
import ExpBar from "../CharacterCards/ExpBar";
import ResponsiveRating from "../Trackers/ResponsiveRating";


const defaultImage = 'https://media.discordapp.net/attachments/886983353922891816/1031852816421109770/SymbolWODfinal_red_lowRez.png'

export default function Human20thInfo(props) {
  const { character, chronicle } = props;

  return (
    <CardActionArea>
      <CardContent>
        <CardMedia 
          component="img"
          image={character.thumbnail ? character.thumbnail : defaultImage}
          alt="Character Image"
          sx={{
            maxHeight: '250px', 
            maxWidth: '250px',
            minHeight: '200px',
            minWidth: '100%',
            objectFit: 'contain',
            mb: 2
          }}
        />
        <Typography>Human - 20th Edition</Typography>
        <Typography>Server: {chronicle?.name ?? 'None'}</Typography>
        <Divider sx={{my: 1}} />
        <Typography>Willpower {`${character.willpower.current} / ${character.willpower.total}`}</Typography>
        <ResponsiveRating tracker={{
            current: character.willpower.current, 
            total: character.willpower.total
          }} 
        />               
        <Divider sx={{my: 1}} />
        <Typography>Blood {`${character.blood} / 10`}</Typography>
        <ResponsiveRating tracker={{current: character.blood, total: 10}} />  
        <Divider sx={{my: 1}} />
        <Typography>Humanity {character.morality}</Typography>
        <ResponsiveRating tracker={{current: character.morality, total: 10}} />
        <Divider sx={{my: 1}} />
        <Typography>Health</Typography>
        <V20HealthTracker tracker={character.health} />
        <ExpBar exp={character.exp} />
      </CardContent>
    </CardActionArea>
  )
}