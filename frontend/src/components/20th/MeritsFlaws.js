import { Grid, Button, Stack } from '@material-ui/core';
import React from 'react';
import DynamicDialogList from '../DynamicDialogList';

/*
    props: {
        meritOptions: {},
        flawOptions: {},
        activeMerits: {},
        activeFlaws: {},
        onChange: function({})
    }
*/
class MeritsFlaws extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            meritOpen: false, flawOpen: false
        }

        this.handleMeritOpen = this.handleMeritOpen.bind(this);
        this.handleFlawOpen = this.handleFlawOpen.bind(this);
        this.initRows = this.initRows.bind(this);
        this.onMeritClose = this.onMeritClose.bind(this);
        this.onFlawClose = this.onFlawClose.bind(this);
    }

    initRows(active)
    {
        if (!active) return "";

        let total = 0;
        const rows = Object.keys(active).map((key) => {
            const field = active[key];
            if (field.cost) total += field.cost;
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

        return rows;
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

    onClose(clicked, type)
    {
        if (clicked) 
        {
            const response = {state: null, server: {}}
            if (this.props[type] && this.props[type][clicked.slug])
            {
                const clone = JSON.parse(JSON.stringify(this.props[type]));
                delete clone[clicked.slug];
                response.state = {[type]: clone};
                response.server = {[type]: {
                    wasRemoved: true, slug: clicked.slug
                }};
            }
            else
            {
                let clone;
                if (this.props[type])
                    clone = JSON.parse(JSON.stringify(this.props[type]));
                else
                    clone = {};

                clone[clicked.slug] = {slug: clicked.slug, cost: clicked.cost};
                response.state = {[type]: clone};
                response.server = {[type]: {
                    slug: clicked.slug, cost: clicked.cost
                }};
            }
            this.props.onChange(response);
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
                    {this.initRows(this.props.activeMerits)}
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
                    {this.initRows(this.props.activeFlaws)}
                </Grid>
                
                <Grid item xs={12} my={2} 
                    sx={{justifyContent: 'center', display: 'flex'}}
                >
                    <Stack direction="row" spacing={2}>
                        <Button variant="outlined" 
                        color="secondary"
                        onClick={this.handleMeritOpen}
                        size="large"
                        >
                            Add Merit
                        </Button>
                        <Button variant="outlined" 
                        color="secondary"
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
                    label="Merits"
                    options={this.props.meritOptions}
                /> 
                <DynamicDialogList 
                    open={this.state.flawOpen} 
                    onClose={this.onFlawClose} 
                    label="Flaws"
                    options={this.props.flawOptions}
                />              
            </Grid>               
        );
    }
}

export default MeritsFlaws;