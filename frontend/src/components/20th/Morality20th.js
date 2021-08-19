import { Box, Grid } from '@material-ui/core';
import React from 'react';
import DotGroup from '../DotGroup';
import DynamicDialogList from '../DynamicDialogList';


/*
    props: {
        morality: {id: string, name: string, level: int, bearing: string},
        onChange: function({label: {morality}}),
        options: {moralityOptions}
    }
*/
class Morality20th extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            openDialog: false
        }

        this.handleOpen = this.handleOpen.bind(this);
        this.onClose = this.onClose.bind(this);
        this.onDotClicked = this.onDotClicked.bind(this);
    }

    onDotClicked(selected)
    {
        this.props.onChange({morality: {
            id: this.props.morality.id,
            name: this.props.morality.name, 
            level: selected,
            bearing: this.props.morality.bearing,
        }});
    }

    handleOpen()
    {
        this.setState({openDialog: true});
    }

    onClose(clicked)
    {
        this.setState({openDialog: false});
        if (clicked) 
        {
            this.props.onChange({morality: {
                id: clicked.id,
                name: clicked.name, 
                level: this.props.morality.level,
                bearing: clicked.bearing,
            }});
        }
    }

    render()
    {
        return (
            <Grid container item xs={12}>
                <Grid item xs={12} mb={1} sx={{textAlign: "center"}}>
                    Morality
                </Grid>
                <Grid container item my={1} xs={12}>
                    <Grid item xs={3} />
                    <Grid xs item onClick={this.handleOpen}
                        sx={{
                        textAlign: "center", borderBottom: 1
                        }}
                    >
                        {this.props.morality.name}
                    </Grid>
                    <Grid item xs={3} />
                </Grid>
                
                <Grid container item xs={12} my={1}>
                    <Grid item xs />
                    <DotGroup 
                        dots={10} 
                        selected={this.props.morality.level}
                        onDotClicked={this.onDotClicked} 
                    />
                    <Grid item xs />
                </Grid>
                
                <Grid container item xs={12}>
                    <Grid item xs />
                    <Box>Bearing:</Box>
                    <Grid item xs={4} mx={0.5} 
                        sx={{borderBottom: 1, textAlign: "center"}}
                    >
                        {this.props.morality.bearing}
                    </Grid>
                    <Box>( 0 )</Box>
                    <Grid item xs />
                </Grid>

                <DynamicDialogList 
                    onClose={this.onClose} 
                    options={this.props.options}
                    open={this.state.openDialog}
                />             
            </Grid>            
        );
    }
}

export default Morality20th;