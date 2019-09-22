import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from "react-router";



//material ui
import 'typeface-roboto';
import { withStyles } from '@material-ui/core/styles';

import GridListTile from '@material-ui/core/GridListTile';
import Rating from '@material-ui/lab/Rating';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import NoteIcon from '@material-ui/icons/Note';
import NoteAddIcon from '@material-ui/icons/NoteAdd';
import Grid from '@material-ui/core/Grid';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';


const styles = theme => ({
    root: {
        flexGrow: 1,
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
    },

    tileItem: {
        borderColor: 'text.primary',
        height: 'auto',
        width: '90%',
        // maxWidth: '90%',
        border: 1,
        borderStyle: 'solid',
        margin: theme.spacing(1),
        justifyContent: 'space-around',
    },
    centerMe: {
        textAlign: 'center'
    },
    ratingHeader: {
        textAlign: 'center',
        color: '#015384'
    },
    padMe: {
        paddingLeft: '5%'
    },
    rating: {
        marginTop: 'auto',
        marginBottom: 'auto',
        // paddingLeft: '10%'
    },
    imageAndRating: {
        display: 'flex'
    },
    editButton: {
        margin: '5%',
        float: 'center',
        justifyContent: 'center',
        display: 'center',
        alignContent: 'center',
    },
    ranks: {
        width: '80%'
    }

});

class LibraryItem extends Component {


    getBookDetails = (id) => {
        console.log('clicked on book ID:', id);
        //attempting to pull focus when users go back to library
        this.props.dispatch({
            type: 'SET_BOOK_CLICKED',
            payload: id
        })

        this.props.history.push(`/librarydetails/${id}`);
    }

    editBook = (book) => {
        console.log('clicked on book ID:', book.id);
        //attempting to pull focus when users go back to library
        this.props.dispatch({
            type: 'SET_EDITS',
            payload: book
        })

        this.props.history.push(`/editbook/${book.id}`);
    }

    openNote = (note) => {
        console.log('clicked on a note icon', note);
        this.props.dispatch({
            type: 'SET_BOOK_NOTES',
            payload: {
                notes: note,
                bookId: this.props.book.id
            }
        })
        this.props.dispatch({
            type: 'OPEN_NOTES'
        })
    }

    rankUp = (id) => {
        console.log('clicked on rank up of book id:', id);
        this.props.dispatch({
            type: 'RANK_UP_WISH',
            payload: id
        })
        this.props.dispatch({
            type: 'SET_SNACKBAR_TEXT',
            payload: { notificationText: 'Moved book up a rank.' }
        });

        this.props.dispatch({
            type: 'SNACKBAR_TRUE'
        });
    }

    rankDown = (id) => {
        console.log('clicked on rank down of book id:', id);
        this.props.dispatch({
            type: 'RANK_DOWN_WISH',
            payload: id
        })
        this.props.dispatch({
            type: 'SET_SNACKBAR_TEXT',
            payload: { notificationText: 'Moved book down a rank.' }
        });

        this.props.dispatch({
            type: 'SNACKBAR_TRUE'
        });
    }


    render() {
        const { classes } = this.props;

        return (
            <>
                <GridListTile key={this.props.book.id} id={this.props.book.id} cols={1} rows={1} className={classes.tileItem}  >
                    <div>
                        <div>
                            <h4 className={classes.centerMe}>{this.props.book.book_title}</h4>
                            <h5 className={classes.centerMe}>{this.props.book.book_subtitle}</h5>
                        </div>
                        <div className={classes.imageAndRating}>
                            <img src={this.props.book.book_image_url} alt={this.props.book.book_title} className={classes.padMe} />
                            <Grid container direction={'column'} justify={'center'} alignItems={'center'}>
                                {this.props.history.location.pathname === '/wishlist' &&
                                    <Grid item container direction={'row'} justify={'center'} alignItems={'center'} spacing={0} className={classes.rankings}>
                                        <h4 className={classes.ratingHeader}>Wish List Rank: {this.props.book.wish_rank}</h4>
                                        <IconButton
                                            aria-label="rankUp"
                                            className={classes.ranks}
                                            onClick={() => this.rankUp(this.props.book.id)}
                                        >
                                            <ArrowUpwardIcon fontSize="small" />
                                        </IconButton>
                                        <span>change rank</span>
                                        <IconButton
                                            aria-label="rankUp"
                                            className={classes.ranks}
                                            onClick={() => this.rankDown(this.props.book.id)}
                                        >
                                            <ArrowDownwardIcon fontSize="small" />
                                        </IconButton>
                                    </Grid>}
                                <Grid item>
                                    <Rating
                                        name={JSON.stringify(this.props.book.id)}
                                        value={this.props.book.rating}
                                        readOnly
                                        className={classes.rating}
                                    />
                                </Grid>
                                <Grid item>
                                    {this.props.book.notes ?
                                        <IconButton
                                            aria-label="note"
                                            className={classes.notes}
                                            onClick={() => this.openNote(this.props.book.notes)}
                                        >
                                            <NoteIcon fontSize="large" color="primary" />
                                        </IconButton> :
                                        <IconButton
                                            aria-label="noteAdd"
                                            className={classes.notes}
                                            onClick={() => this.openNote(this.props.book.notes)}
                                        >
                                            <NoteAddIcon fontSize="large" color="secondary" />
                                        </IconButton>
                                    }
                                </Grid>
                            </Grid>

                        </div>
                        <div className={classes.padMe}>
                            <p>Author(s): {this.props.book.book_author}</p>
                            <p>Pages: {this.props.book.page_total}</p>
                        </div>
                        <div>
                            <Button
                                variant="contained"
                                size="small"
                                color="secondary"
                                className={classes.editButton}
                                onClick={() => this.getBookDetails(this.props.book.id)}>
                                Details
                        </Button>
                            <Button
                                variant="contained"
                                size="small"
                                color="primary"
                                className={classes.editButton}
                                onClick={() => this.editBook(this.props.book)}>
                                Edit
                        </Button>
                        </div>
                    </div>
                </GridListTile>
            </>
        )
    }
}



export default withRouter(connect()(withStyles(styles)(LibraryItem)));
