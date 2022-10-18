import { Rating, Grid } from "@mui/material";
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';
import CircleIcon from '@mui/icons-material/Circle';


function FilledIcon(props)
{
  const { ...other } = props;
  return (<CircleIcon fontSize="inherit" {...other} />)
}

function EmptyIcon(props)
{
  const { ...other } = props;
  return (<CircleOutlinedIcon fontSize="inherit" {...other} />)
}

export default function MageQuintTracker(props)
{
  const { tracker } = props;
  const bars = [];
  
  let quintCount = tracker.quintessence;  
  let paradoxCount = tracker.paradox;
  let emptyCount = 20 - (quintCount + paradoxCount);
  let maxCount = 20;

  for (let index = 0; index <= 4; index++)
  { // Need 1 bar for every 5 points
    const bar = {};
    for (let i = 0; maxCount > 0 && i < 5; i++, maxCount--)
    {
      let icon = undefined;
      if (quintCount > 0) 
      {
        icon = <FilledIcon sx={{color: '#ab074e'}} />;
        quintCount--;
      }
      else if (emptyCount > 0)
      {
        icon = <EmptyIcon color='disabled' />;
        emptyCount--;
      }
      else if (paradoxCount > 0)
      {
        icon = <FilledIcon sx={{color: '#a1861b'}} />;
        paradoxCount--;
      }
      bar[i+1] = icon;
    }
    
    bars.push(
      <Grid item key={index} sx={{mt: 0.15, mb: -0.15}}>        
        <Rating 
          name={`Quintessence - Paradox Bar ${index+1}`}
          readOnly
          max={bar.length}
          IconContainerComponent={(props) => {
            const { value, ...other } = props;
            return bar[value] ? <span {...other}>{bar[value]}</span> : undefined
          }}
          defaultValue={5}
          size='small'
        />
      </Grid>
    );
  }

  return (
    <Grid 
      container 
      columnSpacing={1.5}
      direction="row"
      justifyContent='flex-start'
      alignItems='center'
      sx={{ml: -1.8}}
    >
      {bars}
    </Grid>
  )
}