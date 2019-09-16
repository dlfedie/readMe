import React, { Component } from 'react';
import { connect } from 'react-redux';


import { withStyles } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';



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
        inputOpen: false,
        inputText: ''
    }

    componentDidMount() {
        if (this.props.notesReducer.notesForBook) {
            this.setState({
                ...this.state,
                inputText: this.props.notesReducer.notesForBook
            })
        }
        
    }

    handleClose = () => {
        this.props.dispatch({
            type: 'CLOSE_NOTES'
        })
    };

    handleChange = (name) => (event) => {
        this.setState({ ...this.state, [name]: event.target.value });
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
                <h5 className={classes.title}>Notes:</h5>

                {this.state.inputOpen ? 
                    <div>
                        <TextField
                            id="outlined-name"
                            label="Notes"
                            multiline
                            rowsMax="4"
                            className={classes.textField}
                            value={this.state.inputText}
                            onChange={this.handleChange('inputText')}
                            margin="normal"
                            variant="outlined"
                        />
                        <Button onClick={this.handleCancelEdit} color="secondary">
                            Cancel
                        </Button>
                        <Button onClick={this.handleSaveEdit} color="primary">
                            Save
                        </Button>
                    </div> :
                    <p className={classes.noteText} >{this.props.notesReducer.notesForBook}</p>
                }
                
                <IconButton aria-label="edit" size="small" onClick={() => this.setState({ ...this.state, inputOpen: !this.state.inputOpen })}>
                    <EditIcon fontSize="inherit"  />
                </IconButton>
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