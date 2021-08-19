import { Grid } from '@material-ui/core';
import DotGroup from './DotGroup';
import React from 'react';

/*
    props: {
        label: {id: string, name: string}
        selected: int
        onChange: function({label: {}}),
    }
*/
class LabeledDotGroup extends React.Component
{
    constructor(props)
    {
        super(props);

        this.onDotclicked = this.onDotclicked.bind(this);
    }

    onDotclicked(selected)
    {
        this.props.onChange({[this.props.label.id]: {
            id: this.props.label.id,
            name: this.props.label.name,
            level: selected
        }});
    }


    render()
    {
        return (
            <Grid container>
                <Grid item sx={{ 
                    alignItems: 'flex-end',
                    display: 'flex',
                }}
                >
                    {this.props.label.name}
                </Grid>

                <Grid item xs sx={{ borderBottom: 1 }} />

                <Grid item sx={{ 
                    alignItems: 'flex-end',
                    display: 'flex',
                }}>
                    <DotGroup 
                        dots={5} 
                        selected={this.props.selected ? this.props.selected : 0}
                    />
                </Grid>                
            </Grid>
        );
    }
}

export default LabeledDotGroup;