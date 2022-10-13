import { Card, CardHeader, Typography } from "@mui/material";
import { Divider, Grid, Avatar } from "@mui/material";
import Vampire5thInfo from './Vampire5thInfo';
import Hunter5thInfo from './Hunter5thInfo';
import Mortal5thInfo from "./Mortal5thInfo";
import { UserContext, ChroniclesContext } from '../ClientProvider'

const cardInfo = {
  'vampire5th': Vampire5thInfo,
  'hunter5th': Hunter5thInfo,
  'mortal5th': Mortal5thInfo,
}


export default function CharacterCard(props) {
  const {character} = props;
  const CardInfo = cardInfo[character.splat];
  if (!CardInfo) return null

  return (    
    <UserContext.Consumer>
      {(user) => (        
        <ChroniclesContext.Consumer>
          {(chronicles) => (        
            <Grid item xs={12} sm={6} md={4} lg={3}> 
              <Card sx={{minWidth: '270px'}}>      
                <CardHeader 
                  avatar={
                    <Avatar 
                      alt={user.username}
                      src={user.avatar_url}
                    />
                  }
                  title={<Typography color='primary'>{character.name}</Typography>}
                  subheader={user.username}
                />
                <Divider />      
                <CardInfo 
                  character={character} 
                  chronicle={chronicles[character.chronicle]} 
                />            
              </Card>
            </Grid>
          )}
        </ChroniclesContext.Consumer>
      )}
    </UserContext.Consumer>
  )
}