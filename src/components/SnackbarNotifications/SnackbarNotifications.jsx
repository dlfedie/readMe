import React, { Component } from 'react';
import { connect } from 'react-redux';

import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import SnackbarContent from '@material-ui/core/SnackbarContent';


//this is a component to handle snackbars. only handles a success, ran out of time to handle a cancel or 
//some sort of other notification.

class SnackbarNotification extends Component {

    //snackbars

    //this is for other components to use. not needed or used here, but this will help for copy/paste
    handleSuccess = () => {
        this.props.dispatch({
            type: 'SNACKBAR_TRUE'
        });
    }


    //this is needed here to close the snackbar. unsure if clickaway is working.
    handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        this.props.dispatch({
            type: 'SNACKBAR_FALSE'
        });
    }

    render() {

        //fairly basic snackbar that goes in the bottom left, tells you your changes have saved,
        //and will close on clicking on the X icon.

        return (
            <Snackbar
                // className="success"
                // variant="success"

                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                open={this.props.snackbar.snackbarOpen}
                autoHideDuration={5000}
                onClose={this.handleClose}
                // ContentProps={{
                //     'aria-describedby': 'message-id',
                // }}
            >
                <SnackbarContent className="success" message={this.props.snackbar.snackbarText}
                    variant="body1" onClose={this.handleClose} action={[
                        <IconButton
                            key="close"
                            aria-label="close"
                            color="inherit"
                            onClick={this.handleClose}
                        >
                            <CloseIcon />
                        </IconButton>,
                    ]}
                    style={{ backgroundColor: '#8bc34a' }}
                />
            </Snackbar>
        );
    }
}

const mapStateToProps = (reduxStore) => {
    return {
        snackbar: reduxStore.snackbar
    }
}

export default connect(mapStateToProps)(SnackbarNotification);
