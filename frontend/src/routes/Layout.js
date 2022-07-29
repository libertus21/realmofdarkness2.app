import { Outlet } from "react-router-dom";
import AppBar from "../components/AppBar";
import ScrollTop from "../components/ScrollTop";
import Fab from '@mui/material/Fab';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Container from '@mui/material/Container';

export default function Layout() {
  return (
  	<main>
      <AppBar /> 
      <Container sx={{ my: 13 }}>
        <Outlet />
      </Container> 
      
      <ScrollTop>
        <Fab color="secondary" size="small" aria-label="scroll back to top">
          <KeyboardArrowUpIcon />
        </Fab>
      </ ScrollTop>      
      
    </main>
  );
}