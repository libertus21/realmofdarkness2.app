import { Container, Skeleton } from "@mui/material";
import Grid from '@mui/material/Unstable_Grid2';


export default function SheetSkeleton(props)
{
  return (
    <Container sx={{ mt: 10 }}>
      <Skeleton height={200} />
      <Skeleton height={50} />
      <Grid 
        container
        spacing={5}
      >
        <Grid xs={12} md={5}>
          <Skeleton sx={{height: {xs: 200, md: 500}}} />          
          <Skeleton height={100} />
        </Grid>
        <Grid 
          md={7}
          sx={{ display: { xs: 'none', md: 'block' } }} 
        >
          <Skeleton height={100} />
          <Skeleton height={200} />
          <Skeleton height={200} />
          <Skeleton height={100} />
        </Grid>
      </Grid>
    </Container>
  )
} 