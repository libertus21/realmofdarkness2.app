import { Grid, FormControl, Select, MenuItem, InputLabel, ListSubheader } from "@mui/material";
import { OutlinedInput, Box, Chip, Alert, ListItemText } from "@mui/material";
import { useState, useMemo } from "react";
import CharacterCard from "./CharacterCard";
import Checkbox from '@mui/material/Checkbox';


export default function CharacterCardDisplay(props) 
{
  const {characters, chronicles} = props;
  const [sortOptions, setSortOptions] = useState({
    chronicle: '',
    splats: [],
    sortBy: 'lastUpdated'
  });

  function handleSelectChange(event, value)
  {
    const newSort = {...sortOptions};
    newSort[value] = event.target.value;
    setSortOptions(newSort);
  }

  function handleSplatChange(event)
  {
    const {target: { value }} = event;
    const newSort = {...sortOptions};
    
    if (value.includes('all'))
    {
      newSort.splats = [];
    }
    else newSort.splats = typeof value === 'string' ? value.split(',') : value;
    setSortOptions(newSort);
  }

  function onCloseSelect()
  {
    setTimeout(() => {      
      document.activeElement.blur();
    }, 0)
  }

  function chronicleMenus() 
  {
    const menu = [
      <MenuItem key='all' value=''>All</MenuItem>,
      <MenuItem key='0' value='0'>No Server</MenuItem>
    ];
    for (const chronicle of Object.values(chronicles))
    {
      menu.push(
        <MenuItem 
          key={chronicle.id} 
          value={chronicle.id}
        >
          {chronicle.name}
        </MenuItem>
      )
    }
    return menu;
  }

  function sortCharacters()
  {        
    if (!characters) return;
    let cards = [];

    // Sorting by last updated time
    const sortedChars = Object.values(characters).sort((a, b) => {
      if (sortOptions.sortBy === 'lastUpdated')
      {
        return b.lastUpdated - a.lastUpdated;
      }
      const nameA = a.name.toUpperCase();
      const nameB = b.name.toUpperCase();
      return nameA.localeCompare(nameB);
    });

    for (const character of sortedChars)
    {
      if (sortOptions.chronicle !== ''  && sortOptions.chronicle !== '0' &&
        character.chronicle !== sortOptions.chronicle)
      {
        continue;
      }
      else if (character.chronicle !== '' && sortOptions.chronicle === '0')
      {
        continue;
      }
      if (sortOptions.splats.length && !sortOptions.splats.includes(character.splat)) 
      {
        continue;
      }
      cards.push((
        <CharacterCard key={character.id} character={character} />
      ))
    }   
    const noChars = (
      <Alert 
        severity="warning"
        variant="outlined"
        sx={{mt: 5}}
      >
        No Characters were found!
      </Alert>
    );
      return (cards.length ? cards : noChars);
  }
  
  const getSplatMenus = useMemo(() => (
    renderSplatSelectFilter(characters, sortOptions.splats)
  ), [characters, sortOptions.splats]);
  
  return (
    <Grid    
      container
      alignItems="center"
      rowSpacing={3}
      sx={{pl: 3}}
    >
      <Grid item xs={12} sm={4}  sx={{textAlign: 'center'}}>
        <FormControl sx={{minWidth: '150px'}}>
          <InputLabel id="chronicle-select-label">Chronicles</InputLabel>
          <Select 
            labelId="chronicle-select-label" 
            id="chronicle-select" 
            label='Chronicles'
            value={sortOptions.chronicle}
            onChange={(event) => {handleSelectChange(event, 'chronicle')}}
            onClose={onCloseSelect}
          >
            {chronicleMenus()}
          </Select>          
        </FormControl>
      </Grid>
      <Grid item xs={12} sm={4} sx={{textAlign: 'center'}}>
        <FormControl sx={{minWidth: '150px'}}>
          <InputLabel id="splat-select-label">Splats</InputLabel>
          <Select 
            labelId="splat-select-label" 
            id="splat-select" 
            label='Splats'
            multiple
            input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
            value={sortOptions.splats}
            onChange={handleSplatChange}             
            onClose={onCloseSelect}           
            renderValue={(selected) => (
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                {selected.map((value) => (
                  <Chip key={value} label={value} />
                ))}
              </Box>
            )}
          >
            {getSplatMenus}
          </Select>          
        </FormControl>
      </Grid>
      <Grid item xs={12} sm={4} sx={{textAlign: 'center'}}>
        <FormControl sx={{minWidth: '150px'}}>
          <InputLabel id="sortBy-select-label">Sort by</InputLabel>
          <Select 
            labelId="sortBy-select-label" 
            id="sortBy-select" 
            label='Sort by'
            value={sortOptions.sortBy}
            onChange={(event) => {handleSelectChange(event, 'sortBy')}}
          >
            <MenuItem value='lastUpdated'>Last Updated</MenuItem>
            <MenuItem value='name'>Name</MenuItem>
          </Select>          
        </FormControl>
      </Grid>
      <Grid          
          container 
          item xs={12}
          justifyContent="space-evenly"
          alignItems="flex-start"
          columnSpacing={3}
          rowSpacing={3}
      >        
        {sortCharacters()}
      </Grid>
    </Grid>
  )
}

