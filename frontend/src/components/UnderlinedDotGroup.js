import { Grid } from '@material-ui/core';
import DotGroup from './DotGroup';
import React from 'react';

/*
    props: {
        label: {slug: string, name: string}
        selected: int
        onChange: function({label: {}}),
    }
*/
class UnderlinedDotGroup extends React.Component
{
    constructor(props)
    {
        super(props);

        this.onDotClicked = this.onDotClicked.bind(this);
    }

    onDotClicked(selected)
    {
        this.props.onChange({
            slug: this.props.label.slug,
            level: selected
        });
    }

    render()
    {
        return (
            <Grid container>
                <Grid item xs sx={{ 
                    borderBottom: 1
                }}
                >
                    {this.props.label.name}
                </Grid>

                <Grid item sx={{ 
                    alignItems: 'flex-end',
                    display: 'flex',
                }}>
                    <DotGroup 
                        dots={5} 
                        selected={this.props.selected} 
                        onDotClicked={this.onDotClicked}
                    />
                </Grid>                
            </Grid>
        );
    }
}

export default UnderlinedDotGroup;