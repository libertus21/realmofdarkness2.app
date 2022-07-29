import { List, ListItem, ListSubheader } from '@mui/material';
import { Typography } from '@mui/material';
import Divider from '@mui/material/Divider';
import ListItemDialog from '../ListItemDialog'

const DiceV5Doc = [
  {
    summery: (
      <Typography>
        VtM Dice Roll
      </Typography>
    ),
    details: (
      <List>
        <ListSubheader>
          Command
        </ListSubheader>
        <ListItem>
          /dice roll
        </ListItem>
        <ListSubheader>
          Required Arguments:
        </ListSubheader>
        <ListItemDialog dialogContent={
            <Typography>Some text</Typography>
          }
        >
          pool: number
        </ListItemDialog>
        <ListSubheader>
          Optional Arguments:
        </ListSubheader>
        <ListItemDialog dialogContent="info">
          hunger: number
        </ListItemDialog>
        <Divider component="li" />
        <ListItemDialog dialogContent="info">
          difficulty: number
        </ListItemDialog>
        <Divider component="li" />
        <ListItemDialog dialogContent="info">
          blood_surge: number
        </ListItemDialog>
        <Divider component="li" />
        <ListItemDialog dialogContent="info">
          speciality: string
        </ListItemDialog>
        <Divider component="li" />
        <ListItemDialog dialogContent="info">
          rouse: option
        </ListItemDialog>
        <Divider component="li" />
        <ListItemDialog dialogContent="info">
          character: string
        </ListItemDialog>
        <Divider component="li" />
        <ListItemDialog dialogContent="info">
          auto_hunger: option
        </ListItemDialog>
        <Divider component="li" />
        <ListItemDialog dialogContent="info">
          notes: string
        </ListItemDialog>
      </List>
    )
  },
  {
    summery: (
      <Typography>
        VtM Rouse Check
      </Typography>
    ),
    details: (
      <List>
        <ListSubheader>
          Command
        </ListSubheader>
        <ListItem>
          /dice rouse
        </ListItem>
        <ListSubheader>
          Required Arguments:
        </ListSubheader>
        <ListItem>
          None
        </ListItem>
        <ListSubheader>
          Optional Arguments:
        </ListSubheader>
        <ListItemDialog dialogContent="info">
          reroll: option
        </ListItemDialog>
        <Divider component="li" />
        <ListItemDialog dialogContent="info">
          character: string
        </ListItemDialog>
        <Divider component="li" />
        <ListItemDialog dialogContent="info">
          notes: string
        </ListItemDialog>
      </List>
    )
  },
  {
    summery: (
      <Typography>
        VtM Resonance Roll
      </Typography>
    ),
    details: (
      <List>
        <ListSubheader>
          Command
        </ListSubheader>
        <ListItem>
          /dice resonance
        </ListItem>
        <ListSubheader>
          Required Arguments:
        </ListSubheader>
        <ListItem>
          None
        </ListItem>
        <ListSubheader>
          Optional Arguments:
        </ListSubheader>
        <ListItemDialog dialogContent="info">
          resonance: option
        </ListItemDialog>
        <Divider component="li" />
        <ListItemDialog dialogContent="info">
          temperament: option
        </ListItemDialog>
        <Divider component="li" />
        <ListItemDialog dialogContent="info">
          min_temperament: option
        </ListItemDialog>
        <Divider component="li" />
        <ListItemDialog dialogContent="info">
          notes: string
        </ListItemDialog>
      </List>
    )
  },
  {
    summery: (
      <Typography>
        Hunter the Reckoning Roll
      </Typography>
    ),
    details: (
      <List>
        <ListSubheader>
          Command
        </ListSubheader>
        <ListItem>
          /dice hunter
        </ListItem>
        <ListSubheader>
          Required Arguments:
        </ListSubheader>
        <ListItemDialog dialogContent="info">
          pool: number
        </ListItemDialog>
        <ListSubheader>
          Optional Arguments:
        </ListSubheader>
        <ListItemDialog dialogContent="info">
          desperation: number
        </ListItemDialog>
        <Divider component="li" />
        <ListItemDialog dialogContent="info">
          difficulty: number
        </ListItemDialog>
        <Divider component="li" />
        <ListItemDialog dialogContent="info">
          speciality: string
        </ListItemDialog>
        <Divider component="li" />
        <ListItemDialog dialogContent="info">
          character: string
        </ListItemDialog>
        <Divider component="li" />
        <ListItemDialog dialogContent="info">
          notes: string
        </ListItemDialog>
      </List>
    )
  },
  {
    summery: (
      <Typography>
        General Dice Roll
      </Typography>
    ),
    details: (
      <List>
        <ListSubheader>
          Command
        </ListSubheader>
        <ListItem>
          /dice general
        </ListItem>
        <ListSubheader>
          Required Arguments:
        </ListSubheader>
        <ListItemDialog dialogContent="info">
          dice_set_01: string
        </ListItemDialog>
        <ListSubheader>
          Optional Arguments:
        </ListSubheader>
        <ListItemDialog dialogContent="info">
          modifier: number
        </ListItemDialog>
        <Divider component="li" />
        <ListItemDialog dialogContent="info">
          dice_set_XX: number
        </ListItemDialog>
        <Divider component="li" />
        <ListItemDialog dialogContent="info">
          difficulty: number
        </ListItemDialog>
        <Divider component="li" />
        <ListItemDialog dialogContent="info">
          notes: string
        </ListItemDialog>
      </List>
    )
  },
]

