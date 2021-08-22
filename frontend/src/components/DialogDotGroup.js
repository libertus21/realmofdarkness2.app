import { Grid, Button } from '@material-ui/core';
import React from 'react';
import UnderlinedDotGroup from './UnderlinedDotGroup';
import DynamicDialog from './DynamicDialogList';

/*
    props: {
        label: {slug: string, name: string}
        options: {},
        active: {},
        onChange: function({})
    }
*/
class DialogDotGroup extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {open: false}

        this.handleClickOpen = this.handleClickOpen.bind(this);
        this.initRows = this.initRows.bind(this);
        this.onClose = this.onClose.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    onChange(clicked)
    {
        const response = {}
        const clone = JSON.parse(JSON.stringify(this.props.active));
        clone[clicked.slug] = {slug: clicked.slug, level: clicked.level};
            response.state = {[this.props.label.slug]: clone};
            response.server = {[this.props.label.slug]: {
                slug: clicked.slug, level: clicked.level
        }};

        this.props.onChange(response);
    }

    initRows(active)
    {
        if (!active) return "";
        const rows = Object.keys(active).map((key) => {
            const act = active[key];
            const option = this.props.options[act.slug];
            return (
                <Grid item xs={12} my={1} key={option.slug}>
                    <UnderlinedDotGroup 
                        label={{slug: option.slug, name: option.name}}
                        selected={act.level}
                        onChange={this.onChange} 
                    />
                </Grid>
            );
        });

        return rows
    }
    
    handleClickOpen()
    {
        this.setState({open: true})
    }

    onClose(clicked)
    {
        this.setState({open: false})
        if (clicked) 
        {
            const response = {state: null, server: {}}
            if (this.props.active && this.props.active[clicked.slug])
            {
                const clone = JSON.parse(JSON.stringify(this.props.active));
                delete clone[clicked.slug];
                response.state = {[this.props.label.slug]: clone};
                response.server = {[this.props.label.slug]: {
                    wasRemoved: true, slug: clicked.slug
                }};
            }
            else
            {
                let clone;
                if (this.props.active)
                    clone = JSON.parse(JSON.stringify(this.props.active));
                else
                    clone = {};

                clone[clicked.slug] = {slug: clicked.slug, level: 1};
                response.state = {[this.props.label.slug]: clone};
                response.server = {[this.props.label.slug]: {
                    slug: clicked.slug, level: 1
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
                    {this.props.label.name}
                </Grid>

                {this.initRows(this.props.active)}
                
                <Grid item xs={12} my={2} sx={{textAlign: "center"}}>
                    <Button variant="outlined" 
                    color="secondary"
                    onClick={this.handleClickOpen}
                    size="large"
                    >
                        Add {this.props.label.name}
                    </Button>
                </Grid>
                <DynamicDialog 
                    open={this.state.open} 
                    onClose={this.onClose} 
                    label={this.props.label.name}
                    options={this.props.options}
                />               
            </Grid>               
        );
    }
}

export default DialogDotGroup;