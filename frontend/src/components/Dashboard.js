import { Grid, Fab, Box, CircularProgress } from "@mui/material";
import { Fragment, memo, useState } from "react";
import CharacterCard from "./CharacterCards/CharacterCard";
import { CharactersContext, ClientContext } from "./ClientProvider";
import RefreshIcon from '@mui/icons-material/Refresh';

function Refresh(props) {
  const handleClick = (event) => {};
  const [cooldown, setCooldown] = useState(false);

  function timeout()
  {
    setCooldown(false);
  }

  return (
    <Box
      onClick={handleClick}
      role="presentation"
      sx={{ position: 'fixed', bottom: 16, left: 16 }}
    > 
      <ClientContext.Consumer>    
        {(client) => (                      
          <Fab 
            color='primary'
            disabled={cooldown}
            onClick={() => 
            {
              if (!cooldown)
              {                
                client.refresh();
                setCooldown(true);
                setTimeout(timeout, 3000);
              }
              else console.log("On cooldown");
            }}
          >
            {
              cooldown ? 
              <CircularProgress size='20px' color='inherit' /> : 
              <RefreshIcon size='large' />
            }
          </Fab>           
        )}   
      </ClientContext.Consumer> 
    </Box>
  );
}

function Dashboard(props) {
  return (
    <Fragment>
      <Grid    
        container spacing={{md: 0, xs: 4}} 
        direction="row"
        justifyContent="space-evenly"
        alignItems="flex-start"
        columnSpacing={3}
        rowSpacing={3}
      >
        <CharactersContext.Consumer>
          {(characters) => {
            if (!characters) return;
            let cards = [];

            // Sorting by last updated time
            const sortedChars = Object.values(characters).sort((a, b) => (
             b.lastUpdated - a.lastUpdated
            ));

            for (const character of sortedChars)
            {
              cards.push((
                <CharacterCard key={character.id} character={character} />
              ))
            }          
            return cards;
          }}
        </CharactersContext.Consumer>
      </Grid>
      <Refresh />
    </Fragment>
  )
}

export default memo(Dashboard);