import { CardActionArea, CardContent, CardMedia } from "@mui/material";
import { Typography, Divider } from "@mui/material";
import V5DamageTracker from "../Trackers/V5DamageTracker";
import V5Humanity from "../Trackers/V5Humanity";
import ExpBar from "../CharacterCards/ExpBar";


const defaultImage = 'https://media.discordapp.net/attachments/886983353922891816/1024918662223769600/VampireLogo_xsmall_colour.png?width=1440&height=445'

export default function Mortal5thInfo(props) {
  const { character, chronicle } = props;

  return (
    <CardActionArea disabled>
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
        <Typography>Mortal - 5th Edition</Typography>
        <Typography>Server: {chronicle?.name ?? 'None'}</Typography>
        <Divider sx={{my: 1}} />
        <V5DamageTracker label='Willpower' tracker={character.willpower} />
        <Divider sx={{my: 1}} />
        <V5DamageTracker label='Health' tracker={character.health} />
        <Divider sx={{my: 1}} />        
        <V5Humanity 
          humanity={character.humanity} 
          stains={character.stains} 
        />
        <ExpBar exp={character.exp} />
      </CardContent>
    </CardActionArea>
  )
}