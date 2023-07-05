import { CardActionArea, CardContent, CardMedia } from "@mui/material";
import { Typography, Divider } from "@mui/material";
import V5DamageTracker from "../Trackers/V5DamageTracker";
import V5Humanity from "../Trackers/V5Humanity";
import ExpBar from "../CharacterCards/ExpBar";
import ResponsiveRating from "../Trackers/ResponsiveRating";


const defaultImage = 'https://media.discordapp.net/attachments/886983353922891816/1024918662223769600/VampireLogo_xsmall_colour.png?width=1440&height=445'

export default function Vampire5thInfo(props) {
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
        <Typography>Vampire - 5th Edition</Typography>
        <Typography>Server: {chronicle?.name ?? 'None'}</Typography>
        <Divider sx={{my: 1}} />
        <Typography>Willpower</Typography>
        <V5DamageTracker tracker={character.willpower} />
        <Divider sx={{my: 1}} />
        <Typography>Health</Typography>
        <V5DamageTracker tracker={character.health} />
        <Divider sx={{my: 1}} />
        <V5Humanity humanity={character.humanity} />
        <Divider sx={{my: 1}} />
        <Typography>Hunger {character.hunger}</Typography>
        <ResponsiveRating tracker={{current: character.hunger, total: 5}} />
        <ExpBar exp={character.exp} />
      </CardContent>
    </CardActionArea>
  )
}