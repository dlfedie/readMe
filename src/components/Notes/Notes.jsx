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
})

class Notes extends Component {

    

    handleClose = () => {
        this.props.dispatch({
            type: 'CLOSE_NOTES'
        })
    };

    render() {

        const { classes } = this.props;

        return (
            <Dialog onClose={this.handleClose} aria-labelledby="customized-dialog-title" open={this.props.notesReducer.notesOpen}>
            <h5>Notes:</h5>
                <p>{this.props.notesReducer.notesForBook}</p>
            {/* <DialogTitle id="customized-dialog-title" onClose={this.handleClose}>
            Modal title
            </DialogTitle>
            <DialogContent dividers>
                <Typography gutterBottom>
                    Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis
                    in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
                </Typography>
                <Typography gutterBottom>
                    Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis
                    lacus vel augue laoreet rutrum faucibus dolor auctor.
                </Typography>
                <Typography gutterBottom>
                    Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna, vel
                    scelerisque nisl consectetur et. Donec sed odio dui. Donec ullamcorper nulla non metus
                    auctor fringilla.
                </Typography>
            </DialogContent> */}
        {/* <DialogActions> */}
          <Button onClick={this.handleClose} color="primary">
            Back
          </Button>
        {/* </DialogActions> */}
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