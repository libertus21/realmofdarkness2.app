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
    }
 */
class DynamicDialogList extends React.Component
{
    constructor(props)
    {
        super(props);

        this.dialogList = [];

        this.handleClose = this.handleClose.bind(this);
        this.defineDialogList = this.defineDialogList.bind(this);

        this.defineDialogList();
    }

    defineDialogList()
    {
        this.dialogList = Object.keys(this.props.options).map((key) => {
            let option = this.props.options[key];
            return (
                <ListItem key={option.slug}>
                    <Button variant="outlined"
                    color="error"
                    fullWidth={true}
                    onClick={this.handleClose}
                    value={option.slug}
                    >
                        {option.name}
                    </Button>
                </ListItem>
            );
        });
    }

    handleClose(e)
    {
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
                        {this.dialogList} 
                    </List>
                </DialogContent>
                              
            </Dialog>
        )        
    }
}

export default DynamicDialogList;