function renderSplatSelectFilter(characters, splats)
{
  let v5;
  let v20;
  const tempV5 = {};
  const tempV20 = {};
  for (const character of Object.values(characters))
  {
    const splat = SplatLabels[character.splat];
    if (splat.version === '5th') tempV5[splat.key] = splat;
    else tempV20[splat.key] = splat; 
  }    
  v5 = Object.values(tempV5);
  v20 = Object.values(tempV20);
  
  const menu = [<MenuItem key='all' value='all'>Clear Filter</MenuItem>];
  if (v5.length) 
  {
    menu.push(<ListSubheader key='5th'>5th Edition</ListSubheader>);
    v5.sort((a, b) => a.order - b.order);      
  }

  for (const splat of v5)
  {
    menu.push(
      <MenuItem 
        key={splat.key} 
        value={splat.key}
      >
        <Checkbox checked={splats.indexOf(splat.key) > -1} />
        <ListItemText>{splat.name}</ListItemText>
      </MenuItem>
    )
  }
  
  if (v20.length)
  {
    menu.push(<ListSubheader key='20th'>20th Edition</ListSubheader>);
    v20.sort((a, b) => a.order - b.order);
  } 

  for (const splat of v20)
  {
    menu.push(
      <MenuItem 
        key={splat.key} 
        value={splat.key}
      >
        <Checkbox checked={splats.indexOf(splat.key) > -1} />
        <ListItemText>{splat.name}</ListItemText>
      </MenuItem>
    )
  }
  return menu;
}


const SplatLabels = {
  'vampire5th': {
    key: 'vampire5th',
    name: 'Vampire',
    version: '5th',
    order: '1'
  },
  'hunter5th': {
    key: 'hunter5th',
    name: 'Hunter',
    version: '5th',
    order: '2'
  },
  'mortal5th': {
    key: 'mortal5th',
    name: 'Mortal',
    version: '5th',
    order: '3'
  },
  'vampire20th': {
    key: 'vampire20th',
    name: 'Vampire',
    version: '20th',
    order: '1'
  },
  'human20th': {
    key: 'human20th',
    name: 'Human',
    version: '20th',
    order: '2'
  },
  'ghoul20th': {
    key: 'ghoul20th',
    name: 'Ghouls',
    version: '20th',
    order: '3'
  },
  'werewolf20th': {
    key: 'werewolf20th',
    name: 'Werewolf',
    version: '20th',
    order: '4'
  },
  'mage20th': {
    key: 'mage20th',
    name: 'Mage',
    version: '20th',
    order: '5'
  },
  'changeling20th': {
    key: 'changeling20th',
    name: 'Changeling',
    version: '20th',
    order: '6'
  },
  'wraith20th': {
    key: 'wraith20th',
    name: 'Wraith',
    version: '20th',
    order: '7'
  },
  'demon20th': {
    key: 'demon20th',
    name: 'Demon',
    version: '20th',
    order: '8'
  }, 
}