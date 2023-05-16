import { List, ListItem, ListSubheader } from '@mui/material';
import { Typography } from '@mui/material';
import Divider from '@mui/material/Divider';
import { Box } from '@mui/system';
import ListItemDialog from '../ListItemDialog';
import AccordionTitle from './AccordionTitle';

const notesArg = (
  <ListItemDialog dialogContent={
    <Box>
      <Typography>
        Additional information to be displayed.
        This has no mechanical effect on the roll itself and is purely
        for documentation purposes.
      </Typography>
    </Box>
  }>
    notes: string
  </ListItemDialog>
);

const nameArg = (
  <ListItemDialog dialogContent={
    <Box>
      <Typography>
        The name of the Character.
      </Typography>
      <Typography sx={{pt: 2}}>
        Name is only case sensitive on creation, after case is not required.
        A name can be multiple words.
      </Typography>
    </Box>
  }>
    name: string
  </ListItemDialog>
);

const setHex = (  
  <ListItemDialog dialogContent={
    <Box>
      <Typography>
        A hex code number in the form of '#000000' you can get these
        numbers using&nbsp;
        <a 
          href='https://g.co/kgs/FwvgoG'
          target='_blank'
          rel="noreferrer"
        > 
          googles colour picker
        </a>
      </Typography>
      <Typography sx={{pt: 2}}>
        Changes the main colour linked to this character. 
      </Typography>
      <Typography>
        [Fledgling Supporter or higher]
      </Typography>
    </Box>
  }>
    colour: hex code
  </ListItemDialog>
);

const setImage = (
  <ListItemDialog dialogContent={
    <Box>
      <Typography>
        A URL link. The easiest way to get one is to upload your image
        to Discord then right click the image and select "Copy Link"
      </Typography>
      <Typography sx={{pt: 2}}>
        Changes the thumbnail image linked to this character. 
        This is displayed using rolls when the character is linked or
        when displaying the tracked Character.
      </Typography>
      <Typography>
        [Fledgling Supporter or higher]
      </Typography>
    </Box>
  }>
    image: url
  </ListItemDialog>    
);

const setHealth = (
  <ListItemDialog dialogContent={
    <Box>
      <Typography>
        A Number between 1 and 20
      </Typography>
      <Typography>
        The total Health a Character has. Page 119 VtM Corebook
      </Typography>
    </Box>
  }>
    health: number
  </ListItemDialog>
);

const setWillpower = (
  <ListItemDialog dialogContent={
    <Box>
      <Typography>
        A Number between 1 and 20
      </Typography>
      <Typography>
        The total Willpower a Character has. Page 157 VtM Corebook
      </Typography>
    </Box>
  }>
    willpower: number
  </ListItemDialog>
);

const setHumanity = (
  <ListItemDialog dialogContent={
    <Box>
      <Typography>
        A Number between 0 and 10
      </Typography>
      <Typography>
        The total Humanity a Character has. Page 236 VtM Corebook
      </Typography>
    </Box>
  }>
    humanity: number
  </ListItemDialog>
);

const setHunger = (
  <ListItemDialog dialogContent={
    <Box>
      <Typography>
        A Number between 0 and 5
      </Typography>
      <Typography>
        The total Hunger a Character has. Page 205 VtM Corebook
      </Typography>
    </Box>
  }>
    hunger: number
  </ListItemDialog>
);

const setDesperation = (
  <ListItemDialog dialogContent={
    <Box>
      <Typography>
        A Number between 1 and 5
      </Typography>
      <Typography>
        Sets Desperation to the input amount. Page 125 HtR Corebook
      </Typography>
    </Box>
  }>
    desperation: number
  </ListItemDialog>
);

const setDanger = (
  <ListItemDialog dialogContent={
    <Box>
      <Typography>
        A Number between 1 and 5
      </Typography>
      <Typography>
        Sets Desperation to the input amount. Page 125 HtR Corebook
      </Typography>
    </Box>
  }>
    danger: number
  </ListItemDialog>
);

const setDespair = (
  <ListItemDialog dialogContent={
    <Box>
      <Typography>
        Choose between "true" and "false"
      </Typography>
      <Typography>
        Will set your despair based on the option chosen. Page 128 HtR Corebook
      </Typography>
    </Box>
  }>
    despair: option
  </ListItemDialog>
);

const setExp = (
  <ListItemDialog dialogContent={
    <Box>
      <Typography>
        A Number between 0 and 1000
      </Typography>
      <Typography>
        The total Experiance a Character has. Page 130 VtM Corebook
      </Typography>
    </Box>
  }>
    exp: number
  </ListItemDialog>
);

const setWillpowerSup = (
  <ListItemDialog dialogContent={
    <Box>
      <Typography>
        A Number between 0 and 20
      </Typography>
      <Typography>
        The total Superficial Willpower Damage a Character has. 
        Page 126 VtM Corebook
      </Typography>
    </Box>
  }>
    willpower_superficial: number
  </ListItemDialog>
);

const setWillpowerAgg = (
  <ListItemDialog dialogContent={
    <Box>
      <Typography>
        A Number between 0 and 20
      </Typography>
      <Typography>
        The total Aggravated Willpower Damage a Character has. 
        Page 126 VtM Corebook
      </Typography>
    </Box>
  }>
    willpower_agg: number
  </ListItemDialog>
);

