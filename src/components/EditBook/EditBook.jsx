import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from "react-router";
import Notes from '../Notes/Notes'


import { withStyles } from '@material-ui/core/styles';

import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import Rating from '@material-ui/lab/Rating';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Switch from '@material-ui/core/Switch';
import IconButton from '@material-ui/core/IconButton';
import NoteIcon from '@material-ui/icons/Note';
import NoteAddIcon from '@material-ui/icons/NoteAdd';


const styles = theme => ({
    root: {
        flexGrow: 1,
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        overflow: 'hidden',
        alignContent: 'center',
        textAlign: 'center'

    },
    cardItem: {
        borderColor: 'text.primary',
        height: 'auto',
        width: '80%',
        border: 1,
        borderStyle: 'solid',
        margin: '10%',
        justifyContent: 'center',
        display: 'center',
        alignContent: 'center',

    },
    title: {
        display: 'center',
        textAlign: 'center'
    },
    toggles: {
        justifyContent: 'right',
        float: 'right',
        padding: '10px'
    },
    beef: {
        float: 'right',
        padding: '10px',
        textAlign: 'right',
        display: 'right',
    },
    removeButton: {
        padding: '10px',
        display: 'center',
        textAlign: 'center'
    }

});

class EditBook extends Component {

    state = {
        rating: 0,
        current: false,
        wish: false,
        nope: false,
    }

    componentDidMount() {
        // window.scrollTo(0, 0);
        this.props.dispatch({
            type: 'SET_BOOK_CLICKED',
            payload: this.props.match.params.id
        })
        this.setState({
            ...this.state,
            current: this.props.edit.currently_reading,
            wish: this.props.edit.wish_list,
            nope: this.props.edit.nope_list,
            rating: this.props.edit.rating,
        })
    }

    cancelEdit = () => {
        console.log('clicked cancel button');
        this.props.history.goBack();
    }

    saveEdit = () => {
        console.log('clicked save button');
        this.props.dispatch({
            type: 'UPDATE_RATING',
            payload: {
                value: this.state.rating,
                currently_reading: this.state.current,
                wish_list: this.state.wish,
                nope_list: this.state.nope,
                bookId: this.props.edit.id
            }
        })

        //i'm a fool and did all of this separately... doesn't need to be.
        // this.props.dispatch({
        //     type: 'UPDATE_CURRENT',
        //     payload: {
        //         currently_reading: this.state.current,
        //         bookId: this.props.edit.id
        //     }
        // })
        // this.props.dispatch({
        //     type: 'UPDATE_WISH',
        //     payload: {
        //         wish_list: this.state.wish,
        //         bookId: this.props.edit.id
        //     }
        // })
        // this.props.dispatch({
        //     type: 'UPDATE_NOPE',
        //     payload: {
        //         nope_list: this.state.nope,
        //         bookId: this.props.edit.id
        //     }
        // })
        this.props.history.goBack();
    }

    removeBookFromLibrary = (id) => {
        console.log('clicked on delete for book ID:', id);
        this.props.dispatch({
            type: 'DELETE_BOOK',
            payload: { bookIdToDelete: id }
        })
        this.props.history.goBack();
    }

    changeRating = (event) => {
        console.log('changing rating of book id, value:', this.props.edit.id, event.target.value, );
        this.setState({
            ...this.state,
            rating: Number(event.target.value)
        })
    }

    handleToggleChange = (type) => (event) => {
        console.log('toggling:', type, 'to:', event.target.checked);
        this.setState({
            ...this.state,
            [type]: event.target.checked
        })
    }

    openNote = (note) => {
        console.log('clicked on a note icon');
        this.props.dispatch({
            type: 'SET_BOOK_NOTES',
            payload: {
                notes: note,
                bookId: this.props.edit.id
            }
        })
        this.props.dispatch({
            type: 'OPEN_NOTES'
        })
    }

    render() {

        const { classes } = this.props;

        return (
            <div>
                <h1 className={classes.title}>Edit Book</h1>
                {/* {JSON.stringify(this.state)} */}
                <Card className={classes.cardItem}  >
                    <div className={classes.topOfCard}>
                        <div className={classes.toggles}>
                            <FormControl component="fieldset" >
                                <FormLabel component="legend">Sections</FormLabel>
                                <FormGroup>
                                    <FormControlLabel
                                        control={<Switch checked={this.state.current ? this.state.current : false} onChange={this.handleToggleChange('current')} value="current" size="small" />}
                                        label="Current Reads"
                                    />
                                    <FormControlLabel
                                        control={<Switch checked={this.state.wish ? this.state.wish : false} onChange={this.handleToggleChange('wish')} value="wish" size="small" />}
                                        label="Wish List"
                                    />
                                    <FormControlLabel
                                        control={
                                            <Switch checked={this.state.nope ? this.state.nope : false} onChange={this.handleToggleChange('nope')} value="nope" size="small" />
                                        }
                                        label="NOPE List"
                                    />
                                </FormGroup>
                                <FormHelperText>Pick only one</FormHelperText>
                            </FormControl>
                        </div>
                        <h4>{this.props.edit.book_title}</h4>
                        <h5>{this.props.edit.book_subtitle}</h5>
                        <p>Author(s): {this.props.edit.book_author}</p>
                        <Rating
                            name={this.props.edit.book_id_on_google}
                            value={this.state.rating}
                            onChange={(event) => this.changeRating(event)}
                        />
                        <p>Pages: {this.props.edit.page_total}</p>
                        {this.props.edit.notes ?
                            <IconButton 
                                aria-label="note" 
                                className={classes.notes}
                                onClick={() => this.openNote(this.props.edit.notes)}
                                >
                                    <NoteIcon fontSize="small" />
                            </IconButton> :
                            <IconButton 
                                aria-label="noteAdd" 
                                className={classes.notes}
                                onClick={() => this.openNote(this.props.edit.notes)}
                                >
                                    <NoteAddIcon fontSize="small" />
                            </IconButton>
                        }
                        <div className={classes.notesText}>
                            <h5 className={classes.title}>Notes</h5>
                            <p>{this.props.edit.notes}</p>
                        </div>
                    </div>
                    <div className={classes.bottomOfCard}>
                        <div>
                            <h5 className={classes.title}>Tags</h5>
                        </div>
                        <div className={classes.removeButton}>
                            <Button variant="contained" color="secondary" size="small" onClick={() => this.removeBookFromLibrary(this.props.edit.id)}>
                                Remove From Library
                            <DeleteIcon className={classes.rightIcon} />
                            </Button>
                        </div>
                        <div className={classes.beef}>
                            <Button variant="contained" size="small" color="secondary" onClick={() => { this.cancelEdit() }} >
                                Cancel
                        </Button>
                            <Button variant="contained" size="small" color="primary" onClick={() => { this.saveEdit() }} >
                                Save
                        </Button>
                        </div>
                    </div>
                </Card>
                <Notes />
            </div>
        )
    }
}

const mapStateToProps = (reduxStore) => {
    return {
        edit: reduxStore.library.editBookReducer,
        notesReducer: reduxStore.notes,
        user: reduxStore.user
    }
}

export default withRouter(connect(mapStateToProps)(withStyles(styles)(EditBook)));