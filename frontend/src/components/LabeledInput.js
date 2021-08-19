import { Grid, TextField } from '@material-ui/core';
import React from 'react';

/*
    props: {
        label: String // Name of the label
    }
*/
class LabeledInput extends React.Component
{
    render()
    {
        return (
            <Grid container>
                <Grid item sx={{ 
                    paddingTop: "4px"
                }}>
                    {this.props.label}
                </Grid>
                <Grid item xs>
                    <TextField 
                        variant="standard"
                        color="primary"
                        fullWidth
                        multiline
                        inputProps={{sx: {paddingLeft: "15px"}}}
                    />
                </Grid>
               
            </Grid>            
        );
    }
}

export default LabeledInput;