const setHealthSup = (
  <ListItemDialog dialogContent={
    <Box>
      <Typography>
        A Number between 0 and 20
      </Typography>
      <Typography>
        The total Superficial Health Damage a Character has. 
        Page 126 VtM Corebook
      </Typography>
    </Box>
  }>
    health_superficial: number
  </ListItemDialog>
);

const setHealthAgg = (
  <ListItemDialog dialogContent={
    <Box>
      <Typography>
        A Number between 0 and 20
      </Typography>
      <Typography>
        The total Aggravated Health Damage a Character has. 
        Page 126 VtM Corebook
      </Typography>
    </Box>
  }>
    health_agg: number
  </ListItemDialog>
);

const setStains = (
  <ListItemDialog dialogContent={
    <Box>
      <Typography>
        A Number between 0 and 10
      </Typography>
      <Typography>
        The total Stains a Character has. Page 239 VtM Corebook
      </Typography>
    </Box>
  }>
    stains: number
  </ListItemDialog>
);

const setNameChange = (
  <ListItemDialog dialogContent={
    <Box>
      <Typography>The name to change to</Typography>
      <Typography>
        This name is case sensitive. Multiple words are allowed.
      </Typography>
    </Box>
  }>
    change_name: string
  </ListItemDialog>
);

const updateHunger = (
  <ListItemDialog dialogContent={
    <Box>
      <Typography>
        A Number between -10 and 10
      </Typography>
      <Typography>
        Will add or remove the amount specified. Page 205 VtM Corebook
      </Typography>
    </Box>
  }>
    hunger: number
  </ListItemDialog>
);

const updateDesperation = (
  <ListItemDialog dialogContent={
    <Box>
      <Typography>
        A Number between -10 and 10
      </Typography>
      <Typography>
        Will add or remove the amount specified. Page 125 HtR Corebook
      </Typography>
    </Box>
  }>
    desperation: number
  </ListItemDialog>
);

const updateDanger = (
  <ListItemDialog dialogContent={
    <Box>
      <Typography>
        A Number between -10 and 10
      </Typography>
      <Typography>
        Will add or remove the amount specified. Page 125 HtR Corebook
      </Typography>
    </Box>
  }>
    desperation: number
  </ListItemDialog>
);

const updateWillpowerSup = (
  <ListItemDialog dialogContent={
    <Box>
      <Typography>
        A Number between -20 and 20
      </Typography>
      <Typography>
        Will add or remove the amount specified. Page 205 VtM Corebook
      </Typography>
    </Box>
  }>
    willpower_superficial: number
  </ListItemDialog>
);

const updateWillpowerAgg = (
  <ListItemDialog dialogContent={
    <Box>
      <Typography>
        A Number between -20 and 20
      </Typography>
      <Typography>
        Will add or remove the amount specified. Page 205 VtM Corebook
      </Typography>
    </Box>
  }>
    willpower_agg: number
  </ListItemDialog>
);

const updateHealthSup = (
  <ListItemDialog dialogContent={
    <Box>
      <Typography>
        A Number between -30 and 30
      </Typography>
      <Typography>
        Will add or remove the amount specified. Page 205 VtM Corebook
      </Typography>
    </Box>
  }>
    health_superficial: number
  </ListItemDialog>
);

const updateHealthAgg = (
  <ListItemDialog dialogContent={
    <Box>
      <Typography>
        A Number between -30 and 30
      </Typography>
      <Typography>
        Will add or remove the amount specified. Page 205 VtM Corebook
      </Typography>
    </Box>
  }>
    health_agg: number
  </ListItemDialog>
);

const updateStains = (
  <ListItemDialog dialogContent={
    <Box>
      <Typography>
        A Number between -15 and 15
      </Typography>
      <Typography>
        Will add or remove the amount of stains specified. 
        Page 239 VtM Corebook
      </Typography>
    </Box>
  }>
    stains: number
  </ListItemDialog>
);

const updateExp = (
  <ListItemDialog dialogContent={
    <Box>
      <Typography>
        A Number between -10000 and 10000
      </Typography>
      <Typography>
        Updates your Current experiance by the amount. 
        Positive numbers will also increase your total Experiance, while
        negative numbers will only reduce your current experiance.
      </Typography>
      <Typography>
        Page 130 VtM Corebook
      </Typography>
    </Box>
  }>
    exp: number
  </ListItemDialog>
);

const updateWillpower = (
  <ListItemDialog dialogContent={
    <Box>
      <Typography>
        A Number between -20 and 20
      </Typography>
      <Typography>
        Will add or remove the amount specified to your total Willpower. 
        This does not add or remove damage.
      </Typography>
      <Typography>
        Page 157 VtM Corebook
      </Typography>
    </Box>
  }>
    willpower: number
  </ListItemDialog>
);

const updateHealth = (
  <ListItemDialog dialogContent={
    <Box>
      <Typography>
        A Number between -30 and 30
      </Typography>
      <Typography>
        Will add or remove the amount specified to your total Health. 
        This does not add or remove damage.
      </Typography>
      <Typography>
        Page 127 VtM Corebook
      </Typography>
    </Box>
  }>
    health: number
  </ListItemDialog>
);

