import { CardActionArea, CardContent, CardMedia } from "@mui/material";
import { Typography, Divider } from "@mui/material";
import V20HealthTracker from "../Trackers/V20HealthTracker";
import ExpBar from "../CharacterCards/ExpBar";
import ResponsiveRating from "../Trackers/ResponsiveRating";


const defaultImage = 'https://media.discordapp.net/attachments/886983353922891816/1031852816421109770/SymbolWODfinal_red_lowRez.png'

export default function Demon20thInfo(props) {
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
        <Typography>Demon - 20th Edition</Typography>
        <Typography>Server: {chronicle?.name ?? 'None'}</Typography>
        <Divider sx={{my: 1}} />
        <Typography>
          Willpower {`${character.willpower.current} / ${character.willpower.total}`}
        </Typography>
        <ResponsiveRating tracker={{
            current: character.willpower.current, 
            total: character.willpower.total
          }} 
        />
        <Divider sx={{my: 1}} />
        <Typography>
          Faith {`${character.faith.current} / ${character.faith.total}`}
        </Typography>
        <ResponsiveRating tracker={{
            current: character.faith.current, 
            total: character.faith.total
          }} 
        />        
        <Divider sx={{my: 1}} />
        <Typography>
          Torment - Permenent: {character.torment.total}
        </Typography>
        <ResponsiveRating tracker={{
            current: character.torment.total, 
            total: 10
          }} 
        />      
        <Divider sx={{my: 1}} />
        <Typography>
          Torment - Temporary: {character.torment.current}
        </Typography>
        <ResponsiveRating tracker={{
            current: character.torment.current, 
            total: 10
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