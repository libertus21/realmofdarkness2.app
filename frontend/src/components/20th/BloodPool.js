import { Grid } from '@material-ui/core';
import React from 'react';
import DotGroup from '../DotGroup';


/*
    props: {
        bloodPool: {max: int, current: int}
        onChange: function({label: {bloodpool}})
    }
*/
class BloodPool extends React.Component
{
    constructor(props)
    {
        super(props);

        this.onDotClicked = this.onDotClicked.bind(this);
    }

    onDotClicked(selected)
    {
        // TODO will need to do some sanity checking for current and max
        // when current is implemented

        this.props.onChange({bloodPool: {max: selected, current: 0}})
    }

    render()
    {
        let max = 1;
        //let current = 0;
        
        if (this.props.bloodPool)
        {
            max = this.props.bloodPool.max;
            //current = this.props.bloodPool.current;
        }

        return (
            <Grid item xs={12} mt={4}>
                <Grid item xs sx={{textAlign: "center"}}>
                    Blood Pool
                </Grid>
                <Grid container item xs>
                    <Grid item xs />
                    <DotGroup dots={20} selected={max} 
                        onDotClicked={this.onDotClicked} />
                    <Grid item xs />
                </Grid>
               
            </Grid>            
        );
    }
}

export default BloodPool;