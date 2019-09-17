import React, { Component } from 'react';
import { connect } from 'react-redux';


import { withStyles } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import Grid from '@material-ui/core/Grid';



const styles = theme => ({
    text: {
        color: 'blue',
    },
    root: {
        margin: 0,
        padding: theme.spacing(2),
        backgroundColor: 'transparent'
    },
    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500],
    },
    noteBox: {
        backgroundColor: 'transparent'
    },
    noteText: {
        color: 'red',
        textAlign: 'center',

    },
    title: {
        textAlign: 'center',
    },
    buttons: {
        padding: '1%'
    },
    editButton: {
        padding: '7%'
    }
})

class Notes extends Component {

    state = {
        inputOpen: false,
    }


    handleClose = () => {
        this.props.dispatch({
            type: 'CLOSE_NOTES'
        })
        this.setState({
            inputOpen: false,
        })
    };

    handleChange = (name) => (event) => {
        console.log('typing in input');
        this.props.dispatch({
            type: 'EDIT_NOTES',
            payload: event.target.value
        })
    };

    handleCancelEdit = () => {
        console.log('clicked cancel');
        let bookId = this.props.notesReducer.notesForBook.bookId
        console.log(bookId);
        this.props.dispatch({
            type: 'GET_NOTES',
            payload: bookId
        })
        this.setState({ inputOpen: !this.state.inputOpen })
    }

    handleSaveEdit = () => {
        console.log('clicked save');
        // let bookId = this.props.notesReducer.notesForBook.bookId

        this.props.dispatch({
            type: 'UPDATE_NOTES',
            payload: this.props.notesReducer.notesForBook
        })
        this.setState({ inputOpen: !this.state.inputOpen })
    }

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
                <h5 className={classes.title}>Notes:</h5>
                {/* {JSON.stringify(this.state)} */}

                {this.state.inputOpen ?
                    <div>
                        <Grid container spacing={2} justify={'space-around'} alignItems={'center'} direction={'column'}>
                            <Grid item>
                                <TextField
                                    id="outlined-name"
                                    label="Notes"
                                    multiline
                                    rowsMax="4"
                                    className={classes.textField}
                                    value={this.props.notesReducer.notesForBook.notes ? this.props.notesReducer.notesForBook.notes : ''}
                                    onChange={this.handleChange('inputText')}
                                    margin="normal"
                                    variant="outlined"
                                />
                            </Grid>
                            <Grid item container spacing={2} justify={'center'} alignItems={'center'} direction={'row'}>
                                <Grid item>
                                    <Button onClick={() => this.handleCancelEdit()} variant="outlined" color="secondary" className={classes.buttons}>
                                        Cancel
                                    </Button>
                                </Grid>    
                                <Grid item>
                                    <Button onClick={() => this.handleSaveEdit()} variant="outlined" color="primary" className={classes.buttons}>
                                        Save
                                    </Button>
                                </Grid>
                            </Grid>
                        </Grid>
                    </div> :
                    <p className={classes.noteText} >{this.props.notesReducer.notesForBook.notes}</p>
                }

                <IconButton aria-label="edit" size="small" className={classes.editButton} onClick={() => this.setState({ inputOpen: !this.state.inputOpen })}>
                    <EditIcon fontSize="inherit" />
                </IconButton>
                <Button onClick={this.handleClose} color="primary" variant="contained">
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