const updateHumanity = (
  <ListItemDialog dialogContent={
    <Box>
      <Typography>
        A Number between -15 and 15
      </Typography>
      <Typography>
        Will add or remove the amount specified to your total Humanity. 
        If you lose humanity this will also remove all stains.
      </Typography>
      <Typography>
        Page 236 VtM Corebook
      </Typography>
    </Box>
  }>
    humanity: number
  </ListItemDialog>
);

const updatePlayer = (
  <ListItemDialog dialogContent={
    <Box>
      <Typography>
        @mention the user this character belongs to.
      </Typography>
      <Typography sx={{pt: 2}}>
        This is for Storytellers who need to update another players Character.
      </Typography>
      <Typography>
        [ST only]
      </Typography>
    </Box>
  }>
    player: @mention
  </ListItemDialog>
);

const DiceV5Doc = [
  { // VtM Dice Roll
    summery: (
      <AccordionTitle>
        VtM Dice Roll
      </AccordionTitle>
    ),
    details: (
      <List>
        <ListSubheader>
          Command
        </ListSubheader>
        <ListItem>
          /v roll
        </ListItem>
        <ListSubheader>
          Required Arguments:
        </ListSubheader>
        <ListItemDialog dialogContent={
          <Box>
            <Typography>
              A number between 1 and 50. 
            </Typography>
            <Typography sx={{pt: 2}}>
              The base pool you will be rolling with, can be modified by other
              arguments, such as "speciality" or "blood_surge".
            </Typography>
            <Typography sx={{pt: 2}}>
              p118 VtM corebook.
            </Typography>
          </Box>
        }>
          pool: number
        </ListItemDialog>
        <ListSubheader>
          Optional Arguments:
        </ListSubheader>
        <ListItemDialog dialogContent={
          <Box>
            <Typography>
              A number between 0 and 5. Defaults to 0. 
            </Typography>
            <Typography sx={{pt: 2}}>
              This will replace X number of dice in your pool with hunger dice.
              If your hunger is higher then your total pool, all dice will be
              hunger dice.
            </Typography>
            <Typography sx={{pt: 2}}>
              p205 VtM corebook.
            </Typography>
          </Box>
        }>
          hunger: number
        </ListItemDialog>
        <Divider component="li" />
        <ListItemDialog dialogContent={
          <Box>
            <Typography>
              A number between 1 and 50. Defaults to 1.
            </Typography>
            <Typography sx={{pt: 2}}>
              For a dice to succeed it needs to roll a 6 or higher.
              The difficulty determines how many dice you need to succeed to
              win the roll.
            </Typography>
            <Typography sx={{pt: 2}}>
              Eg. Difficulty 4 needs at least 4 dice to roll a 6 or higher to
              win the roll.
            </Typography>
            <Typography sx={{pt: 2}}>
              p119 VtM Corebook.
            </Typography>
          </Box>
        }>
          difficulty: number
        </ListItemDialog>
        <Divider component="li" />
        <ListItemDialog dialogContent={
          <Box>
            <Typography>
              A number between 0 and 10.
            </Typography>
            <Typography sx={{pt: 2}}>
              Enter you current Blood Potency into this field. The bot will
              automatically add the extra dice to your pool and do a rouse
              check during your roll.
            </Typography>
            <Typography sx={{pt: 2}}>
              p218 VtM Corebook.
            </Typography>
          </Box>
        }>
          blood_surge: number
        </ListItemDialog>
        <Divider component="li" />
        <ListItemDialog dialogContent={
          <Box>
            <Typography>
              The name of the speciality you are using.
            </Typography>
            <Typography sx={{pt: 2}}>
              This will automatically add +1 die to your pool.
            </Typography>
            <Typography sx={{pt: 2}}>
              p159 VtM Corebook.
            </Typography>
          </Box>
        }>
          speciality: string
        </ListItemDialog>
        <Divider component="li" />
        <ListItemDialog dialogContent={
          <Box>
            <Typography>
              Select either the "No Reroll" or "Reroll" from the options.
            </Typography>
            <Typography sx={{pt: 2}}>
              This will perform a Rouse check during the roll.
              If "No Reroll" is selected a single rouse dice will be rolled
              and if it succeeds hunger will not increase.
              If "Reroll" is selected 2 dice will be used instead and
              if either succeed hunger will not increase.
            </Typography>
            <Typography sx={{pt: 2}}>
              p211 VtM Corebook.
            </Typography>
          </Box>
        }>
          rouse: option
        </ListItemDialog>
        <Divider component="li" />
        <ListItemDialog dialogContent={
          <Box>
            <Typography>
              The Name of the Character making the roll.
            </Typography>
            <Typography sx={{pt: 2}}>
              If you have a tracked character with the same name, this option
              will link the roll to that character.
              This means if your hunger increase or you use willpower, these
              values will update in your tracked character automatically.
            </Typography>
          </Box>
        }>
          character: string
        </ListItemDialog>
        <Divider component="li" />
        <ListItemDialog dialogContent={
          <Box>
            <Typography>
              True or False options.
            </Typography>
            <Typography sx={{pt: 2}}>
              If you are using a tracked character and have specified their
              Name in the "character" option, then the "hunger" option will be
              automatically filled in.
            </Typography>
          </Box>
        }>
          auto_hunger: option
        </ListItemDialog>
        <Divider component="li" />
        { notesArg }
        <ListSubheader>
          Description
        </ListSubheader>
        <ListItem>
          <Typography>
            Makes a dice roll following the standard Vampire: the Masquerade
            v5 rules.
          </Typography>
        </ListItem>
      </List>
    )
  },
  { // VtM Rouse Roll
    summery: (
      <AccordionTitle>
        VtM Rouse Check
      </AccordionTitle>
    ),
    details: (
      <List>
        <ListSubheader>
          Command
        </ListSubheader>
        <ListItem>
          /v rouse
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
        <ListItemDialog dialogContent={
          <Box>
            <Typography>
              Select either the "True" or "False" from the options.
            </Typography>
            <Typography sx={{pt: 2}}>
              If "True" is selected 2 dice will be used instead of one and
              if either succeed hunger will not increase.
            </Typography>
            <Typography sx={{pt: 2}}>
              p211 VtM Corebook.
            </Typography>
          </Box>
        }>
          reroll: option
        </ListItemDialog>
        <Divider component="li" />
        <ListItemDialog dialogContent={
          <Box>
            <Typography>
              The Name of the Character making the roll.
            </Typography>
            <Typography sx={{pt: 2}}>
              If you have a tracked character with the same name, this option
              will link the roll to that character.
              This means if your hunger increases your tracked 
              character will update automatically.
            </Typography>
          </Box>
        }>
          character: string
        </ListItemDialog>
        <Divider component="li" />
        { notesArg }
        <ListSubheader>
          Description
        </ListSubheader>
        <ListItem>
          <Typography>
            Rolls a rouse check to see if you increase hunger or not.
          </Typography>
        </ListItem>
      </List>
    )
  },
  { // VtM Resonance Roll
    summery: (
      <AccordionTitle>
        VtM Resonance Roll
      </AccordionTitle>
    ),
    details: (
      <List>
        <ListSubheader>
          Command
        </ListSubheader>
        <ListItem>
          /v resonance
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
        <ListItemDialog dialogContent={
          <Box>
            <Typography>
              Select one of the four resonance options.
            </Typography>
            <Typography sx={{pt: 2}}>
              This will ensure this resonance is used for the roll.
              Use this if you know what the resonance will be.
            </Typography>
          </Box>
        }>
          resonance: option
        </ListItemDialog>
        <Divider component="li" />
        <ListItemDialog dialogContent={
          <Box>
            <Typography>
              Select one of the four temperament options.
            </Typography>
            <Typography sx={{pt: 2}}>
              If used this will ensure the temperament is used for the roll.
              Use this if you know what the teperament will be.
            </Typography>
          </Box>
        }>
          temperament: option
        </ListItemDialog>
        <Divider component="li" />
        <ListItemDialog dialogContent={
          <Box>
            <Typography>
              Select one of the options.
            </Typography>
            <Typography sx={{pt: 2}}>
              This will ensure at least the selected temperament or greater
              is selected for the roll. Use this if you know the temperament
              will be at least a certain value.
            </Typography>
          </Box>
        }>
          min_temperament: option
        </ListItemDialog>
        <Divider component="li" />
        { notesArg }
        <ListSubheader>
          Description
        </ListSubheader>
        <ListItem>
          <Typography>
            Rolls for Resonance and Temperament. Follows random humors table
            on page 228 of VtM Corebook.
          </Typography>
        </ListItem>
      </List>
    )
  },
  { // Hunter the Reckoning Dice Roll
    summery: (
      <AccordionTitle>
        Hunter the Reckoning Dice Roll
      </AccordionTitle>
    ),
    details: (
      <List>
        <ListSubheader>
          Command
        </ListSubheader>
        <ListItem>
          /h hunter
        </ListItem>
        <ListSubheader>
          Required Arguments:
        </ListSubheader>
        <ListItemDialog dialogContent={
          <Box>
            <Typography>
              A number between 1 and 50.
            </Typography>
            <Typography sx={{pt: 2}}>
              This number will make up the base pool for your roll. 
              Usually made up of a Skill and an Attribute.
              It can be affected by other arguments such as Speciality.
            </Typography>
            <Typography sx={{pt: 2}}>
              Page 111 HtR Corebook
            </Typography>
          </Box>
        }>
          pool: number
        </ListItemDialog>
        <ListSubheader>
          Optional Arguments:
        </ListSubheader>
        <ListItemDialog dialogContent={
          <Box>
            <Typography>
              A number between 0 and 5. Defaults to 0
            </Typography>
            <Typography sx={{pt: 2}}>
              Adds an additional number of dice to your base pool but can lead
              to Overreach or Despair.
            </Typography>
            <Typography sx={{pt: 2}}>
              Page 127 HtR Corebook
            </Typography>
          </Box>
        }>
          desperation: number
        </ListItemDialog>
        <Divider component="li" />
        <ListItemDialog dialogContent={
          <Box>
            <Typography>
              A number between 1 and 50. Defaults to 1
            </Typography>
            <Typography sx={{pt: 2}}>
              A dice needs to roll a 6 or higher to be considered a successes.
              Difficulty is the number of successful dice you need in order top
              win a roll.
            </Typography>
            <Typography sx={{pt: 2}}>
              Page 113 HtR Corebook
            </Typography>
          </Box>
        }>
          difficulty: number
        </ListItemDialog>
        <Divider component="li" />
        <ListItemDialog dialogContent={
          <Box>
            <Typography>
              The name of the specialialty being used.
            </Typography>
            <Typography sx={{pt: 2}}>
              Adds +1 die to the base pool automatically. A speciality is Skill
              a character is particually adept at.
            </Typography>
            <Typography sx={{pt: 2}}>
              Page 61 HtR Corebook
            </Typography>
          </Box>
        }>
          speciality: string
        </ListItemDialog>
        <Divider component="li" />
        <ListItemDialog dialogContent={
          <Typography>The name of the Character that made the roll.</Typography>
        }>
          character: string
        </ListItemDialog>
        <Divider component="li" />
        { notesArg }
        <ListSubheader>
          Description
        </ListSubheader>
        <ListItem>
          <Box>
            <Typography>
              Makes a dice roll following the standard Hunter: the Reckoning
              v5 rules. 
            </Typography>
            <Typography>
              Page 110 of the HtR Corebook.
            </Typography>
          </Box>          
        </ListItem>
      </List>
    )
  },
  { // General Dice Roll
    summery: (
      <AccordionTitle>
        General Dice Roll
      </AccordionTitle>
    ),
    details: (
      <List>
        <ListSubheader>
          Command
        </ListSubheader>
        <ListItem>
          /v general or /h general
        </ListItem>
        <ListSubheader>
          Required Arguments:
        </ListSubheader>
        <ListItemDialog dialogContent={
          <Box>
            <Typography>
              A dice set is a string in the form of "(x)d(Y)" where (x) is the 
              number of dice to be rolled and (y) is the number of sides each 
              dice has.
            </Typography>
            <Typography sx={{pt: 2}}>
              Eg. if we want to roll six, 10sided dice we would type "6d10" in
              the argument field without the quotes.
            </Typography>
          </Box>
        }>
          dice_set_01: string
        </ListItemDialog>
        <ListSubheader>
          Optional Arguments:
        </ListSubheader>
        <ListItemDialog dialogContent={
          <Box>
            <Typography>
              Adds or Removes the number entered from the total of the roll.
            </Typography>
          </Box>
        }>
          modifier: number
        </ListItemDialog>
        <Divider component="li" />
        <ListItemDialog dialogContent={
          <Box>
            <Typography>
              A dice set is a string in the form of "(x)d(Y)" where (x) is the 
              number of dice to be rolled and (y) is the number of sides each 
              dice has.
            </Typography>
            <Typography sx={{pt: 2}}>
              Eg. if we want to roll six, 10sided dice we would type "6d10" in
              the argument field without the quotes.
            </Typography>
          </Box>
        }>
          dice_set_XX: number
        </ListItemDialog>
        <Divider component="li" />
        <ListItemDialog dialogContent={
          <Box>
            <Typography>
              The total amount the dice should equal for the roll to pass.
            </Typography>
          </Box>
        }>
          difficulty: number
        </ListItemDialog>
        <Divider component="li" />
        { notesArg }        
        <ListSubheader>
          Description
        </ListSubheader>
        <ListItem>
          <Box>
            <Typography>
              Rolls a number of dice sets that are specified by you.
            </Typography>
          </Box>          
        </ListItem>
      </List>
    )
  },
]

