import Grid from '@mui/material/Unstable_Grid2';
import { Divider, Typography, List, ListItem } from "@mui/material";
import { Fragment } from 'react';
import RatingInfo from './RatingInfo';

function Attributes(props)
{
  return (
    <Fragment>      
      <Divider variant="middle">
        <Typography variant="h3" component="h2" color='#80172f'>
          Attributes
        </Typography>
      </Divider>
      <Grid 
        container 
        spacing={2} 
        marginBottom={4}
      >
        <Grid direction="column" xs={12} md={4}>
          <List>
            <ListItem>
              <Grid container alignItems="center" sx={{width: '100%'}}>
                <Grid paddingRight={0}>
                  <Typography>Athletics</Typography>
                </Grid>
                <Grid                   
                  borderBottom="1px solid grey" 
                  sx={{ flexGrow: '1' }}
                />
                <Grid sx={{mr: -2}}>                  
                  <RatingInfo tracker={{total: 5, current: 1}} />
                </Grid>
              </Grid>
            </ListItem>
            <ListItem>
              <Grid container alignItems="center" sx={{width: '100%'}}>
                <Grid paddingRight={0}>
                  <Typography>Brawl</Typography>
                </Grid>
                <Grid                   
                  borderBottom="1px solid grey" 
                  sx={{ flexGrow: '1' }}
                />
                <Grid sx={{mr: -2}}>                  
                  <RatingInfo tracker={{total: 5, current: 1}} />
                </Grid>
              </Grid>
            </ListItem>
            <ListItem>
              <Grid container alignItems="center" sx={{width: '100%'}}>
                <Grid paddingRight={0}>
                  <Typography>Craft</Typography>
                </Grid>
                <Grid                   
                  borderBottom="1px solid grey" 
                  sx={{ flexGrow: '1' }}
                />
                <Grid sx={{mr: -2}}>                  
                  <RatingInfo tracker={{total: 5, current: 1}} />
                </Grid>
              </Grid>
            </ListItem>
            <ListItem>
              <Grid container alignItems="center" sx={{width: '100%'}}>
                <Grid paddingRight={0}>
                  <Typography>Drive</Typography>
                </Grid>
                <Grid                   
                  borderBottom="1px solid grey" 
                  sx={{ flexGrow: '1' }}
                />
                <Grid sx={{mr: -2}}>                  
                  <RatingInfo tracker={{total: 5, current: 1}} />
                </Grid>
              </Grid>
            </ListItem>
            <ListItem>
              <Grid container alignItems="center" sx={{width: '100%'}}>
                <Grid paddingRight={0}>
                  <Typography>Firearms</Typography>
                </Grid>
                <Grid                   
                  borderBottom="1px solid grey" 
                  sx={{ flexGrow: '1' }}
                />
                <Grid sx={{mr: -2}}>                  
                  <RatingInfo tracker={{total: 5, current: 1}} />
                </Grid>
              </Grid>
            </ListItem>
            <ListItem>
              <Grid container alignItems="center" sx={{width: '100%'}}>
                <Grid paddingRight={0}>
                  <Typography>Larceny</Typography>
                </Grid>
                <Grid                   
                  borderBottom="1px solid grey" 
                  sx={{ flexGrow: '1' }}
                />
                <Grid sx={{mr: -2}}>                  
                  <RatingInfo tracker={{total: 5, current: 1}} />
                </Grid>
              </Grid>
            </ListItem>
            <ListItem>
              <Grid container alignItems="center" sx={{width: '100%'}}>
                <Grid paddingRight={0}>
                  <Typography>Melee</Typography>
                </Grid>
                <Grid                   
                  borderBottom="1px solid grey" 
                  sx={{ flexGrow: '1' }}
                />
                <Grid sx={{mr: -2}}>                  
                  <RatingInfo tracker={{total: 5, current: 1}} />
                </Grid>
              </Grid>
            </ListItem>
            <ListItem>
              <Grid container alignItems="center" sx={{width: '100%'}}>
                <Grid paddingRight={0}>
                  <Typography>Stealth</Typography>
                </Grid>
                <Grid                   
                  borderBottom="1px solid grey" 
                  sx={{ flexGrow: '1' }}
                />
                <Grid sx={{mr: -2}}>                  
                  <RatingInfo tracker={{total: 5, current: 1}} />
                </Grid>
              </Grid>
            </ListItem>
            <ListItem>
              <Grid container alignItems="center" sx={{width: '100%'}}>
                <Grid paddingRight={0}>
                  <Typography>Survival</Typography>
                </Grid>
                <Grid                   
                  borderBottom="1px solid grey" 
                  sx={{ flexGrow: '1' }}
                />
                <Grid sx={{mr: -2}}>                  
                  <RatingInfo tracker={{total: 5, current: 1}} />
                </Grid>
              </Grid>
            </ListItem>
          </List>
        </Grid>
        <Grid direction="column" xs={12} md={4}>
          <List>
            <ListItem>
              <Grid container alignItems="center" sx={{width: '100%'}}>
                <Grid paddingRight={0}>
                  <Typography>Athletics</Typography>
                </Grid>
                <Grid                   
                  borderBottom="1px solid grey" 
                  sx={{ flexGrow: '1' }}
                />
                <Grid sx={{mr: -2}}>                  
                  <RatingInfo tracker={{total: 5, current: 1}} />
                </Grid>
              </Grid>
            </ListItem>
            <ListItem>
              <Grid container alignItems="center" sx={{width: '100%'}}>
                <Grid paddingRight={0}>
                  <Typography>Brawl</Typography>
                </Grid>
                <Grid                   
                  borderBottom="1px solid grey" 
                  sx={{ flexGrow: '1' }}
                />
                <Grid sx={{mr: -2}}>                  
                  <RatingInfo tracker={{total: 5, current: 1}} />
                </Grid>
              </Grid>
            </ListItem>
            <ListItem>
              <Grid container alignItems="center" sx={{width: '100%'}}>
                <Grid paddingRight={0}>
                  <Typography>Craft</Typography>
                </Grid>
                <Grid                   
                  borderBottom="1px solid grey" 
                  sx={{ flexGrow: '1' }}
                />
                <Grid sx={{mr: -2}}>                  
                  <RatingInfo tracker={{total: 5, current: 1}} />
                </Grid>
              </Grid>
            </ListItem>
            <ListItem>
              <Grid container alignItems="center" sx={{width: '100%'}}>
                <Grid paddingRight={0}>
                  <Typography>Drive</Typography>
                </Grid>
                <Grid                   
                  borderBottom="1px solid grey" 
                  sx={{ flexGrow: '1' }}
                />
                <Grid sx={{mr: -2}}>                  
                  <RatingInfo tracker={{total: 5, current: 1}} />
                </Grid>
              </Grid>
            </ListItem>
            <ListItem>
              <Grid container alignItems="center" sx={{width: '100%'}}>
                <Grid paddingRight={0}>
                  <Typography>Firearms</Typography>
                </Grid>
                <Grid                   
                  borderBottom="1px solid grey" 
                  sx={{ flexGrow: '1' }}
                />
                <Grid sx={{mr: -2}}>                  
                  <RatingInfo tracker={{total: 5, current: 1}} />
                </Grid>
              </Grid>
            </ListItem>
            <ListItem>
              <Grid container alignItems="center" sx={{width: '100%'}}>
                <Grid paddingRight={0}>
                  <Typography>Larceny</Typography>
                </Grid>
                <Grid                   
                  borderBottom="1px solid grey" 
                  sx={{ flexGrow: '1' }}
                />
                <Grid sx={{mr: -2}}>                  
                  <RatingInfo tracker={{total: 5, current: 1}} />
                </Grid>
              </Grid>
            </ListItem>
            <ListItem>
              <Grid container alignItems="center" sx={{width: '100%'}}>
                <Grid paddingRight={0}>
                  <Typography>Melee</Typography>
                </Grid>
                <Grid                   
                  borderBottom="1px solid grey" 
                  sx={{ flexGrow: '1' }}
                />
                <Grid sx={{mr: -2}}>                  
                  <RatingInfo tracker={{total: 5, current: 1}} />
                </Grid>
              </Grid>
            </ListItem>
            <ListItem>
              <Grid container alignItems="center" sx={{width: '100%'}}>
                <Grid paddingRight={0}>
                  <Typography>Stealth</Typography>
                </Grid>
                <Grid                   
                  borderBottom="1px solid grey" 
                  sx={{ flexGrow: '1' }}
                />
                <Grid sx={{mr: -2}}>                  
                  <RatingInfo tracker={{total: 5, current: 1}} />
                </Grid>
              </Grid>
            </ListItem>
            <ListItem>
              <Grid container alignItems="center" sx={{width: '100%'}}>
                <Grid paddingRight={0}>
                  <Typography>Survival</Typography>
                </Grid>
                <Grid                   
                  borderBottom="1px solid grey" 
                  sx={{ flexGrow: '1' }}
                />
                <Grid sx={{mr: -2}}>                  
                  <RatingInfo tracker={{total: 5, current: 1}} />
                </Grid>
              </Grid>
            </ListItem>
          </List>
        </Grid>
        <Grid direction="column" xs={12} md={4}>
          <List>
            <ListItem>
              <Grid container alignItems="center" sx={{width: '100%'}}>
                <Grid paddingRight={0}>
                  <Typography>Athletics</Typography>
                </Grid>
                <Grid                   
                  borderBottom="1px solid grey" 
                  sx={{ flexGrow: '1' }}
                />
                <Grid sx={{mr: -2}}>                  
                  <RatingInfo tracker={{total: 5, current: 1}} />
                </Grid>
              </Grid>
            </ListItem>
            <ListItem>
              <Grid container alignItems="center" sx={{width: '100%'}}>
                <Grid paddingRight={0}>
                  <Typography>Brawl</Typography>
                </Grid>
                <Grid                   
                  borderBottom="1px solid grey" 
                  sx={{ flexGrow: '1' }}
                />
                <Grid sx={{mr: -2}}>                  
                  <RatingInfo tracker={{total: 5, current: 1}} />
                </Grid>
              </Grid>
            </ListItem>
            <ListItem>
              <Grid container alignItems="center" sx={{width: '100%'}}>
                <Grid paddingRight={0}>
                  <Typography>Craft</Typography>
                </Grid>
                <Grid                   
                  borderBottom="1px solid grey" 
                  sx={{ flexGrow: '1' }}
                />
                <Grid sx={{mr: -2}}>                  
                  <RatingInfo tracker={{total: 5, current: 1}} />
                </Grid>
              </Grid>
            </ListItem>
            <ListItem>
              <Grid container alignItems="center" sx={{width: '100%'}}>
                <Grid paddingRight={0}>
                  <Typography>Drive</Typography>
                </Grid>
                <Grid                   
                  borderBottom="1px solid grey" 
                  sx={{ flexGrow: '1' }}
                />
                <Grid sx={{mr: -2}}>                  
                  <RatingInfo tracker={{total: 5, current: 1}} />
                </Grid>
              </Grid>
            </ListItem>
            <ListItem>
              <Grid container alignItems="center" sx={{width: '100%'}}>
                <Grid paddingRight={0}>
                  <Typography>Firearms</Typography>
                </Grid>
                <Grid                   
                  borderBottom="1px solid grey" 
                  sx={{ flexGrow: '1' }}
                />
                <Grid sx={{mr: -2}}>                  
                  <RatingInfo tracker={{total: 5, current: 1}} />
                </Grid>
              </Grid>
            </ListItem>
            <ListItem>
              <Grid container alignItems="center" sx={{width: '100%'}}>
                <Grid paddingRight={0}>
                  <Typography>Larceny</Typography>
                </Grid>
                <Grid                   
                  borderBottom="1px solid grey" 
                  sx={{ flexGrow: '1' }}
                />
                <Grid sx={{mr: -2}}>                  
                  <RatingInfo tracker={{total: 5, current: 1}} />
                </Grid>
              </Grid>
            </ListItem>
            <ListItem>
              <Grid container alignItems="center" sx={{width: '100%'}}>
                <Grid paddingRight={0}>
                  <Typography>Melee</Typography>
                </Grid>
                <Grid                   
                  borderBottom="1px solid grey" 
                  sx={{ flexGrow: '1' }}
                />
                <Grid sx={{mr: -2}}>                  
                  <RatingInfo tracker={{total: 5, current: 1}} />
                </Grid>
              </Grid>
            </ListItem>
            <ListItem>
              <Grid container alignItems="center" sx={{width: '100%'}}>
                <Grid paddingRight={0}>
                  <Typography>Stealth</Typography>
                </Grid>
                <Grid                   
                  borderBottom="1px solid grey" 
                  sx={{ flexGrow: '1' }}
                />
                <Grid sx={{mr: -2}}>                  
                  <RatingInfo tracker={{total: 5, current: 1}} />
                </Grid>
              </Grid>
            </ListItem>
            <ListItem>
              <Grid container alignItems="center" sx={{width: '100%'}}>
                <Grid paddingRight={0}>
                  <Typography>Survival</Typography>
                </Grid>
                <Grid                   
                  borderBottom="1px solid grey" 
                  sx={{ flexGrow: '1' }}
                />
                <Grid sx={{mr: -2}}>                  
                  <RatingInfo tracker={{total: 5, current: 1}} />
                </Grid>
              </Grid>
            </ListItem>
          </List>
        </Grid>
      </Grid>
    </Fragment>
  )
}

export default Attributes;