import { Typography, Rating, Box, Grid } from "@mui/material";
import CircleIcon from '@mui/icons-material/Circle';
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';
import NotInterestedOutlinedIcon from '@mui/icons-material/NotInterestedOutlined';

const fontSize = 'inherit'

const FilledHumanityIcon =
{
  icon: <CircleIcon style={{color: '#ab074e'}} fontSize={fontSize} />,
  label: 'Filled Humanity'
}

const EmptyHumanityIcon =
{
  icon: <CircleOutlinedIcon color='disabled' fontSize={fontSize} />,
  label: 'Empty Humanity'
}

const StainIcon =
{
  icon: <NotInterestedOutlinedIcon style={{color: '#a69912'}} fontSize={fontSize} />,
  label: 'Stains'
}

export default function V5Humanity(props) 
{
  const { humanity } = props;
  let humanityCount = humanity.current;
  let emptyCount = (10 - humanity.current - humanity.stains);

  const bars = [];
  for (let index = 0; index < 2; index++)
  {
    const bar = {};
    for (let i = 0; i < 5; i++)
    {
      let icon = StainIcon;
      if (humanityCount)
      {
        icon = FilledHumanityIcon;
        humanityCount--;
      }
      else if (emptyCount)
      {
        icon = EmptyHumanityIcon;
        emptyCount--;
      }
      bar[i+1] = icon;
    }

    bars.push(
      <Grid item key={index} sx={{mt: 0.15, mb: -0.15}}>        
        <Rating 
          name={`Humanity Bar ${index+1}`}
          readOnly
          IconContainerComponent={(props) => {
            const { value, ...other } = props;
            return bar[value] ? <span {...other}>{bar[value].icon}</span> : undefined
          }}
          defaultValue={5}
          bar={bar}
          size='small'
        />
      </Grid>
    )
  }

  return (
    <Box>      
      <Typography>Humanity {humanity.current} {humanity.stains ? `- Stains ${humanity.stains}` : ''}</Typography>
      <Grid      
        container 
        columnSpacing={1}
        direction="row"
        justifyContent='flex-start'
        alignItems='center'
        sx={{ml: -0.9}}
      >
        {bars}
      </Grid>
    </Box>
  )
}