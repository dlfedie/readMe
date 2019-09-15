import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from "react-router";


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

    componentDidMount() {
        // window.scrollTo(0, 0);
        this.props.dispatch({
            type: 'SET_BOOK_CLICKED',
            payload: this.props.match.params.id
        })
    }

    cancelEdit = () => {
        console.log('clicked cancel button');
        this.props.history.goBack();

    }

    saveEdit = () => {
        console.log('clicked save button');

    }

    removeBookFromLibrary = (id) => {
        console.log('clicked on delete for book ID:', id);
        this.props.dispatch({
            type: 'DELETE_BOOK',
            payload: { bookIdToDelete: id }
        })
    }

    changeRating = (event) => {
        console.log('changing rating of book id, value:', event.target.value, this.props.edit.id);
        this.props.dispatch({
            type: 'UPDATE_RATING',
            payload: {
                value: event.target.value,
                bookId: this.props.edit.id
            }
        })
    }

    handleToggleChange = (type) => (event) => {
        console.log('toggling:', type, 'to:', event.target.checked);

    }

    render() {

        const { classes } = this.props;

        return (
            <div>
                <h1 className={classes.title}>Edit Book</h1>
                <Card className={classes.cardItem}  >
                    <div className={classes.topOfCard}>
                        {/* <img className={classes.imageCard} src={this.props.edit.book_image_url} alt={this.props.edit.book_title} /> */}
                        <div className={classes.toggles}>
                            <FormControl component="fieldset" >
                                <FormLabel component="legend">Sections</FormLabel>
                                <FormGroup>
                                    <FormControlLabel
                                        control={<Switch checked={this.props.edit.currently_reading} onChange={this.handleToggleChange('current')} value="current" size="small" />}
                                        label="Current Reads"
                                    />
                                    <FormControlLabel
                                        control={<Switch checked={this.props.edit.wish_list} onChange={this.handleToggleChange('wish')} value="wish" size="small" />}
                                        label="Wish List"
                                    />
                                    <FormControlLabel
                                        control={
                                            <Switch checked={this.props.edit.nope_list} onChange={this.handleToggleChange('nope')} value="nope" size="small" />
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
                            name={JSON.stringify(this.props.edit.id)}
                            value={this.props.edit.rating}
                            onChange={(event) => this.changeRating(event)}
                        />
                        <p>Pages: {this.props.edit.page_total}</p>
                        {this.props.edit.notes ?
                            <IconButton aria-label="note" className={classes.notes}>
                                <NoteIcon fontSize="small" />
                            </IconButton> :
                            <IconButton aria-label="noteAdd" className={classes.notes}>
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
                            <Button variant="contained" color="secondary" size="small">
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

            </div>
        )
    }
}

const mapStateToProps = (reduxStore) => {
    return {
        edit: reduxStore.library.editBookReducer
    }
}

export default withRouter(connect(mapStateToProps)(withStyles(styles)(EditBook)));