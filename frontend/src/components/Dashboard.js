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
      rowSpacing={3}
    >
      <CharactersContext.Consumer>
        {(characters) => {
          if (!characters) return;
          let cards = [];
          Object.keys(characters).forEach((key, index) => {
            cards.push((               
              <CharacterCard key={key} character={characters[key]} />
            ))
          });
          
          return cards;
        }}
      </CharactersContext.Consumer>
    </Grid>
  )
}