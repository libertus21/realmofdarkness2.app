import { Grid, Box } from "@mui/material";
import { useClientContext } from "../ClientProvider";
import CharacterCardDisplay from "../CharacterCards/CharacterCardDisplay";
import Connecting from "../../routes/Connecting";


export default function Dashboard(props) 
{
  const { characters, chronicles, user, connected } = useClientContext();

  return (
    connected ? (
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
      </Box>
    ) : <Connecting />
  )
}