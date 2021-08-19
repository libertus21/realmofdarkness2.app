import { Grid } from '@material-ui/core';
import React from 'react';

class Weakness extends React.Component
{
    render()
    {
        return (
            <Grid item xs={12} mt={4}>
                <Grid item xs sx={{textAlign: "center"}}>
                    Weakness
                </Grid>
                <Grid container item xs>
                    <Grid item xs />
                    Text goes here
                    <Grid item xs />
                </Grid>
               
            </Grid>            
        );
    }
}

export default Weakness;