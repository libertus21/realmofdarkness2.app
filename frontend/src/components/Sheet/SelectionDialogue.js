import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
  Typography,
  IconButton,
  Grid2,
  DialogContentText,
} from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { useSheetContext } from "../../routes/Character/Vampire5thSheet";
import { slugify } from "../../utility";
import { useState } from "react";

export default function SelectionDialogue(props) {
  const { label, selected, onClose, open, getData, getItemInfo } = props;
  const { handleUpdate } = useSheetContext();
  const [infoOpen, setInfoOpen] = useState(false);
  const [selectedInfo, setSelectedInfo] = useState(null);

  let buttons = [];
  for (const element of getData()) {
    let color = "primary";
    if (selected === element) color = "success";
    buttons.push(
      <DialogueButton
        key={element}
        label={element}
        color={color}
        onClick={onSelect}
        onInfoClick={() => handleInfoClick(element)}
        showInfo={label === "Clan"}
      />
    );
  }

  function handleClose() {
    onClose();
  }

  async function onSelect(value) {
    handleUpdate({ [slugify(label)]: value });
    onClose();
  }

  const handleInfoClick = (item) => {
    setSelectedInfo(item);
    setInfoOpen(true);
  };

  return (
    <>
      <Dialog open={open} onClose={handleClose} fullWidth>
        <DialogTitle style={{ textAlign: "center" }} color="primary">
          {label}
        </DialogTitle>
        <DialogContent>
          <Grid2 container columnGap={2} rowGap={2} justifyContent="center">
            {buttons}
            <Grid2
              paddingTop={2}
              container
              justifyContent="center"
              columnGap={1}
              rowGap={1}
              size={12}
            >
              <Grid2>
                <TextField disabled label={`Custom ${label}`} size="small" />
              </Grid2>
              <Grid2 paddingTop={0.25}>
                <Button variant="outlined" color="secondary" disabled>
                  {`Create Custom ${label}`}
                </Button>
              </Grid2>
            </Grid2>
          </Grid2>
        </DialogContent>
      </Dialog>

      
      <Dialog
        open={infoOpen}
        onClose={() => setInfoOpen(false)}
        fullWidth
        maxWidth="sm"
        PaperProps={{
          style: {
            backgroundColor: '#1a1a1a',
            margin: '16px',
          }
        }}
      >
        <DialogTitle 
          sx={{ 
            color: '#ffd700',
            padding: { xs: 2, sm: 3 },
            fontSize: { xs: '1.2rem', sm: '1.5rem' }
          }}
        >
          {selectedInfo}
        </DialogTitle>
        <DialogContent sx={{ padding: { xs: 2, sm: 3 } }}>
          {selectedInfo && getItemInfo && (
            <Grid2 container spacing={2}>
              <Grid2 xs={12}>
                <Typography 
                  variant="subtitle1" 
                  sx={{ 
                    color: '#ffd700',
                    fontWeight: 'bold',
                    marginBottom: '4px'
                  }}
                >
                  Description
                </Typography>
                <Typography 
                  sx={{ 
                    color: '#fff',
                    fontSize: { xs: '0.9rem', sm: '1rem' }
                  }}
                >
                  {getItemInfo(selectedInfo).description}
                </Typography>
              </Grid2>
              
              <Grid2 xs={12}>
                <Typography 
                  variant="subtitle1" 
                  sx={{ 
                    color: '#ffd700',
                    fontWeight: 'bold',
                    marginBottom: '4px',
                    marginTop: '8px'
                  }}
                >
                  Disciplines
                </Typography>
                <Typography 
                  sx={{ 
                    color: '#fff',
                    fontSize: { xs: '0.9rem', sm: '1rem' }
                  }}
                >
                  {getItemInfo(selectedInfo).disciplines}
                </Typography>
              </Grid2>

              <Grid2 xs={12}>
                <Typography 
                  variant="subtitle1" 
                  sx={{ 
                    color: '#ffd700',
                    fontWeight: 'bold',
                    marginBottom: '4px',
                    marginTop: '8px'
                  }}
                >
                  Clan Bane
                </Typography>
                <Typography 
                  sx={{ 
                    color: '#fff',
                    fontSize: { xs: '0.9rem', sm: '1rem' }
                  }}
                >
                  {getItemInfo(selectedInfo).bane}
                </Typography>
              </Grid2>

              <Grid2 xs={12}>
                <Typography 
                  variant="subtitle1" 
                  sx={{ 
                    color: '#ffd700',
                    fontWeight: 'bold',
                    marginBottom: '4px',
                    marginTop: '8px'
                  }}
                >
                  Compulsion
                </Typography>
                <Typography 
                  sx={{ 
                    color: '#fff',
                    fontSize: { xs: '0.9rem', sm: '1rem' }
                  }}
                >
                  {getItemInfo(selectedInfo).compulsion}
                </Typography>
              </Grid2>
            </Grid2>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}

function DialogueButton(props) {
  const { label, color, onClick, onInfoClick, showInfo } = props;

  function handleClick(event) {
    onClick(event.currentTarget.value);
  }

  return (
    <Grid2 container>
      <Grid2 minWidth={150}>
        <Button
          variant="outlined"
          color={color}
          onClick={handleClick}
          value={label}
          fullWidth
        >
          <Typography value={label} style={{ textTransform: "none" }}>
            {label}
          </Typography>
        </Button>
      </Grid2>
      {showInfo && (
        <Grid2>
          <IconButton onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onInfoClick();
          }}>
            <InfoOutlinedIcon sx={{ color: "#ffd700" }} />
          </IconButton>
        </Grid2>
      )}
    </Grid2>
  );
}
