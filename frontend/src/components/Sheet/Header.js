import Grid from "@mui/material/Unstable_Grid2";
import { Divider, Typography } from "@mui/material";

export default function Header(props) {
  const { children, ...gridProps } = props;

  return (
    <Grid xs={12} {...gridProps}>
      <Divider variant="middle">
        <Typography variant="h4" component="h2" color="#80172f">
          {children}
        </Typography>
      </Divider>
    </Grid>
  );
}
