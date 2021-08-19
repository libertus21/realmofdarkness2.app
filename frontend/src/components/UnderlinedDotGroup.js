import { Grid } from '@material-ui/core';
import DotGroup from './DotGroup';
import React from 'react';

class UnderlinedDotGroup extends React.Component
{
    render()
    {
        return (
            <Grid container>
                <Grid item xs sx={{ 
                    borderBottom: 1
                }}
                >
                    {this.props.label}
                </Grid>

                <Grid item sx={{ 
                    alignItems: 'flex-end',
                    display: 'flex',
                }}>
                    <DotGroup dots={5} selected={1} />
                </Grid>                
            </Grid>
        );
    }
}

export default UnderlinedDotGroup;