import React, { Component } from 'react';
import { connect } from 'react-redux';


import { withStyles } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import Grid from '@material-ui/core/Grid';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContentText from '@material-ui/core/DialogContentText';



const styles = theme => ({
    text: {
        color: 'blue',
    },
    root: {
        // margin: 0,
        // padding: theme.spacing(1),
        // backgroundColor: 'transparent'
    },
    noteBox: {
        // width: '400px'
    },
    noteText: {
        color: 'black',
        textAlign: 'center',
    },
    textField: {
        // width: '120%'
    },
    title: {
        textAlign: 'center',
    },
    buttons: {
        padding: '1%'
    },
    editButton: {
        padding: '7%'
    },
    backButton: {
        maxWidth: '40%',
        float: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        margin: 'auto',
        width: 'fit-content',
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
        //this below will actually make the edit and details page update if a user is editing notes from that page.
        //scrapped, because it broke things too much. may revisit later
        // this.props.dispatch({
        //     type: 'FETCH_EDITS',
        //     payload: {id: bookId}
        // })
        this.setState({ inputOpen: !this.state.inputOpen })
    }

    render() {

        const { classes } = this.props;

        return (
            <Dialog
                onClose={this.handleClose}
                aria-labelledby="customized-dialog-title"
                open={this.props.notesReducer.notesOpen}
                maxWidth="xs"
                fullWidth={true}
                className={classes.noteBox}
            >
                <DialogTitle className={classes.title}>
                    Notes
                </DialogTitle>
                <DialogContent>
                    {this.state.inputOpen ?

                        <Grid container spacing={2} justify={'center'} alignItems={'center'} direction={'column'}>
                            <Grid item>
                                <TextField
                                    id="outlined-name"
                                    label="Notes"
                                    multiline
                                    fullWidth
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
                        </Grid> :
                        <Grid container spacing={1} justify={'center'} alignItems={'center'} direction={'column'}>
                            <Grid item>
                                <DialogContentText className={classes.noteText}>
                                    {this.props.notesReducer.notesForBook.notes}
                                </DialogContentText>
                            </Grid>
                        </Grid>
                    }
                </DialogContent>
                <DialogActions>
                    <Grid container spacing={1} justify={'center'} alignItems={'center'} direction={'column'}>
                        <Grid item>
                            <IconButton aria-label="edit" size="small" className={classes.editButton} onClick={() => this.setState({ inputOpen: !this.state.inputOpen })}>
                                <EditIcon fontSize="inherit" />
                            </IconButton>
                        </Grid>
                        <div className={classes.backButton}>
                            <Button className={classes.backButton} onClick={this.handleClose} color="primary" variant="contained" size="small">
                                Back
                            </Button>
                        </div>
                    </Grid>
                </DialogActions>
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