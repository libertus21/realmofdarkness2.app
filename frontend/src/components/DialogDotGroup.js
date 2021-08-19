import { Grid, Button } from '@material-ui/core';
import React from 'react';
import UnderlinedDotGroup from './UnderlinedDotGroup';
import DynamicDialog from './DynamicDialogList';

class DialogDotGroup extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {open: false, options: {}}

        this.handleClickOpen = this.handleClickOpen.bind(this);
        this.initRows = this.initRows.bind(this);
        this.onClose = this.onClose.bind(this);

        this.rows = [];
        this.initRows(this.state.options);
    }

    initRows(options)
    {
        this.rows = Object.keys(options).map((key) => {
            const option = options[key];
            return (
                <Grid item xs={12} my={1} key={option.slug}>
                    <UnderlinedDotGroup label={option.name} />
                </Grid>
            );
        })
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
                this.initRows(clone);
                this.setState({options: clone});
            }
            else
            {
                const clone = JSON.parse(JSON.stringify(this.state.options));
                clone[clicked.slug] = clicked;
                this.initRows(clone);
                this.setState({options: clone});
            }
        }
    }

    render()
    {
        return(
            <Grid item xs={4}>
                <Grid item xs={12} mb={1} sx={{textAlign: "center"}}>
                    {this.props.label}
                </Grid>

                {this.rows}
                
                <Grid item xs={12} my={2} sx={{textAlign: "center"}}>
                    <Button variant="outlined" 
                    color="error"
                    onClick={this.handleClickOpen}
                    size="large"
                    >
                        Add {this.props.label}
                    </Button>
                </Grid>
                <DynamicDialog 
                    open={this.state.open} 
                    onClose={this.onClose} 
                    label={this.props.label}
                    options={this.props.options}
                />               
            </Grid>               
        );
    }
}

export default DialogDotGroup;