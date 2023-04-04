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
        This has no mechanical effect on the Roll or Tracker itself and is 
        purely for documentation purposes.
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
        A Number between 7 and 15
      </Typography>
      <Typography>
        The Total Health of your Character. Should only be changed in
        exceptional conditions.
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
        A Number between 1 and 10
      </Typography>
      <Typography>
        The total Willpower a Character has.
      </Typography>
    </Box>
  }>
    willpower: number
  </ListItemDialog>
);

const setBlood = (
  <ListItemDialog dialogContent={
    <Box>
      <Typography>
        A Number between 1 and 100
      </Typography>
      <Typography>
        The Total blood of this vampire. This value is dictated by a vampires
        Generation.
      </Typography>
      <Typography sx={{pt: 2}}>
        p121 VtM Corebook.
      </Typography>
    </Box>
  }>
    blood: number
  </ListItemDialog>
);

const setMorality = (
  <ListItemDialog dialogContent={
    <Box>
      <Typography>
        A Number between 0 and 10
      </Typography>
      <Typography>
        The Total Humanity or Path value this Character has.
        This value is determind by a Characters Virtues.
        For Humanity this is their Conscience + Self Control
      </Typography>
      <Typography sx={{pt: 2}}>
        p119 VtM Corebook.
      </Typography>
    </Box>
  }>
    morality: number
  </ListItemDialog>
);

const setHumanity = (
  <ListItemDialog dialogContent={
    <Box>
      <Typography>
        A Number between 0 and 10
      </Typography>
      <Typography>
        The Total Humanity value this Character has.
        This value is determind by their Conscience + Self Control.
      </Typography>
      <Typography sx={{pt: 2}}>
        p119 VtM Corebook.
      </Typography>
    </Box>
  }>
    humanity: number
  </ListItemDialog>
);

const setMoralityName = (
  <ListItemDialog dialogContent={
    <Box>
      <Typography>
        Select the name of the Path your Character follows.
      </Typography>
      <Typography>
        Paths are an alternative to Humanity. They are found starting on
        page 316 of the VtM corebook.
      </Typography>
    </Box>
  }>
    morality_name: option
  </ListItemDialog>
);

const setExp = (
  <ListItemDialog dialogContent={
    <Box>
      <Typography>
        A Number between 0 and 1000
      </Typography>
      <Typography>
        The total Experiance a Character has. Page 122 VtM Corebook
      </Typography>
    </Box>
  }>
    exp: number
  </ListItemDialog>
);

const setBashing = (
  <ListItemDialog dialogContent={
    <Box>
      <Typography>
        A Number between 0 and 1000
      </Typography>
      <Typography>
        The total Experiance a Character has. Page 122 VtM Corebook
      </Typography>
    </Box>
  }>
    exp: number
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
    player: number
  </ListItemDialog>
);

