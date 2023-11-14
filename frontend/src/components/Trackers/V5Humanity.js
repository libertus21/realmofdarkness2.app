import { Typography, Rating, Button } from "@mui/material";
import Grid from '@mui/material/Unstable_Grid2';
import CircleIcon from '@mui/icons-material/Circle';
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';
import NotInterestedOutlinedIcon from '@mui/icons-material/NotInterestedOutlined';
import ExpandMoreOutlinedIcon from '@mui/icons-material/ExpandMoreOutlined';
import ExpandLessOutlinedIcon from '@mui/icons-material/ExpandLessOutlined';

const fontSize = 'inherit'

const FilledHumanityIcon =
{
  icon: <CircleIcon style={{ color: '#ab074e' }} fontSize={fontSize} />,
  label: 'Filled Humanity'
}

const EmptyHumanityIcon =
{
  icon: <CircleOutlinedIcon color='disabled' fontSize={fontSize} />,
  label: 'Empty Humanity'
}

const StainIcon =
{
  icon: <NotInterestedOutlinedIcon style={{ color: '#a69912' }} fontSize={fontSize} />,
  label: 'Stains'
}

export default function V5Humanity(props) {
  const { humanity, stains, justifyContent, textAlign, open, onOpen, readOnly } = props;
  let humanityCount = humanity;
  let emptyCount = (10 - humanity - stains);

  const bars = [];
  for (let index = 0; index < 2; index++) {
    const bar = {};
    for (let i = 0; i < 5; i++) {
      let icon = StainIcon;
      if (humanityCount) {
        icon = FilledHumanityIcon;
        humanityCount--;
      }
      else if (emptyCount) {
        icon = EmptyHumanityIcon;
        emptyCount--;
      }
      bar[i + 1] = icon;
    }

    bars.push(
      <Grid key={index} sx={{ mt: 0.15, mb: -0.15 }}>
        <Rating
          name={`Humanity Bar ${index + 1}`}
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

  function openPanelButton() {
    if (readOnly) return (
      <Grid xs={12} padding={0.6}>
        <Typography>Hunger</Typography>
      </Grid>
    )
    let render = <Typography>Humanity</Typography>;
    const button = (
      open ? <ExpandLessOutlinedIcon /> : <ExpandMoreOutlinedIcon />
    )
    const color = open ? 'primary' : 'inherit';

    if (onOpen) render = (
      <Button
        onClick={onOpen}
        size='small'
        endIcon={button}
        color={color}
      >
        <Typography sx={{ textTransform: "none" }}>Humanity</Typography>
      </Button>
    )
    return render;
  }

  return (
    <Grid
      container
      direction='column'
      justifyContent={justifyContent}
      alignItems={textAlign}
      textAlign={textAlign}
    >
      <Grid xs={12}>
        {openPanelButton()}
      </Grid>
      <Grid
        container
        columnSpacing={1}
        direction="row"
        justifyContent={justifyContent}
      >
        {bars}
      </Grid>
    </Grid>
  )
}