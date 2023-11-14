import {
  Typography,
  Card,
  Accordion,
  AccordionDetails,
  AccordionSummary,
  CardActions,
  Tooltip,
  IconButton,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import Grid from '@mui/material/Unstable_Grid2';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useState } from 'react';
import { useSheetContext } from '../../routes/Character/Vampire5thSheet';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import SheetRating from "./SheetRating";

export default function Discipline(props) {
  const { lock } = useSheetContext();
  const [expanded, setExpanded] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const {
    discipline,
    updateCustomDiscipline,
    updateDiscipline,
    deleteDiscipline
  } = props;


  const handleDialogOpen = () => {
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  function handleUpdate() {
    updateCustomDiscipline(discipline);
  }

  function handleValueChange(event, value) {
    const newDiscipline = JSON.parse(JSON.stringify(discipline));
    newDiscipline.value = value;
    updateDiscipline(newDiscipline, true);
  }

  const cardActions = (
    <>
      <Divider />
      <CardActions>
        {discipline.powers?.length <= 5 && (
          <Tooltip title="Add Power" arrow>
            <IconButton>
              <AddIcon color="primary" />
            </IconButton>
          </Tooltip>
        )}
        {discipline.custom === 0 && (
          <Tooltip title="Edit Discipline" arrow>
            <IconButton onClick={handleUpdate}>
              <EditIcon color="primary" />
            </IconButton>
          </Tooltip>
        )}
        <Tooltip title="Delete" arrow>
          <IconButton onClick={() => deleteDiscipline(discipline.name)}>
            <DeleteIcon color="error" />
          </IconButton>
        </Tooltip>
      </CardActions>
    </>
  );

  return (
    <Grid minWidth='300px'>
      <Card elevation={0} sx={{ borderRadius: '12px' }}>
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
                {
                  discipline.description?.length || discipline.characteristics?.length ? (
                    <div onClick={(event) => {
                      // Call the function to show details
                      handleDialogOpen();
                      // Stop the propagation to prevent Accordion from expanding
                      event.stopPropagation();
                    }}>
                      <Tooltip title='Info' arrow>
                        <Typography>
                          {discipline.name}
                        </Typography>
                      </Tooltip>
                    </div>
                  ) : (
                    <Typography onClick={(event) => {
                      event.stopPropagation();
                    }}>
                      {discipline.name}
                    </Typography>
                  )
                }
              </Grid>
              <Grid paddingLeft={2} paddingTop={0.5}>
                <SheetRating
                  locked={lock}
                  size="medium"
                  value={discipline.value}
                  onChange={handleValueChange}
                />
              </Grid>
            </Grid>
          </AccordionSummary>
          <AccordionDetails>

          </AccordionDetails>
        </Accordion>
        {!lock ? cardActions : null}
      </Card>

      {/* Dialog for displaying details */}
      <Dialog open={dialogOpen} onClose={handleDialogClose}>
        <DialogTitle color="primary" sx={{ textAlign: 'center' }}>
          {discipline.name}
        </DialogTitle>
        <DialogContent>
          {
            discipline.description?.map((item, index) => (
              <Typography key={index} sx={{ marginBottom: '20px' }}>
                {item}
              </Typography>
            ))
          }
          {discipline.characteristics?.length ? (
            <>
              <Typography
                variant="h4"
                component="h2"
                color="secondary"
                paddingTop={2}
              >
                Characteristics
              </Typography>
              {
                discipline.characteristics?.map((item, index) => (
                  <Typography key={index} sx={{ marginBottom: '20px' }}>
                    {item}
                  </Typography>
                ))
              }
            </>
          ) : null}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Grid>
  )
}