const TrackerV5Doc = [
  {
    summery: (
      <Typography>
        New Vampire Tracker
      </Typography>
    ),
    details: (
      <List>
        <ListSubheader>
          Command
        </ListSubheader>
        <ListItem>
          /vampire new
        </ListItem>
        <ListSubheader>
          Required Arguments:
        </ListSubheader>
        <ListItemDialog dialogContent={
            <Typography>Some text</Typography>
          }
        >
          name: string
        </ListItemDialog>
        <Divider component="li" />
        <ListItemDialog dialogContent={
            <Typography>Some text</Typography>
          }
        >
          willpower: number
        </ListItemDialog>
        <Divider component="li" />
        <ListItemDialog dialogContent={
            <Typography>Some text</Typography>
          }
        >
          health: number
        </ListItemDialog>
        <Divider component="li" />
        <ListItemDialog dialogContent={
            <Typography>Some text</Typography>
          }
        >
          humanity: number
        </ListItemDialog>
        <ListSubheader>
          Optional Arguments:
        </ListSubheader>
        <ListItemDialog dialogContent="info">
          hunger: number
        </ListItemDialog>
        <Divider component="li" />
        <ListItemDialog dialogContent="info">
          exp: number
        </ListItemDialog>
        <Divider component="li" />
        <ListItemDialog dialogContent="info">
          willpower_superficial: number
        </ListItemDialog>
        <Divider component="li" />
        <ListItemDialog dialogContent="info">
          willpower_agg: number
        </ListItemDialog>
        <Divider component="li" />
        <ListItemDialog dialogContent="info">
          health_superficial: number
        </ListItemDialog>
        <Divider component="li" />
        <ListItemDialog dialogContent="info">
          health_agg: number
        </ListItemDialog>
        <Divider component="li" />
        <ListItemDialog dialogContent="info">
          stains: number
        </ListItemDialog>
        <Divider component="li" />
        <ListItemDialog dialogContent="info">
          notes: string
        </ListItemDialog>
        <Divider component="li" />
        <ListItemDialog dialogContent="info">
          colour: hex code
        </ListItemDialog>
        <Divider component="li" />
        <ListItemDialog dialogContent="info">
          image: url
        </ListItemDialog>
      </List>
    )
  },
  {
    summery: (
      <Typography>
        Update Vampire Tracker
      </Typography>
    ),
    details: (
      <List>
        <ListSubheader>
          Command
        </ListSubheader>
        <ListItem>
          /vampire update
        </ListItem>
        <ListSubheader>
          Required Arguments:
        </ListSubheader>
        <ListItem>
          name: string
        </ListItem>
        <ListSubheader>
          Optional Arguments:
        </ListSubheader>
        <ListItemDialog dialogContent="info">
          hunger: number
        </ListItemDialog>
        <Divider component="li" />
        <ListItemDialog dialogContent="info">
          willpower_superficial: number
        </ListItemDialog>        
        <Divider component="li" />
        <ListItemDialog dialogContent="info">
          health_superficial: number
        </ListItemDialog>
        <Divider component="li" />
        <ListItemDialog dialogContent="info">
          willpower_agg: number
        </ListItemDialog>
        <Divider component="li" />
        <ListItemDialog dialogContent="info">
          health_agg: number
        </ListItemDialog>
        <Divider component="li" />
        <ListItemDialog dialogContent="info">
          stains: number
        </ListItemDialog>
        <Divider component="li" />
        <ListItemDialog dialogContent="info">
          exp: number
        </ListItemDialog>
        <Divider component="li" />
        <ListItemDialog dialogContent="info">
          willpower: number
        </ListItemDialog>
        <Divider component="li" />
        <ListItemDialog dialogContent="info">
          health: number
        </ListItemDialog>
        <Divider component="li" />
        <ListItemDialog dialogContent="info">
          humanity: number
        </ListItemDialog>
        <Divider component="li" />
        <ListItemDialog dialogContent="info">
          player: @user
        </ListItemDialog>
        <Divider component="li" />
        <ListItemDialog dialogContent="info">
          notes: string
        </ListItemDialog>
      </List>
    )
  },
  {
    summery: (
      <Typography>
        Set Vampire Tracker
      </Typography>
    ),
    details: (
      <List>
        <ListSubheader>
          Command
        </ListSubheader>
        <ListItem>
          /vampire set
        </ListItem>
        <ListSubheader>
          Required Arguments:
        </ListSubheader>
        <ListItem>
          name: string
        </ListItem>
        <ListSubheader>
          Optional Arguments:
        </ListSubheader>        
        <ListItemDialog dialogContent="info">
          willpower: number
        </ListItemDialog>
        <Divider component="li" />
        <ListItemDialog dialogContent="info">
          health: number
        </ListItemDialog>
        <Divider component="li" />
        <ListItemDialog dialogContent="info">
          humanity: number
        </ListItemDialog>
        <Divider component="li" />
        <ListItemDialog dialogContent="info">
          hunger: number
        </ListItemDialog>        
        <Divider component="li" />
        <ListItemDialog dialogContent="info">
          exp: number
        </ListItemDialog>
        <Divider component="li" />
        <ListItemDialog dialogContent="info">
          willpower_superficial: number
        </ListItemDialog>     
        <Divider component="li" />
        <ListItemDialog dialogContent="info">
          willpower_agg: number
        </ListItemDialog>   
        <Divider component="li" />
        <ListItemDialog dialogContent="info">
          health_superficial: number
        </ListItemDialog>        
        <Divider component="li" />
        <ListItemDialog dialogContent="info">
          health_agg: number
        </ListItemDialog>
        <Divider component="li" />
        <ListItemDialog dialogContent="info">
          stains: number
        </ListItemDialog>                
        <Divider component="li" />
        <ListItemDialog dialogContent="info">
          notes: string
        </ListItemDialog>
        <Divider component="li" />
        <ListItemDialog dialogContent="info">
          change_name: string
        </ListItemDialog>
        <Divider component="li" />
        <ListItemDialog dialogContent="info">
          colour: hex number
        </ListItemDialog>
        <Divider component="li" />
        <ListItemDialog dialogContent="info">
          image: url
        </ListItemDialog>
      </List>
    )
  },
  {
    summery: (
      <Typography>
        New Mortal Tracker
      </Typography>
    ),
    details: (
      <List>
        <ListSubheader>
          Command
        </ListSubheader>
        <ListItem>
          /mortal new
        </ListItem>
        <ListSubheader>
          Required Arguments:
        </ListSubheader>
        <ListItemDialog dialogContent={
            <Typography>Some text</Typography>
          }
        >
          name: string
        </ListItemDialog>
        <Divider component="li" />
        <ListItemDialog dialogContent={
            <Typography>Some text</Typography>
          }
        >
          willpower: number
        </ListItemDialog>
        <Divider component="li" />
        <ListItemDialog dialogContent={
            <Typography>Some text</Typography>
          }
        >
          health: number
        </ListItemDialog>
        <Divider component="li" />
        <ListItemDialog dialogContent={
            <Typography>Some text</Typography>
          }
        >
          humanity: number
        </ListItemDialog>
        <ListSubheader>
          Optional Arguments:
        </ListSubheader>        
        <ListItemDialog dialogContent="info">
          exp: number
        </ListItemDialog>     
        <Divider component="li" />
        <ListItemDialog dialogContent="info">
          willpower_superficial: number
        </ListItemDialog>
        <Divider component="li" />
        <ListItemDialog dialogContent="info">
          willpower_agg: number
        </ListItemDialog>
        <Divider component="li" />
        <ListItemDialog dialogContent="info">
          health_superficial: number
        </ListItemDialog>
        <Divider component="li" />
        <ListItemDialog dialogContent="info">
          health_agg: number
        </ListItemDialog>
        <Divider component="li" />
        <ListItemDialog dialogContent="info">
          stains: number
        </ListItemDialog>
        <Divider component="li" />
        <ListItemDialog dialogContent="info">
          notes: string
        </ListItemDialog>
        <Divider component="li" />
        <ListItemDialog dialogContent="info">
          colour: hex code
        </ListItemDialog>
        <Divider component="li" />
        <ListItemDialog dialogContent="info">
          image: url
        </ListItemDialog>
      </List>
    )
  },
  {
    summery: (
      <Typography>
        Update Mortal Tracker
      </Typography>
    ),
    details: (
      <List>
        <ListSubheader>
          Command
        </ListSubheader>
        <ListItem>
          /mortal update
        </ListItem>
        <ListSubheader>
          Required Arguments:
        </ListSubheader>
        <ListItem>
          name: string
        </ListItem>
        <ListSubheader>
          Optional Arguments:
        </ListSubheader>
        <ListItemDialog dialogContent="info">
          willpower_superficial: number
        </ListItemDialog>        
        <Divider component="li" />
        <ListItemDialog dialogContent="info">
          health_superficial: number
        </ListItemDialog>
        <Divider component="li" />
        <ListItemDialog dialogContent="info">
          willpower_agg: number
        </ListItemDialog>
        <Divider component="li" />
        <ListItemDialog dialogContent="info">
          health_agg: number
        </ListItemDialog>
        <Divider component="li" />
        <ListItemDialog dialogContent="info">
          stains: number
        </ListItemDialog>
        <Divider component="li" />
        <ListItemDialog dialogContent="info">
          exp: number
        </ListItemDialog>
        <Divider component="li" />
        <ListItemDialog dialogContent="info">
          willpower: number
        </ListItemDialog>
        <Divider component="li" />
        <ListItemDialog dialogContent="info">
          health: number
        </ListItemDialog>
        <Divider component="li" />
        <ListItemDialog dialogContent="info">
          humanity: number
        </ListItemDialog>
        <Divider component="li" />
        <ListItemDialog dialogContent="info">
          player: @user
        </ListItemDialog>
        <Divider component="li" />
        <ListItemDialog dialogContent="info">
          notes: string
        </ListItemDialog>
      </List>
    )
  },
  {
    summery: (
      <Typography>
        Set Mortal Tracker
      </Typography>
    ),
    details: (
      <List>
        <ListSubheader>
          Command
        </ListSubheader>
        <ListItem>
          /mortal set
        </ListItem>
        <ListSubheader>
          Required Arguments:
        </ListSubheader>
        <ListItem>
          name: string
        </ListItem>
        <ListSubheader>
          Optional Arguments:
        </ListSubheader>        
        <ListItemDialog dialogContent="info">
          willpower: number
        </ListItemDialog>
        <Divider component="li" />
        <ListItemDialog dialogContent="info">
          health: number
        </ListItemDialog>
        <Divider component="li" />
        <ListItemDialog dialogContent="info">
          humanity: number
        </ListItemDialog>       
        <Divider component="li" />
        <ListItemDialog dialogContent="info">
          exp: number
        </ListItemDialog>
        <Divider component="li" />
        <ListItemDialog dialogContent="info">
          willpower_superficial: number
        </ListItemDialog>     
        <Divider component="li" />
        <ListItemDialog dialogContent="info">
          willpower_agg: number
        </ListItemDialog>   
        <Divider component="li" />
        <ListItemDialog dialogContent="info">
          health_superficial: number
        </ListItemDialog>        
        <Divider component="li" />
        <ListItemDialog dialogContent="info">
          health_agg: number
        </ListItemDialog>
        <Divider component="li" />
        <ListItemDialog dialogContent="info">
          stains: number
        </ListItemDialog>                
        <Divider component="li" />
        <ListItemDialog dialogContent="info">
          notes: string
        </ListItemDialog>
        <Divider component="li" />
        <ListItemDialog dialogContent="info">
          change_name: string
        </ListItemDialog>
        <Divider component="li" />
        <ListItemDialog dialogContent="info">
          colour: hex number
        </ListItemDialog>
        <Divider component="li" />
        <ListItemDialog dialogContent="info">
          image: url
        </ListItemDialog>
      </List>
    )
  },
  {
    summery: (
      <Typography>
        Lookup Character
      </Typography>
    ),
    details: (
      <List>
        <ListSubheader>
          Command
        </ListSubheader>
        <ListItem>
          /tracker find
        </ListItem>
        <ListSubheader>
          Required Arguments:
        </ListSubheader>
        <ListItem>
          None
        </ListItem>
        <ListSubheader>
          Optional Arguments:
        </ListSubheader>        
        <ListItemDialog dialogContent="info">
          history: option
        </ListItemDialog>
        <Divider component="li" />
        <ListItemDialog dialogContent="info">
          player: @user
        </ListItemDialog>
      </List>
    )
  },
  {
    summery: (
      <Typography>
        Delete Character
      </Typography>
    ),
    details: (
      <List>
        <ListSubheader>
          Command
        </ListSubheader>
        <ListItem>
          /tracker delete
        </ListItem>
        <ListSubheader>
          Required Arguments:
        </ListSubheader>
        <ListItem>
          None
        </ListItem>
        <ListSubheader>
          Optional Arguments:
        </ListSubheader>        
        <ListItemDialog dialogContent="info">
          player: @user
        </ListItemDialog>
      </List>
    )
  },
  {
    summery: (
      <Typography>
        Set Tracker Channel
      </Typography>
    ),
    details: (
      <List>
        <ListSubheader>
          Command
        </ListSubheader>
        <ListItem>
          /tracker channel
        </ListItem>
        <ListSubheader>
          Required Arguments:
        </ListSubheader>
        <ListItemDialog dialogContent="info">
          channel: #channel
        </ListItemDialog>
        <ListSubheader>
          Optional Arguments:
        </ListSubheader> 
        <ListItem>
          None
        </ListItem>
      </List>
    )
  },
  {
    summery: (
      <Typography>
        Set Tracker Storyteller Roles
      </Typography>
    ),
    details: (
      <List>
        <ListSubheader>
          Command
        </ListSubheader>
        <ListItem>
          /tracker storytellers
        </ListItem>
        <ListSubheader>
          Required Arguments:
        </ListSubheader>
        <ListItemDialog dialogContent="info">
          role: @role
        </ListItemDialog>
        <ListSubheader>
          Optional Arguments:
        </ListSubheader> 
        <ListItem>
          None
        </ListItem>
      </List>
    )
  },
]

export { DiceV5Doc, TrackerV5Doc };