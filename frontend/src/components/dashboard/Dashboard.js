import { Grid, Fab, Box, CircularProgress } from "@mui/material";
import { memo, useState } from "react";
import { useClientContext } from "../ClientProvider";
import RefreshIcon from '@mui/icons-material/Refresh';
import CharacterCardDisplay from "../CharacterCards/CharacterCardDisplay";

function Refresh(props) {
  const { client } = useClientContext();
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
        }}
      >
        {
          cooldown ? 
          <CircularProgress size='20px' color='inherit' /> : 
          <RefreshIcon size='large' />
        }
      </Fab>
    </Box>
  );
}

function Dashboard(props) 
{
  const { characters, chronicles, user } = useClientContext();

  return (
    <Box paddingTop={15} paddingX={3}>
      <Grid    
        container spacing={{md: 0, xs: 4}} 
        direction="row"
        justifyContent="space-evenly"
        alignItems="flex-start"
        columnSpacing={3}
        rowSpacing={3}
      >
        <CharacterCardDisplay 
          characters={characters} 
          chronicles={chronicles} 
          user={user}
        />
      </Grid>
      <Refresh />
    </Box>
  )
}

export default memo(Dashboard);