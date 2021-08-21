import { Grid, Button } from '@material-ui/core';
import React from 'react';
import UnderlinedDotGroup from './UnderlinedDotGroup';
import DynamicDialog from './DynamicDialogList';

/*
    props: {
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

        this.rows = [];
        this.initRows(this.state.options);
    }

    onChange()
    {

    }

    initRows(active)
    {
        if (!active) return "";

        this.rows = Object.keys(active).map((key) => {
            const act = active[key];
            const option = this.props.options[act.slug];
            return (
                <Grid item xs={12} my={1} key={option.slug}>
                    <UnderlinedDotGroup 
                        label={{slug: option.slug, name: option.name}}
                        selected={act.level}
                        onchange={this.onChange} 
                    />
                </Grid>
            );
        });
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
            if (this.state.options[clicked.slug])
            {
                const clone = JSON.parse(JSON.stringify(this.state.options));
                delete clone[clicked.slug];
                this.setState({options: clone});
            }
            else
            {
                const clone = JSON.parse(JSON.stringify(this.state.options));
                clone[clicked.slug] = clicked;
                this.setState({options: clone});
            }
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