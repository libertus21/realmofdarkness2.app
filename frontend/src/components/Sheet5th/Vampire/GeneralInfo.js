import { List, ListItem, TextField, Tooltip, IconButton } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import BlurOnOutlinedIcon from '@mui/icons-material/BlurOnOutlined';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import LockIcon from '@mui/icons-material/Lock';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import { pink } from '@mui/material/colors';

function GeneralInfo(props)
{
  return (
    <Grid 
      container 
      spacing={2} 
      xs={12}
    >
      <Grid direction="column" xs={12} md={2}>
        <List>
          <ListItem>
            <TextField 
              label="Name" 
              variant='outlined' 
              defaultValue=' ' 
              fullWidth
              size='small'
            />
          </ListItem>
          <ListItem>
            <TextField 
              label="Chroncile" 
              variant='outlined' 
              defaultValue=' ' 
              fullWidth
              size='small'
            />     
          </ListItem>
        </List>
      </Grid>
      <Grid direction="column" xs={12} md={2}>
        <List>
          <ListItem>
            <TextField 
              label="Ambition" 
              variant='outlined' 
              defaultValue=' ' 
              fullWidth
              size='small'
            />
          </ListItem>
          <ListItem>
            <TextField 
              label="Desire" 
              variant='outlined' 
              defaultValue=' ' 
              fullWidth
              size='small'
            />
          </ListItem>
        </List>
      </Grid>
      <Grid direction="column" xs={12} md={2}>
        <List>
          <ListItem>
            <TextField 
              label="Clan" 
              variant='outlined' 
              defaultValue=' ' 
              fullWidth
              size='small'
            />
          </ListItem>
          <ListItem>
            <TextField 
              label="Generation" 
              variant='outlined' 
              defaultValue=' ' 
              fullWidth
              size='small'
            />
          </ListItem>
        </List>
      </Grid>      
      <Grid direction="column" xs={12} md={2}>
        <List>
          <ListItem>
            <TextField 
              label="Sire" 
              variant='outlined' 
              defaultValue=' ' 
              fullWidth
              size='small'
            />
          </ListItem>
          <ListItem>
            <TextField 
              label="Predator Type" 
              variant='outlined' 
              defaultValue=' ' 
              fullWidth
              size='small'
            />
          </ListItem>
        </List>
      </Grid>      
      <Grid direction="column" xs={12} md={2}>
        <List>
          <ListItem>
            <TextField 
              label="Sheet Status" 
              variant='outlined' 
              defaultValue=' ' 
              fullWidth
              size='small'
            />
          </ListItem>
          <ListItem>
            <TextField 
              label="Experiance" 
              variant='outlined' 
              defaultValue=' ' 
              fullWidth
              size='small'
            />
          </ListItem>
        </List>
      </Grid>      
      <Grid 
        container 
        direction="row"
        justifyContent="center"
        alignItems="center"
        rowSpacing={0} 
        xs={12} 
        md={2}
      >
        <Grid>
          <Tooltip title="Edit Sheet" arrow> 
            <IconButton>
              <LockIcon fontSize='large' color="secondary" />
            </IconButton>         
          </Tooltip>
        </Grid>
        <Grid>
          <Tooltip title="Place Holder" arrow> 
            <IconButton disabled>
              <BlurOnOutlinedIcon fontSize='large' color="secondary" />
            </IconButton>         
          </Tooltip>
        </Grid>
        <Grid>
          <Tooltip title="Place Holder" arrow> 
            <IconButton disabled>
              <BlurOnOutlinedIcon fontSize='large' color="secondary" />
            </IconButton>         
          </Tooltip>
        </Grid>
        <Grid>
          <Tooltip title="Place Holder" arrow> 
            <IconButton disabled>
              <BlurOnOutlinedIcon fontSize='large' color="secondary" />
            </IconButton>         
          </Tooltip>
        </Grid>
        <Grid>
          <Tooltip title="Place Holder" arrow> 
            <IconButton disabled>
              <BlurOnOutlinedIcon fontSize='large' color="secondary" />
            </IconButton>         
          </Tooltip>
        </Grid>
        <Grid>
          <Tooltip title="Place Holder" arrow> 
            <IconButton disabled>
              <BlurOnOutlinedIcon fontSize='large' color="secondary" />
            </IconButton>         
          </Tooltip>
        </Grid>
        <Grid>
          <Tooltip title="Place Holder" arrow> 
            <IconButton disabled>
              <BlurOnOutlinedIcon fontSize='large' color="secondary" />
            </IconButton>         
          </Tooltip>
        </Grid>
        <Grid>
          <Tooltip title="Delete" arrow> 
            <IconButton>
              <DeleteForeverIcon fontSize='large' sx={{ color: pink[500] }} />
            </IconButton>         
          </Tooltip>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default GeneralInfo;