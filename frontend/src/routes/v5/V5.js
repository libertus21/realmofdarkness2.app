import { Container } from "@mui/material";
import { Outlet } from "react-router-dom";

export default function V5 () {    
  return (
    <Container sx={{ my: 13 }}>   
      <Outlet />
    </Container>
  ) 
}