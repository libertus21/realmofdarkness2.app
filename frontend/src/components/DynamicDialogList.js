import { Button, Dialog, DialogTitle, ListItem,
    List,
    DialogContent} from '@material-ui/core';
import React from 'react';


/*
    Props: 
    {
        onClose: handleClose(clicked)
        options: Object // contains all the choices
        open: bool // opens the dialog or not
        label: string // Heading
    }
 */
class DynamicDialogList extends React.Component
{
    constructor(props)
    {
        super(props);

        this.handleClose = this.handleClose.bind(this);
        this.initDialogList = this.initDialogList.bind(this);
    }

    initDialogList()
    {
        if (!this.props.options) return "";

        const dialogList = Object.keys(this.props.options).map((key) => {
            let option = this.props.options[key];
            return (
                <ListItem key={option.slug}>
                    <Button variant="outlined"
                    color="secondary"
                    fullWidth={true}
                    onClick={this.handleClose}
                    value={option.slug}
                    >
                        {option.name}
                    </Button>
                </ListItem>
            );
        });

        return dialogList;
    }

    handleClose(e)
    {
        if (!this.props.options) return this.props.onClose();
        this.props.onClose(this.props.options[e.target.value]);
    }

    render()
    {
        return(
            <Dialog open={this.props.open}
            onClose={this.handleClose}
            PaperProps={{sx: {backgroundColor: "#282c34"}}}
            >
                <DialogTitle sx={{textAlign: 'center', color: 'white'}}>
                    {this.props.label}
                </DialogTitle>
                <DialogContent className="no-scroll-bar">
                    <List>
                        {this.initDialogList()} 
                    </List>
                </DialogContent>
                              
            </Dialog>
        )        
    }
}

export default DynamicDialogList;