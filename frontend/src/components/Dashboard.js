import { Grid } from "@mui/material";
import CharacterCard from "./CharacterCards/CharacterCard";
import { CharactersContext } from "./ClientProvider";

export default function Dashboard() {
  return (
    <Grid    
      container spacing={{md: 0, xs: 4}} 
      direction="row"
      justifyContent="space-evenly"
      alignItems="flex-start"
      columnSpacing={3}
      rowSpacing={2}
    >
      <CharactersContext.Consumer>
        {(characters) => {
          if (!characters) return;
          let y = [];
          Object.keys(characters).forEach((key, index) => {
            console.log(characters[key]);
            y.push((
              <Grid key={key} item xs={12} sm={6} md={4} lg={3}>                
                <CharacterCard character={characters[key]} />
              </Grid>
            ))
          });
          console.log(y)
          return y;
        }}
      </CharactersContext.Consumer>
    </Grid>
  )
}