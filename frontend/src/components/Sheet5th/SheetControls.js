import { Tooltip, IconButton } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import LockIcon from '@mui/icons-material/Lock';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import BlurOnOutlinedIcon from '@mui/icons-material/BlurOnOutlined';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useSheetContext } from '../../routes/Character/Vampire5thSheet';
import { pink } from '@mui/material/colors';

export default function SheetControls(props)
{
  const { lock } = useSheetContext();
  const { handleLockChange } = props;

  const unlockSheet = (    
    <Tooltip title="Edit Sheet" arrow> 
      <IconButton onClick={handleLockChange}>
        <LockIcon fontSize='large' color="secondary" />
      </IconButton>         
    </Tooltip>
  )

  const lockSheet = (  
    <Tooltip title="Lock Sheet" arrow> 
      <IconButton onClick={handleLockChange}>
        <LockOpenIcon fontSize='large' color="secondary" />
      </IconButton>         
    </Tooltip>
  )

  return (        
    <Grid 
      container 
      direction="row"
      justifyContent="center"
      alignItems="center"
      rowSpacing={-3}
      spacing={2}
      xs={12} 
      md={2}
    >
      <Grid>
        {lock ? unlockSheet : lockSheet}
      </Grid>
      <Grid>
        <Tooltip title="Place Holder" arrow> 
          <span>
          <IconButton disabled>
            <BlurOnOutlinedIcon fontSize='large' color="secondary" />
          </IconButton>
          </span>         
        </Tooltip>
      </Grid>
      <Grid>
        <Tooltip title="Place Holder" arrow>
          <span>            
          <IconButton disabled>
            <BlurOnOutlinedIcon fontSize='large' color="secondary" />
          </IconButton>  
          </span>        
        </Tooltip>
      </Grid>
      <Grid>
        <Tooltip title="Place Holder" arrow> 
          <span>
          <IconButton disabled>
            <BlurOnOutlinedIcon fontSize='large' color="secondary" />
          </IconButton>       
          </span>  
        </Tooltip>
      </Grid>
      <Grid>
        <Tooltip title="Place Holder" arrow> 
          <span>
          <IconButton disabled>
            <BlurOnOutlinedIcon fontSize='large' color="secondary" />
          </IconButton>
          </span>         
        </Tooltip>
      </Grid>
      <Grid>
        <Tooltip title="Place Holder" arrow> 
          <span>
          <IconButton disabled>
            <BlurOnOutlinedIcon fontSize='large' color="secondary" />
          </IconButton>
          </span>         
        </Tooltip>
      </Grid>
      <Grid>
        <Tooltip title="Place Holder" arrow> 
          <span>
            <IconButton disabled>
              <BlurOnOutlinedIcon fontSize='large' color="secondary" />
            </IconButton>
          </span>       
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
  )
}