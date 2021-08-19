import { Grid } from '@material-ui/core';
import React from 'react';
import DotGroup from '../DotGroup';

class Willpower20th extends React.Component
{
    render()
    {
        return (
            <Grid item xs={12} my={4}>
                <Grid item xs sx={{textAlign: "center"}}>
                    Willpower
                </Grid>
                <Grid container item xs>
                    <Grid item xs />
                    <DotGroup dots={10} selected={1} />
                    <Grid item xs />
                </Grid>
               
            </Grid>            
        );
    }
}

export default Willpower20th;