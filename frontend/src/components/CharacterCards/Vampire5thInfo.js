import { CardActionArea, CardContent, CardMedia } from "@mui/material";
import { Typography } from "@mui/material";

export default function Vampire5thInfo(props) {
  const { character } = props;
  return (
    <CardActionArea>
      <CardContent>
        <Typography>Name: {character.name}</Typography>
        <Typography>Splat: {character.splat}</Typography>
        <Typography>Guild: {character.guild}</Typography>
        <Typography>Exp: {character.exp.current}/{character.exp.total}</Typography>
      </CardContent>
    </CardActionArea>
  )
}