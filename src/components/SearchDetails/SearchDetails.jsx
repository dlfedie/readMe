import React, { Component } from 'react';
import { connect } from 'react-redux';
import SnackbarNotifications from '../SnackbarNotifications/SnackbarNotifications';

import { withStyles } from '@material-ui/core/styles';

import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import Fab from '@material-ui/core/Fab';
import Grid from '@material-ui/core/Grid';



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
    titleCard: {
        // display: 'left',
        // textAlign: 'left',
    },
    imageCard: {
        justifyContent: 'right',
        float: 'right',
        padding: '10px'
    },
    summaryText: {
        // display: 'inline',
        maxHeight: 200,
        overflow: 'auto'
    },
    gridContainer: {
        padding: '2%'
    },
    gridItem: {
        width: '95%'
    },
    fab: {
        margin: '3%'
    }


});

class SearchDetails extends Component {

    componentDidMount() {
        // this.props.dispatch({
        //     type: 'GET_DETAILS',
        //     payload: this.props.match.params.id
        // })
        window.scrollTo(0, 0);
        // this.props.dispatch({
        //     type: 'SET_BOOK_CLICKED',
        //     payload: this.props.match.params.id
        // })
    }

    addBookToLibrary = (book) => {
        console.log('clicked on the add button!', book);
        //books are in our search reducer. we have the book here, and then do a POST to our db with that request

        this.props.dispatch({
            type: 'ADD_BOOK_TO_LIBRARY',
            payload: book
        });

        this.props.dispatch({
            type: 'SET_SNACKBAR_TEXT',
            payload: { notificationText: 'Successfully added book to Library!' }
        });

        this.props.dispatch({
            type: 'SNACKBAR_TRUE'
        });
    }

    render() {

        const { classes } = this.props;

        return (
            <div>

                <h1 className={classes.title}>Book Details</h1>
                <Card className={classes.cardItem}  >
                    <Grid container direction={'column'} justify={'center'} alignItems={'center'} spacing={0} className={classes.gridContainer}>
                        <Grid item className={classes.gridItem}>
                            <div className={classes.topOfCard}>
                                <img className={classes.imageCard} src={this.props.book.volumeInfo.imageLinks.smallThumbnail} alt={this.props.book.volumeInfo.title} />

                                <h4>{this.props.book.volumeInfo.title}</h4>
                                <h5>{this.props.book.volumeInfo.subtitle}</h5>
                                <p>Author(s): {this.props.book.volumeInfo.authors.map((author, index) => { return (<span key={index}>{author} </span>) })}</p>
                                <p>Pages: {this.props.book.volumeInfo.pageCount}</p>
                            </div>
                        </Grid>
                        <Grid item>
                            <div className={classes.summaryText}>
                                <h5 className={classes.title}>Summary</h5>
                                <p>{this.props.book.volumeInfo.description}</p>
                            </div>
                        </Grid>
                        <Grid item container direction={'row'} justify={'center'} alignItems={'center'}>
                            <Fab color="secondary" aria-label="add" className={classes.fab} onClick={() => this.addBookToLibrary(this.props.book)} size="small">
                                <AddCircleOutlineIcon fontSize="small" />
                            </Fab>
                            <Button className={classes.fab} variant="contained" size="small" color="primary" onClick={() => this.props.history.push('/search')}>
                                Back
                            </Button>
                        </Grid>
                    </Grid>

                </Card>
                <SnackbarNotifications />
            </div>
        )
    }
}

const mapStateToProps = (reduxStore) => {
    return {
        book: reduxStore.searchResults.searchDetails
    }
}

export default connect(mapStateToProps)(withStyles(styles)(SearchDetails));