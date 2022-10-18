import { CardActionArea, CardContent, CardMedia } from "@mui/material";
import { Typography, Divider } from "@mui/material";
import V20HealthTracker from "../Trackers/V20HealthTracker";
import ExpBar from "../CharacterCards/ExpBar";
import ResponsiveRating from "../Trackers/ResponsiveRating";
import OverflowRating from "../Trackers/OverflowRating";


const defaultImage = 'https://media.discordapp.net/attachments/886983353922891816/1031852816421109770/SymbolWODfinal_red_lowRez.png'

export default function Werewolf20thInfo(props) {
  const { character, chronicle } = props;

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
        <Typography>Werewolf - 20th Edition</Typography>
        <Typography>Server: {chronicle?.name ?? 'None'}</Typography>
        <Divider sx={{my: 1}} />
        <Typography>Willpower {`${character.willpower.current} / ${character.willpower.total}`}</Typography>
        <ResponsiveRating tracker={{
            current: character.willpower.current, 
            total: character.willpower.total
          }} 
        />        
        <Divider sx={{my: 1}} />
        <Typography>Rage {`${character.rage.current} / ${character.rage.total}`}</Typography>
        <OverflowRating 
          tracker={{
            current: character.rage.current, 
            total: character.rage.total
          }} 
        />
        <Divider sx={{my: 1}} />
        <Typography>Gnosis {`${character.gnosis.current} / ${character.gnosis.total}`}</Typography>
        <ResponsiveRating tracker={{
            current: character.gnosis.current, 
            total: character.gnosis.total
          }} 
        />
        <Divider sx={{my: 1}} />
        <Typography>Health</Typography>
        <V20HealthTracker tracker={character.health} />
        <ExpBar exp={character.exp} />
      </CardContent>
    </CardActionArea>
  )
}