const TrackerV5Doc = [
  { // New Vampire Tracker
    summery: (
      <AccordionTitle>
        New Vampire Tracker
      </AccordionTitle>
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
        { nameArg }
        <Divider component="li" />
        { setWillpower }
        <Divider component="li" />
        { setHealth }
        <Divider component="li" />
        { setHumanity }
        <ListSubheader>
          Optional Arguments:
        </ListSubheader>
        { setHunger }
        <Divider component="li" />
        { setExp }
        <Divider component="li" />
        { setWillpowerSup }
        <Divider component="li" />
        { setWillpowerAgg }
        <Divider component="li" />
        { setHealthSup }
        <Divider component="li" />
        { setHealthAgg }
        <Divider component="li" />
        { setStains }
        <Divider component="li" />
        { notesArg }
        <Divider component="li" />
        { setHex }
        <Divider component="li" />
        { setImage }      
        <ListSubheader>
          Description
        </ListSubheader>
        <ListItem>
          <Box>
            <Typography>
              Creates a new Vampire Character tracker for you with the given
              values.
            </Typography>
          </Box>          
        </ListItem>
      </List>
    )
  },
  { // Update Vampire Tracker
    summery: (
      <AccordionTitle>
        Update Vampire Tracker
      </AccordionTitle>
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
        { nameArg }
        <ListSubheader>
          Optional Arguments:
        </ListSubheader>
        { updateHunger }
        <Divider component="li" />
        { updateWillpowerSup }    
        <Divider component="li" />
        { updateHealthSup }
        <Divider component="li" />
        { updateWillpowerAgg }
        <Divider component="li" />
        { updateHealthAgg }
        <Divider component="li" />
        { updateStains }
        <Divider component="li" />
        { updateExp }
        <Divider component="li" />
        { updateWillpower }
        <Divider component="li" />
        { updateHealth }
        <Divider component="li" />
        { updateHumanity }
        <Divider component="li" />
        { updatePlayer }
        <Divider component="li" />
        { notesArg }    
        <ListSubheader>
          Description
        </ListSubheader>
        <ListItem>
          <Box>
            <Typography>
              Updates your Character stats using plus or minus values.
            </Typography>
            <Typography>
              Eg. typing the value of 2 in the hunger argument will increase
              Hunger by 2 while typing the value -3 will reduce Hunger by three.
            </Typography>
          </Box>          
        </ListItem>
      </List>
    )
  },
  { // Set Vampire Tracker
    summery: (
      <AccordionTitle>
        Set Vampire Tracker
      </AccordionTitle>
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
        { nameArg }
        <ListSubheader>
          Optional Arguments:
        </ListSubheader>        
        { setWillpower }
        <Divider component="li" />
        { setHealth }
        <Divider component="li" />
        { setHumanity }
        <Divider component="li" />
        { setHunger }       
        <Divider component="li" />
        { setExp }
        <Divider component="li" />
        { setWillpowerSup } 
        <Divider component="li" />
        { setWillpowerAgg } 
        <Divider component="li" />
        { setHealthSup }     
        <Divider component="li" />
        { setHealthAgg }
        <Divider component="li" />
        { setStains }             
        <Divider component="li" />
        { notesArg }
        <Divider component="li" />
        { setNameChange }
        <Divider component="li" />
        { setHex }
        <Divider component="li" />
        { setImage }
        <ListSubheader>
          Description
        </ListSubheader>
        <ListItem>
          <Box>
            <Typography>
              Sets your Character stats using Absolute values.
            </Typography>
            <Typography>
              Eg. typing the value of 3 in the hunger argument will set
              Hunger to three regardless of what it was before.
            </Typography>
          </Box>          
        </ListItem>
      </List>
    )
  },
  { // New Hunter Tracker
    summery: (
      <AccordionTitle>
        New Hunter Tracker
      </AccordionTitle>
    ),
    details: (
      <List>
        <ListSubheader>
          Command
        </ListSubheader>
        <ListItem>
          /hunter new
        </ListItem>
        <ListSubheader>
          Required Arguments:
        </ListSubheader>
        { nameArg }
        <Divider component="li" />
        { setWillpower }
        <Divider component="li" />
        { setHealth }
        <ListSubheader>
          Optional Arguments:
        </ListSubheader>
        { setDesperation }
        <Divider component="li" />
        { setDanger }
        <Divider component="li" />
        { setDespair }
        <Divider component="li" />
        { setExp }
        <Divider component="li" />
        { setWillpowerSup }
        <Divider component="li" />
        { setWillpowerAgg }
        <Divider component="li" />
        { setHealthSup }
        <Divider component="li" />
        { setHealthAgg }
        <Divider component="li" />
        { notesArg }
        <Divider component="li" />
        { setHex }
        <Divider component="li" />
        { setImage }      
        <ListSubheader>
          Description
        </ListSubheader>
        <ListItem>
          <Box>
            <Typography>
              Creates a new Hunter Character tracker for you with the given
              values.
            </Typography>
          </Box>          
        </ListItem>
      </List>
    )
  },
  { // Update Hunter Tracker
    summery: (
      <AccordionTitle>
        Update Hunter Tracker
      </AccordionTitle>
    ),
    details: (
      <List>
        <ListSubheader>
          Command
        </ListSubheader>
        <ListItem>
          /hunter update
        </ListItem>
        <ListSubheader>
          Required Arguments:
        </ListSubheader>
        { nameArg }
        <ListSubheader>
          Optional Arguments:
        </ListSubheader>
        { updateDesperation }
        <Divider component="li" />
        { updateDanger }
        <Divider component="li" />
        { setDespair }
        <Divider component="li" />
        { updateWillpowerSup }    
        <Divider component="li" />
        { updateHealthSup }
        <Divider component="li" />
        { updateWillpowerAgg }
        <Divider component="li" />
        { updateHealthAgg }
        <Divider component="li" />
        { updateExp }
        <Divider component="li" />
        { updateWillpower }
        <Divider component="li" />
        { updateHealth }
        <Divider component="li" />
        { updatePlayer }
        <Divider component="li" />
        { notesArg }    
        <ListSubheader>
          Description
        </ListSubheader>
        <ListItem>
          <Box>
            <Typography>
              Updates your Character stats using plus or minus values.
            </Typography>
            <Typography>
              Eg. typing the value of 2 in the danger argument will increase
              Danger by 2 while typing the value -3 will reduce Danger by three.
            </Typography>
          </Box>          
        </ListItem>
      </List>
    )
  },
  { // Set Hunter Tracker
    summery: (
      <AccordionTitle>
        Set Hunter Tracker
      </AccordionTitle>
    ),
    details: (
      <List>
        <ListSubheader>
          Command
        </ListSubheader>
        <ListItem>
          /hunter set
        </ListItem>
        <ListSubheader>
          Required Arguments:
        </ListSubheader>
        { nameArg }
        <ListSubheader>
          Optional Arguments:
        </ListSubheader>        
        { setWillpower }
        <Divider component="li" />
        { setHealth }
        <Divider component="li" />
        { setDesperation }
        <Divider component="li" />
        { setDanger }       
        <Divider component="li" />
        { setDespair }       
        <Divider component="li" />
        { setExp }
        <Divider component="li" />
        { setWillpowerSup } 
        <Divider component="li" />
        { setWillpowerAgg } 
        <Divider component="li" />
        { setHealthSup }     
        <Divider component="li" />
        { setHealthAgg }
        <Divider component="li" />
        { notesArg }
        <Divider component="li" />
        { setNameChange }
        <Divider component="li" />
        { setHex }
        <Divider component="li" />
        { setImage }
        <ListSubheader>
          Description
        </ListSubheader>
        <ListItem>
          <Box>
            <Typography>
              Sets your Character stats using Absolute values.
            </Typography>
            <Typography>
              Eg. typing the value of 3 in the Danger argument will set
              Danger to three regardless of what it was before.
            </Typography>
          </Box>          
        </ListItem>
      </List>
    )
  },
  { // New Mortal Tracker
    summery: (
      <AccordionTitle>
        New Mortal Tracker
      </AccordionTitle>
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
        { nameArg }
        <Divider component="li" />
        { setWillpower }
        <Divider component="li" />
        { setHealth }
        <Divider component="li" />
        { setHumanity }
        <ListSubheader>
          Optional Arguments:
        </ListSubheader>        
        { setExp }   
        <Divider component="li" />
        { setWillpowerSup }
        <Divider component="li" />
        { setWillpowerAgg }
        <Divider component="li" />
        { setHealthSup }
        <Divider component="li" />
        { setHealthAgg }
        <Divider component="li" />
        { setStains }
        <Divider component="li" />
        { notesArg }
        <Divider component="li" />
        { setHex }
        <Divider component="li" />
        { setImage }
        <ListSubheader>
          Description
        </ListSubheader>
        <ListItem>
          <Box>
            <Typography>
              Creates a new Mortal character using the provided values.
            </Typography>
          </Box>          
        </ListItem>
      </List>
    )
  },
  { // Update Mortal Tracker
    summery: (
      <AccordionTitle>
        Update Mortal Tracker
      </AccordionTitle>
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
        { nameArg }
        <ListSubheader>
          Optional Arguments:
        </ListSubheader>
        { updateWillpowerSup }       
        <Divider component="li" />
        { updateHealthSup }
        <Divider component="li" />
        { updateWillpowerAgg }
        <Divider component="li" />
        { updateHealthAgg }
        <Divider component="li" />
        { updateStains }
        <Divider component="li" />
        { updateExp }
        <Divider component="li" />
        { updateWillpower }
        <Divider component="li" />
        { updateHealth }
        <Divider component="li" />
        { updateHumanity }
        <Divider component="li" />
        { updatePlayer }
        <Divider component="li" />
        { notesArg }
        <ListSubheader>
          Description
        </ListSubheader>
        <ListItem>
          <Box>
            <Typography>
              Updates your Character stats using plus or minus values.
            </Typography>
            <Typography>
              Eg. typing the value of 3 in the humanity argument will increase
              Humanity by three levels, while typing the value -2 will reduce
              Humanity by negative two levels.
            </Typography>
          </Box>          
        </ListItem>
      </List>
    )
  },
  { // Set Mortal Tracker
    summery: (
      <AccordionTitle>
        Set Mortal Tracker
      </AccordionTitle>
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
        { nameArg }
        <ListSubheader>
          Optional Arguments:
        </ListSubheader>        
        { setWillpower }
        <Divider component="li" />
        { setHealth }
        <Divider component="li" />
        { setHumanity }       
        <Divider component="li" />
        { setExp }
        <Divider component="li" />
        { setWillpowerSup }
        <Divider component="li" />
        { setWillpowerAgg }
        <Divider component="li" />
        { setHealthSup }     
        <Divider component="li" />
        { setHealthAgg }
        <Divider component="li" />
        { setStains }              
        <Divider component="li" />
        { notesArg }
        <Divider component="li" />
        { setNameChange }
        <Divider component="li" />
        { setHex }
        <Divider component="li" />
        { setImage }
        <ListSubheader>
          Description
        </ListSubheader>
        <ListItem>
          <Box>
            <Typography>
              Sets your Character stats using Absolute values.
            </Typography>
            <Typography>
              Eg. typing the value of 3 in the humanity argument will set
              Humanity to three regardless of what it was before.
            </Typography>
          </Box>          
        </ListItem>
      </List>
    )
  },
  { // Lookup Character
    summery: (
      <AccordionTitle>
        Lookup Character
      </AccordionTitle>
    ),
    details: (
      <List>
        <ListSubheader>
          Command
        </ListSubheader>
        <ListItem>
          /character find
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
        <ListItemDialog dialogContent={
          <Typography>
            Displays the change history for each update made, including notes.
          </Typography>
        }>
          history: option
        </ListItemDialog>
        <Divider component="li" />
        <ListItemDialog dialogContent={
          <Box>
            <Typography>@mention the user to lookup</Typography>
            <Typography sx={{pt: 2}}>
              This command can only be used by a Storyteller or Administrator.
              If you are trying to find your own characters, do not use this
              argument.
            </Typography>
          </Box>
        }>
          player: @user
        </ListItemDialog>
        <ListSubheader>
          Description
        </ListSubheader>
        <ListItem>
          <Box>
            <Typography>
              Returns a list of your characters and allows you to see
              their stats.
            </Typography>
            <Typography>
              If used in DMs with the bot it will return every character from
              all servers you have. If used in a server it will only return a 
              list of characters you have from that server.
            </Typography>
            <Typography sx={{pt: 2}}>
              Storytellers may use the 'player' argument to lookup other
              players characters on their servers.
            </Typography>
          </Box>          
        </ListItem>
      </List>
    )
  },
  { // Delete Character
    summery: (
      <AccordionTitle>
        Delete Character
      </AccordionTitle>
    ),
    details: (
      <List>
        <ListSubheader>
          Command
        </ListSubheader>
        <ListItem>
          /character delete
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
        <ListItemDialog dialogContent={
          <Box>
            <Typography>@mention the user to lookup</Typography>
            <Typography sx={{pt: 2}}>
              This command can only be used by a Storyteller or Administrator.
              If you are trying to find your own characters, do not use this
              argument.
            </Typography>
          </Box>
        }>
          player: @user
        </ListItemDialog>
        <ListSubheader>
          Description
        </ListSubheader>
        <ListItem>
          <Box>
            <Typography>
              Allows you to delete one or more of your Characters from a list.
            </Typography>
            <Typography>
              If used in DMs with the bot you will see a list of every
              Character you have. If used in a server you will only see a list
              of characters from that server.
            </Typography>
            <Typography sx={{pt: 2}}>
              Storytellers may use the 'player' argument to delete other
              characters from their server. Note: this won't actually delete
              their character but merely disconnect it from your server.
            </Typography>
          </Box>          
        </ListItem>
      </List>
    )
  },
  { // Delete Character
    summery: (
      <AccordionTitle>
        Default Character
      </AccordionTitle>
    ),
    details: (
      <List>
        <ListSubheader>
          Command
        </ListSubheader>
        <ListItem>
          /character default
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
        <ListItemDialog dialogContent={
          <Box>
            <Typography>Name of the character to link</Typography>
            <Typography sx={{pt: 2}}>
              A character must have already been made in the tracker.
            </Typography>
          </Box>
        }>
          name: string
        </ListItemDialog>         
        <ListItemDialog dialogContent={
          <Box>
            <Typography>Enables Auto Hunger for dice rolls</Typography>
            <Typography sx={{pt: 2}}>
              Default is False. Setting to True will add hunger dice
              automatically to all rolls where a linked character has been used.
              This can be overridden by using the `auto_hunger`: false option
              in dice roll commands.
            </Typography>
          </Box>
        }>
          auto_hunger: True/False
        </ListItemDialog>              
        <ListItemDialog dialogContent={
          <Box>
            <Typography>Turns off the default character if used.</Typography>
          </Box>
        }>
          disable: True/False
        </ListItemDialog>
        <ListSubheader>
          Description
        </ListSubheader>
        <ListItem>
          <Box>
            <Typography>
              Links a character as your server default.
            </Typography>
            <Typography>
              This will be used for all dice rolls where the `character` option
              is not used. It will automatically add your default character.
              You can override this by specifing another character using the
              `character` option on dice rolls. Or you can disable this
              functionality by using the `disable` option if you do not like it.
            </Typography>
            <Typography sx={{pt: 2}}>
              Requires [Fledgling Supporter] status or greater to use.
            </Typography>
          </Box>          
        </ListItem>
      </List>
    )
  },
  { // Set Tracker Channel
    summery: (
      <AccordionTitle>
        Set Tracker Channel
      </AccordionTitle>
    ),
    details: (
      <List>
        <ListSubheader>
          Command
        </ListSubheader>
        <ListItem>
          /server tracker
        </ListItem>
        <ListSubheader>
          Required Arguments:
        </ListSubheader>
        <ListItemDialog dialogContent={
          <Typography>#mention the Channel to be used.</Typography>
        }>
          channel: #channel
        </ListItemDialog>
        <ListSubheader>
          Optional Arguments:
        </ListSubheader> 
        <ListItem>
          None
        </ListItem>
        <ListSubheader>
          Description
        </ListSubheader>
        <ListItem>
          <Box>
            <Typography>
              You must be a server "Administrator" or have a role that
              has been added as a Storyteller role using the
              '/tracker storytellers' command, to use this command.
            </Typography>
            <Typography sx={{pt: 2}}>
              This sets a channel to display live character updates to so 
              Storytellers can see any character updates as they happen.
              It is highly recommended to make this channel private to prevent
              Metagaming
            </Typography>
            <Typography sx={{pt: 2}}>
              The bot will require "View Channel", "Send Messages" and
              "Embed Links" in this channel to function.
            </Typography>
          </Box>          
        </ListItem>
      </List>
    )
  },
  { // Set Storyteller Roles
    summery: (
      <AccordionTitle>
        Set Storyteller Roles
      </AccordionTitle>
    ),
    details: (
      <List>
        <ListSubheader>
          Command
        </ListSubheader>
        <ListItem>
          /server storytellers
        </ListItem>
        <ListSubheader>
          Required Arguments:
        </ListSubheader>
        <ListItemDialog dialogContent={
          <Box>
            <Typography>
              @mention the role to be added
            </Typography>
          </Box>
        }>
          role: @role
        </ListItemDialog>
        <ListSubheader>
          Optional Arguments:
        </ListSubheader> 
        <ListItem>
          None
        </ListItem>
        <ListSubheader>
          Description
        </ListSubheader>
        <ListItem>
          <Box>
            <Typography>
              Requires "Administrator" permission to use.
            </Typography>
            <Typography>
              Lets the bot know which roles in the server are "Storyteller"
              roles.
            </Typography>
            <Typography>
              By default only users with "Administrator" permissions can
              lookup and delete other players characters. Any role added
              using this command will also be granted those privileges.
            </Typography>
          </Box>          
        </ListItem>
      </List>
    )
  },
]

export { DiceV5Doc, TrackerV5Doc };