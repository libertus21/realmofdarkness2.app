import { Grid } from '@material-ui/core';
import React from 'react';

class Exp20th extends React.Component
{
    render()
    {
        return (
            <Grid item xs={12} mt={4}>
                <Grid item xs sx={{textAlign: "center"}}>
                    Experiance
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

export default Exp20th;