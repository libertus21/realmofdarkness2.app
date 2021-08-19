import { Grid } from '@material-ui/core';
import React from 'react';
import LabeledDotGroup from '../LabeledDotGroup';

const virtues = ["Conscience", "Self-Control", "Courage"];

function composeVirtues(category)
{
    const list = category.map((virtue) => {
        return (
            <Grid key={virtue} item xs={12} my={1}>
                <LabeledDotGroup label={virtue} selected="1" />
            </Grid>
    )});
    return list;
}

const virtueList = composeVirtues(virtues);

class Virtues extends React.Component
{
    render()
    {
        return (
            <Grid item xs={4}>
                <Grid item xs sx={{textAlign: "center"}}>
                    Virtues
                </Grid>
                <Grid item xs>
                    {virtueList}
                </Grid>
               
            </Grid>            
        );
    }
}

export default Virtues;