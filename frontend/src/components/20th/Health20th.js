import { Grid } from '@material-ui/core';
import React from 'react';

class Health20th extends React.Component
{
    render()
    {
        return (
            <Grid item xs={12} mt={4}>
                <Grid item xs sx={{textAlign: "center"}}>
                    Health
                </Grid>
                <Grid container item xs>
                    <Grid item xs />
                    Tracker goes here
                    <Grid item xs />
                </Grid>
               
            </Grid>            
        );
    }
}

export default Health20th;