const Dice20thDoc = [
  { // Dice Roll
    summery: (
      <AccordionTitle>
        Dice Roll
      </AccordionTitle>
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
          <Box>
            <Typography>
              A number between 1 and 50. 
            </Typography>
            <Typography sx={{pt: 2}}>
              The base pool you will be rolling with.
            </Typography>
            <Typography sx={{pt: 2}}>
              p247 VtM corebook
            </Typography>
          </Box>
        }>
          pool: number
        </ListItemDialog>
        <ListItemDialog dialogContent={
          <Box>
            <Typography>
              A number between 2 and 10. 
            </Typography>
            <Typography sx={{pt: 2}}>
              The difficulty of the roll. This sets the number a dice will need
              to meet or exceed to be considered a success.
            </Typography>
            <Typography sx={{pt: 2}}>
              p249 VtM Corebook.
            </Typography>
          </Box>
        }>
          difficulty: number
        </ListItemDialog>
        <ListSubheader>
          Optional Arguments:
        </ListSubheader>
        <ListItemDialog dialogContent={
          <Box>
            <Typography>
              Select True of False. 
            </Typography>
            <Typography sx={{pt: 2}}>
              Selecting True will add one automatic success to your roll.
              If you have added a tracked character in the character option
              this will also automatically -1 willpower from your character.
            </Typography>
            <Typography sx={{pt: 2}}>
              p250 VtM Corebook.
            </Typography>
          </Box>
        }>
          willpower: True/False
        </ListItemDialog>
        <Divider component="li" />
        <ListItemDialog dialogContent={
          <Box>
            <Typography>
              A number between -20 and 20.
            </Typography>
            <Typography sx={{pt: 2}}>
              Adds a number of automatic successes to this roll. If a negative
              number is used it will take away a number of successes.
            </Typography>
            <Typography sx={{pt: 2}}>
              p250 VtM Corebook.
            </Typography>
          </Box>
        }>
          modifier: number
        </ListItemDialog>
        <Divider component="li" />
        <ListItemDialog dialogContent={
          <Box>
            <Typography>
              The name of the speciality being used.
            </Typography>
            <Typography sx={{pt: 2}}>
              Using this option will make any 10s rolled count as two successes
              instead of the normal 1. It will also print the name of the
              Speciality for those to see.
            </Typography>
            <Typography sx={{pt: 2}}>
              p96 VtM Corebook.
            </Typography>
          </Box>
        }>
          speciality: string
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
              A number between 1 and 50.
            </Typography>
            <Typography sx={{pt: 2}}>
              Replaces x number of dice in your pool with Nightmare dice.
              Rolling a 10 on a on a Nightmare dice will increase a players
              Nightmare by 1.
            </Typography>
            <Typography sx={{pt: 2}}>
              p274 CtD Corebook.
            </Typography>
          </Box>
        }>
          nightmare: number
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
              This means if you use the willpower option in this roll your
              tracked character will automatically lose a willpower.
            </Typography>
          </Box>
        }>
          character: string
        </ListItemDialog>
        <Divider component="li" />
        <ListItemDialog dialogContent={
          <Box>
            <Typography>
              True or False option.
            </Typography>
            <Typography sx={{pt: 2}}>
              Selecting True, will stop any 1s rolled from subtracting a 
              success from your total and ensuring no botch outcome takes place.
            </Typography>
          </Box>
        }>
          no_botch: True/False
        </ListItemDialog>
        <Divider component="li" />
        { notesArg }
        <ListSubheader>
          Description
        </ListSubheader>
        <ListItem>
          <Typography>
            Makes a dice roll following the standard 20th edition ruleset.
          </Typography>
        </ListItem>
      </List>
    )
  },
  {
    summery: (
      <AccordionTitle>
        Initiative Roll
      </AccordionTitle>
    ),
    details: (
      <List>
        <ListSubheader>
          Command
        </ListSubheader>
        <ListItem>
          /dice initiative
        </ListItem>
        <ListSubheader>
          Required Arguments:
        </ListSubheader>
        <ListItemDialog dialogContent={
          <Box>
            <Typography>
              A number between 0 and 50. 
            </Typography>
            <Typography sx={{pt: 2}}>
              Your Dexterity + Wits. This will be added to a 1d10 dice roll
              to determine your total Initiative rating.
            </Typography>
            <Typography sx={{pt: 2}}>
              For a more advanced Initative Tracker see the Initative Tracker
              Commands.
            </Typography>
            <Typography sx={{pt: 2}}>
              p271 VtM corebook
            </Typography>
          </Box>
        }>
          dexterity_wits: number
        </ListItemDialog>
        <ListSubheader>
          Optional Arguments:
        </ListSubheader>
        <ListItemDialog dialogContent={
          <Box>
            <Typography>
              The Name of the Character making the roll.
            </Typography>
            <Typography sx={{pt: 2}}>
              This will just print the value on the roll output.
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
            Initiative roll using a Characters Dexterity + Wits
          </Typography>
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
          /dice general
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

const Tracker20thDoc = [
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
        { setBlood }
        <Divider component="li" />
        { setMorality }
        <ListSubheader>
          Optional Arguments:
        </ListSubheader>
        { setMoralityName }
        <Divider component="li" />
        { setExp }
        <Divider component="li" />
        { setHealth }
        <Divider component="li" />
        { setBashing }
        <Divider component="li" />
        { setLethal }
        <Divider component="li" />
        { setAgg }
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
        { updateWillpower }
        <Divider component="li" />
        { updateBlood }    
        <Divider component="li" />
        { updateMorality }
        <Divider component="li" />
        { updateExp }
        <Divider component="li" />
        { updateHealth }
        <Divider component="li" />
        { updateBashing }
        <Divider component="li" />
        { updateLethal }
        <Divider component="li" />
        { updateAgg }
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
              Eg. typing the value of 2 in the willpower argument will increase
              Willpower by 2 while typing the value -3 will reduce Willpower
              by three.
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
  { // Set Tracker Storyteller Roles
    summery: (
      <AccordionTitle>
        Set Tracker Storyteller Roles
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