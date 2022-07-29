import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export default function CommandAccordion(props) {
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const { commands } = props;
  const accordion = [];

  for (let i = 0; i < commands.length; i++)
  {
    accordion.push(
      <Accordion 
        expanded={expanded === `panel${i}`} 
        onChange={handleChange(`panel${i}`)}
        key={i.toString()}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls={`panel${i}bh-content`}
          id={`panel${i}bh-header`}
        >
          {commands[i].summery}
        </AccordionSummary>
        <AccordionDetails sx={{pb: 0}}>
          {commands[i].details}
        </AccordionDetails>
      </Accordion>
    )
  }

  return <React.Fragment>{accordion}</React.Fragment>;
}