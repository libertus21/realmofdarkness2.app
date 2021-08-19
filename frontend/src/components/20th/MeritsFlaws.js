import { Grid, Button, Stack } from '@material-ui/core';
import React from 'react';
import DynamicDialogList from '../DynamicDialogList';


class MeritsFlaws extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            meritOpen: false, flawOpen: false, merits: {}, flaws: {}
        }

        this.handleMeritOpen = this.handleMeritOpen.bind(this);
        this.handleFlawOpen = this.handleFlawOpen.bind(this);
        this.initRows = this.initRows.bind(this);
        this.onMeritClose = this.onMeritClose.bind(this);
        this.onFlawClose = this.onFlawClose.bind(this);

        this.merits = [];
        this.flaws = [];
        this.initRows(this.state.merits, "merits");
        this.initRows(this.state.flaws, "flaws");
    }

    initRows(dict, state)
    {
        let total = 0;
        let rows = Object.keys(dict).map((key) => {
            const field = dict[key];
            if (field.cost) total += parseInt(field.cost);
            return (
                <Grid container item xs={12} key={field.slug}>
                    <Grid item xs={10} mr={1.5} my={1} sx={{borderBottom: 1}}>
                        {field.name}
                    </Grid>
                    <Grid item xs my={1} 
                        sx={{textAlign: "center", borderBottom: 1}}
                    >
                        {field.cost}
                    </Grid>
                </Grid>
            );
        });

        if (total && rows.length > 1)
        {
            rows.push(
                <Grid container item xs={12} key="total">
                    <Grid item xs={10} my={1} mr={1.5} />
                    <Grid item xs my={1} 
                        sx={{textAlign: "center", borderBottom: 1}}
                    >
                        {total}
                    </Grid>
                </Grid>
            )          
        }

        if (state === 'merits') this.merits = rows;
        else this.flaws = rows;
    }
    
    handleMeritOpen()
    {
        this.setState({meritOpen: true});
    }

    handleFlawOpen()
    {
        this.setState({flawOpen: true});
    }

    onMeritClose(clicked)
    {
        this.setState({meritOpen: false});
        this.onClose(clicked, "merits");
    }

    onFlawClose(clicked)
    {
        this.setState({flawOpen: false}); 
        this.onClose(clicked, "flaws");      
    }

    onClose(clicked, state)
    {
        if (clicked) 
        {
            if (this.state[state][clicked.slug])
            {
                const clone = JSON.parse(JSON.stringify(this.state[state]));
                delete clone[clicked.slug];
                this.initRows(clone, state);
                this.setState({[state]: clone});
            }
            else
            {
                const clone = JSON.parse(JSON.stringify(this.state[state]));
                clone[clicked.slug] = clicked;
                this.initRows(clone, state);
                this.setState({[state]: clone});
            }
        }
    }

    render()
    {
        return(
            <Grid item xs={4}>
                <Grid item xs={12} mb={1} sx={{textAlign: "center"}}>
                    Mertis & Flaws
                </Grid>

                <Grid container item xs my={2}>
                    <Grid container item xs={12} mb={2}>
                        <Grid item xs={10} mr={1.5}>
                            <strong>Merit</strong>
                        </Grid>
                        <Grid item xs sx={{textAlign: "center"}}>
                            <strong>Cost</strong>
                        </Grid>
                    </Grid>
                    {this.merits}
                </Grid>
                <Grid container item xs my={2}>
                    <Grid container item xs={12} my={2}>
                        <Grid item xs={10} mr={1.5}>
                            <strong>Flaw</strong>
                        </Grid>
                        <Grid item xs sx={{textAlign: "center"}}>
                            <strong>Cost</strong>
                        </Grid>
                    </Grid>
                    {this.flaws}
                </Grid>
                
                <Grid item xs={12} my={2} 
                    sx={{justifyContent: 'center', display: 'flex'}}
                >
                    <Stack direction="row" spacing={2}>
                        <Button variant="outlined" 
                        color="error"
                        onClick={this.handleMeritOpen}
                        size="large"
                        >
                            Add Merit
                        </Button>
                        <Button variant="outlined" 
                        color="error"
                        onClick={this.handleFlawOpen}
                        size="large"
                        >
                            Add Flaw
                        </Button>
                    </Stack>
                    
                </Grid>
                <DynamicDialogList 
                    open={this.state.meritOpen} 
                    onClose={this.onMeritClose} 
                    label="Mertis"
                    options={this.props.options}
                /> 
                <DynamicDialogList 
                    open={this.state.flawOpen} 
                    onClose={this.onFlawClose} 
                    label="Flaws"
                    options={this.props.options}
                />              
            </Grid>               
        );
    }
}

export default MeritsFlaws;