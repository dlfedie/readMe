import React, { Component } from 'react';
import { connect } from 'react-redux';


import { withStyles } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';


const styles = theme => ({
    text: {
        color: 'blue',
    },
    root: {
        margin: 0,
        padding: theme.spacing(2),
    },
    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500],
    },
    noteText: {
        color: 'red',
        textAlign: 'center',

    },
    title: {
        textAlign: 'center',
    }
})

class Notes extends Component {

    state = {
        inputOpen: false
    }

    handleClose = () => {
        this.props.dispatch({
            type: 'CLOSE_NOTES'
        })
    };

    render() {

        const { classes } = this.props;

        return (
            <Dialog
                onClose={this.handleClose}
                aria-labelledby="customized-dialog-title"
                open={this.props.notesReducer.notesOpen}
                maxWidth="md"
                fullWidth={true}
                className={classes.noteBox}
            >
                <h5 className={classes.title} >Notes:</h5>
                <p className={classes.noteText} >{this.props.notesReducer.notesForBook}</p>
                
                <Button onClick={this.handleClose} color="primary">
                    Back
                </Button>
            </Dialog>
        )
    }
}

const mapStateToProps = (reduxStore) => {
    return {
        notesReducer: reduxStore.notes
    }
}

export default connect(mapStateToProps)(withStyles(styles)(Notes));