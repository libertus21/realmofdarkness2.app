import { Card, CardActionArea, CardContent, CardMedia } from "@mui/material";
import { Typography } from "@mui/material";
import Vampire5thInfo from './Vampire5thInfo';

const cardInfo = {
  'vampire5th': Vampire5thInfo
}


export default function CharacterCard(props) {
  const {character} = props;
  const CardInfo = cardInfo[character.splat];
  if (!CardInfo) return console.log(character.splat)

  return (
    <Card>
      <CardInfo character={character} />
    </Card>
  )
}