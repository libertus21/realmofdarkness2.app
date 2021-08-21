import { Grid } from '@material-ui/core';
import React from 'react';
import LabeledDotGroup from '../LabeledDotGroup';


/*
    props: {
        virtues: {category: {}}
        onChange: function({})
    }
*/
class Virtues extends React.Component
{
    constructor(props)
    {
        super(props);

        this.onChange = this.onChange.bind(this);
    }

    onChange(virtue)
    {
        const clone = JSON.parse(JSON.stringify(this.props.virtues));

        clone[virtue.slug].level = virtue.level;
        
        this.props.onChange({
            state: {virtues: clone}, 
            server: {
                virtueLevel: {
                    slug: virtue.slug, 
                    level: virtue.level
                }
            }});
    }

    composeVirtues(virtues)
    {
        if (!virtues) return "";

        const list =  Object.keys(virtues).map((key) => {
            const virtue = virtues[key];
            return (
                <Grid key={virtue.slug} item xs={12} my={1}>
                    <LabeledDotGroup 
                        label={{slug: virtue.slug, name: virtue.name}} 
                        selected={virtue.level}
                        onChange={this.onChange}
                    />
                </Grid>
        )});
        return list;
    }

    render()
    {
        return (
            <Grid item xs={4}>
                <Grid item xs sx={{textAlign: "center"}}>
                    Virtues
                </Grid>
                <Grid item xs>
                    {this.composeVirtues(this.props.virtues)}
                </Grid>
               
            </Grid>            
        );
    }
}

export default Virtues;