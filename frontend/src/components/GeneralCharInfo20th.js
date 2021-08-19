import { Grid } from '@material-ui/core';
import React from 'react';
import LabeledInput from './LabeledInput';

class GeneralCharInfo20th extends React.Component
{
    render()
    {
        return (
            <Grid container item xs={12}>
                <Grid item xs={4}>
                    <LabeledInput label="Name:" />
                    <LabeledInput label="Player:" />
                    <LabeledInput label="Chronicle:" />
                </Grid>
                    
                <Grid item xs={4}>
                    <LabeledInput label="Nature:" />
                    <LabeledInput label="Demeanor:" />
                    <LabeledInput label="Concept:" />
                </Grid>
                    
                <Grid item xs={4}>
                    <LabeledInput label="Clan:" />
                    <LabeledInput label="Generation:" />
                    <LabeledInput label="Sire:" />
                </Grid>
            </Grid>           
        );
    }
}

export default GeneralCharInfo20th;