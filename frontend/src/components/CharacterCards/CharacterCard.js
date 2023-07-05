import { Card, CardHeader, Typography } from "@mui/material";
import { Divider,Avatar } from "@mui/material";
import Grid from '@mui/material/Unstable_Grid2';
import Vampire5thInfo from './Vampire5thInfo';
import Hunter5thInfo from './Hunter5thInfo';
import Mortal5thInfo from "./Mortal5thInfo";
import Vampire20thInfo from './Vampire20thInfo';
import Human20thInfo from "./Human20thInfo";
import Werewolf20thInfo from "./Werewolf20thInfo";
import Ghoul20thInfo from "./Ghoul20thInfo";
import Changeling20thInfo from "./Changeling20thInfo";
import Wraith20thInfo from "./Wraith20thInfo";
import Demon20thInfo from "./Demon20thInfo";
import Mage20thInfo from "./Mage20thInfo";
import { useClientContext } from '../ClientProvider'

const cardInfo = {
  'vampire5th': Vampire5thInfo,
  'hunter5th': Hunter5thInfo,
  'mortal5th': Mortal5thInfo,
  'vampire20th': Vampire20thInfo,
  'human20th': Human20thInfo,
  'werewolf20th': Werewolf20thInfo,
  'ghoul20th': Ghoul20thInfo,
  'changeling20th': Changeling20thInfo,
  'wraith20th': Wraith20thInfo,
  'demon20th': Demon20thInfo,
  'mage20th': Mage20thInfo,
}

export default function CharacterCard(props) {
  const {character} = props;
  const { user, members, chronicles } = useClientContext();
  const CardInfo = cardInfo[character.splat];
  if (!CardInfo) return null

  return (           
    <Grid> 
      <Card sx={{minWidth: '270px', maxWidth: '325px'}}>      
        <CardHeader           
          avatar={
            <Avatar 
              alt={
                character.chronicle ? 
                members[character.chronicle][character.user].nickname : 
                user.username
              }
              src={                            
                character.chronicle ? 
                members[character.chronicle][character.user].avatar_url :
                  user.avatar_url
              }
            />
          }
          
          title={
            <Typography color='primary'>
              {character.name}
            </Typography>
          }
          
          subheader={
            character.chronicle ? 
            members[character.chronicle][character.user].nickname :
            user.username
          }
        />
        <Divider />      
        <CardInfo 
          character={character} 
          chronicle={chronicles[character.chronicle]} 
        />            
      </Card>
    </Grid>    
  )
}