import { CardActionArea, CardContent, CardMedia } from "@mui/material";
import { Typography, Divider } from "@mui/material";
import V20HealthTracker from "../Trackers/V20HealthTracker";
import ExpBar from "../CharacterCards/ExpBar";
import ResponsiveRating from "../Trackers/ResponsiveRating";


const defaultImage = 'https://media.discordapp.net/attachments/886983353922891816/1031852816421109770/SymbolWODfinal_red_lowRez.png'

export default function Changeling20thInfo(props) {
  const { character, chronicle } = props;

  return (
    <CardActionArea disabled>
      <CardContent>
        <CardMedia 
          component="img"
          image={character.faceclaim ? character.faceclaim : defaultImage}
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
        <Typography>Changeling - 20th Edition</Typography>
        <Typography>Server: {chronicle?.name ?? 'None'}</Typography>
        <Divider sx={{my: 1}} />
        <Typography>Willpower {`${character.willpower.current} / ${character.willpower.total}`}</Typography>
        <ResponsiveRating tracker={{
            current: character.willpower.current, 
            total: character.willpower.total
          }} 
        />
        <Divider sx={{my: 1}} />
        <Typography>Imbalence {`${character.imbalance}`}</Typography>
        <ResponsiveRating tracker={{current: character.imbalance, total: 10}} />        
        <Divider sx={{my: 1}} />
        <Typography>
          Glamour
          {` ${character.glamour.current} / ${character.glamour.total}`}
        </Typography>
        <ResponsiveRating 
          tracker={{
            current: character.glamour.current, 
            total: character.glamour.total
          }} 
        />
        <Divider sx={{my: 1}} />
        <Typography>
          Banality Permanent {`${character.banality.total}`}
        </Typography>
        <ResponsiveRating tracker={{current: character.banality.total, total: 10}} />        
        <Divider sx={{my: 1}} />
        <Typography>Banality Temporary {character.banality.current}</Typography>
        <ResponsiveRating tracker={{
            current: character.banality.current, 
            total: 10
          }} 
        />
        <Divider sx={{my: 1}} />
        <Typography>Nightmare {`${character.nightmare}`}</Typography>
        <ResponsiveRating tracker={{current: character.nightmare, total: 10}} />
        <Divider sx={{my: 1}} />
        <Typography>Chimerical Health</Typography>
        <V20HealthTracker tracker={character.chimerical} />
        <Divider sx={{my: 1}} />
        <Typography>Health</Typography>
        <V20HealthTracker tracker={character.health} />
        <ExpBar exp={character.exp} />
      </CardContent>
    </CardActionArea>
  )
}