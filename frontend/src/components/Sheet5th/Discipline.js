import { Typography, Rating } from "@mui/material";
import { Accordion , AccordionDetails, AccordionSummary } from "@mui/material";import Grid from '@mui/material/Unstable_Grid2';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useState } from 'react';
import CircleIcon from '@mui/icons-material/Circle';
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';

export default function Discipline(props)
{
  const [expanded, setExpanded] = useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <Grid minWidth='300px'>
      <Accordion 
        expanded={expanded === 'panel1'} 
        onChange={handleChange('panel1')}
        elevation={0}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Grid 
            container 
            direction="row"
            justifyContent="center"
            alignItems="center"
          >            
            <Grid>            
              <Typography>
                {props.name}
              </Typography>
            </Grid>
            <Grid paddingRight={2}>            
              <Rating 
                icon={<CircleIcon fontSize="inherit" />} 
                emptyIcon={<CircleOutlinedIcon fontSize="inherit" />}            
                sx={{
                  paddingTop: 0.5,
                  '& .MuiRating-iconFilled': {color: '#ab074e'},
                  '& .MuiRating-iconHover': {color: '#ff3d47'},
                }}
              />
            </Grid>
          </Grid>
        </AccordionSummary>
        <AccordionDetails>
            Some details
        </AccordionDetails>
      </Accordion>
    </Grid>
  )
}