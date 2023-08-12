import { CircularProgress, Container, Typography } from "@mui/material";
import Grid from '@mui/material/Unstable_Grid2';
import { useState, useEffect } from "react";

export default function Connecting(props) 
{
  const [dots, setDots] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prevDots) => (prevDots === "..." ? "." : prevDots + "."));
    }, 500);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <Container>
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        spacing={2}
        paddingTop={15}
      >
        <Grid minWidth='136px'>
          <Typography variant="h6" color="textSecondary">
            Connecting{dots}
          </Typography>
        </Grid>
        <Grid>
          <CircularProgress />
        </Grid>
      </Grid>
    </Container>
  );
}



