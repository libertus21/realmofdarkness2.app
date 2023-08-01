import { AlertTitle, Snackbar, Alert } from "@mui/material";

export default function ErrorSnackbar(props) 
{
  const { title, alert, onClose } = props;

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    
    onClose()
  }; 

  return (
    <Snackbar
      open={alert ? true : false}
      autoHideDuration={10000}
      onClose={handleClose}      
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
    >
      <Alert severity='error' variant="filled" sx={{ width: '100%' }}>
        <AlertTitle>{title}</AlertTitle>
        {alert}
      </Alert>
    </Snackbar>
  );
}