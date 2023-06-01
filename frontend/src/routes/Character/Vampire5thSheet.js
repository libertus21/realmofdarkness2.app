import { Box, Container, Paper } from "@mui/material";
import Grid from '@mui/material/Unstable_Grid2';

import GeneralInfo from "../../components/Sheet5th/Vampire/GeneralInfo";
import Attributes from "../../components/Sheet5th/Attributes";
import Skills from "../../components/Sheet5th/Skills";

function Vampire5thSheet(props)
{
  return (
    <Paper elevation={1} sx={{ paddingY: '20px'}}>
      <Container>
        <Box 
          sx={{display: 'flex', justifyContent: 'center'}}
          marginBottom={4}
        >
          <img 
            src='https://media.discordapp.net/attachments/886983353922891816/1024918662223769600/VampireLogo_xsmall_colour.png' 
            alt="Vampire: the Masquerade" 
            style={{ width: '400px', height: 'auto' }} />
        </Box>
        <Grid     
          sx={{
            border: '2px solid #80172f',
            borderRadius: '15px',
            padding: '10px',
          }}
        >
          <GeneralInfo />
          <Attributes />
          <Skills />
        </Grid>
      </Container>
    </Paper>
  )
}

export default Vampire5thSheet;