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
        this.getBearing = this.getBearing.bind(this);
    }

    onDotClicked(selected)
    {
        this.props.onChange({
            state: {morality: {
                slug: this.props.morality.slug,
                level: selected,
            }},
            server: {morality: {
                slug: this.props.morality.slug, 
                level: selected,
            }}
        });
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
            this.props.onChange(
                {
                    state: 
                    {
                        morality: {
                            slug: clicked.slug,
                            level: this.props.morality.level,
                        }
                    },
                    server: 
                    {
                        morality: {
                            slug: clicked.slug,
                            level: this.props.morality.level,
                        }
                    }                
                }
            );
        }
    }

    getBearing()
    {
        if (!this.props.morality) return "";

        let modifier = "";

        if (this.props.morality.level === 10) modifier = "(-2 Diff)";
        else if (this.props.morality.level >= 8) modifier = "(-1 Diff)";
        else if (this.props.morality.level >= 4) modifier = "( 0 )";
        else if (this.props.morality.level >= 2) modifier = "(+1 Diff)";
        else if (this.props.morality.level === 1) modifier = "(+2 Diff)";
        else modifier = "( Wight )"

        return modifier;
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
                        {this.props.morality ? 
                            this.props.morality.name : "Loading"}
                    </Grid>
                    <Grid item xs={3} />
                </Grid>
                
                <Grid container item xs={12} my={1}>
                    <Grid item xs />
                    <DotGroup 
                        dots={10} 
                        selected={this.props.morality ? 
                            this.props.morality.level : 1}
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
                        {this.props.morality ? 
                            this.props.morality.bearing : "Loading"}
                    </Grid>
                    <Box>{this.getBearing()}</Box>
                    <Grid item xs />
                </Grid>

                <DynamicDialogList 
                    onClose={this.onClose} 
                    options={this.props.options}
                    open={this.state.openDialog}
                    label="Morality"
                />             
            </Grid>            
        );
    }
}

export default Morality20th;