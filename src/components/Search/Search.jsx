import React, { Component } from 'react';
import { connect } from 'react-redux';

import SnackbarNotifications from '../SnackbarNotifications/SnackbarNotifications';

//material ui
import 'typeface-roboto';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import SearchIcon from '@material-ui/icons/Search';
import Grid from '@material-ui/core/Grid';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import Button from '@material-ui/core/Button';

//basic class component. what we've been taught, so I'll start here.


//material!
const styles = theme => ({
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
    },
    fab: {
        margin: theme.spacing(1),
    },
    detailsButton: {
        margin: theme.spacing(1),
    },
    root: {
        flexGrow: 1,
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
    },
    gridList: {
        width: 'auto',
        height: 'auto',
        justifyContent: 'center',
        display: 'flex',
        spacing: 1,
    },
    tileItem: {
        borderColor: 'text.primary',
        height: 'auto',
        maxWidth: '80%',
        border: 1,
        borderStyle: 'solid',
        margin: theme.spacing(1),
        justifyContent: 'center',

    },
    fabSearch: {
        marginTop: '6%'
    },
    // searchForm: {
    //     width: '90%',
    //     float: 'center'
    // }

});

class Search extends Component {

    state = {
        search: ''
    }

    // componentDidMount() {
    //     this.props.dispatch({
    //         type: 'SNACKBAR_TRUE'
    //     });
    // }

    setSearch = (event) => {
        // console.log(event.target.value);
        //sets our input to state
        this.setState({
            search: event.target.value
        })
    }

    searchForBooks = (event) => {
        event.preventDefault();
        console.log('clicked on the search icon!');
        this.props.dispatch({
            type: 'SEARCH_FOR_BOOKS',
            payload: { search: this.state.search }
        })
        this.setState({
            search: ''
        })
    }

    addBookToLibrary = (book) => {
        console.log('clicked on the add button!', book);
        //books are in our search reducer. we have the book here, and then do a POST to our db with that request

        this.props.dispatch({
            type: 'ADD_BOOK_TO_LIBRARY',
            payload: book
        })

        this.props.dispatch({
            type: 'SET_SNACKBAR_TEXT',
            payload: { notificationText: 'Successfully added book to Library!' }
        })

        this.props.dispatch({
            type: 'SNACKBAR_TRUE'
        });
    }

    getSearchBookDetails = (book) => {
        console.log('clicked on a book on the search page, ID:', book.id);
        this.props.dispatch({
            type: 'SET_SEARCH_DETAILS_PAGE',
            payload: book
        })
        this.props.history.push('/searchdetails')

    }

    render() {
        const { classes } = this.props;

        let searchResultsList = this.props.searchResults.map((book, index) => {
            return (
                <GridListTile key={index} cols={1} rows={1} className={classes.tileItem}  >
                    <div>
                        <h4>{book.volumeInfo.title}</h4>
                        <h5>{book.volumeInfo.subtitle}</h5>
                        <img src={book.volumeInfo.imageLinks && book.volumeInfo.imageLinks.smallThumbnail} alt={book.volumeInfo.title} />
                        <p>Author(s): {book.volumeInfo.authors && book.volumeInfo.authors.map((author, index) => { return (<span key={index}>{author} </span>) })}</p>
                        <p>Pages: {book.volumeInfo.pageCount}</p>
                        <Fab color="secondary" aria-label="add" className={classes.fab} onClick={() => this.addBookToLibrary(book)} size="small">
                            <AddCircleOutlineIcon fontSize="small" />
                        </Fab>
                        <Button
                            variant="contained"
                            size="small"
                            color="primary"
                            className={classes.detailsButton}
                            onClick={() => this.getSearchBookDetails(book)}>
                            Details
                        </Button>
                    </div>
                </GridListTile>
            )
        })

        return (
            <>
                <div className={classes.root}>
                    <h1 className={classes.sectionHeader}>Search</h1>
                    <p>Search below for books to add to your library</p>
                    <Grid container direction="row" spacing={2} justify="center">
                        <Grid item xl={12}>
                            {/* <form onSubmit={this.searchForBooks} className={classes.searchForm}> */}
                            <TextField
                                id="outlined-helperText"
                                label="Search"
                                value={this.state.search}
                                className={classes.textField}
                                helperText="Search by title and/or author!"
                                margin="normal"
                                variant="outlined"
                                onChange={this.setSearch}
                                autoComplete="off"
                            />
                            <Fab color="primary" aria-label="add" className={classes.fabSearch} onClick={this.searchForBooks}>
                                <SearchIcon />
                            </Fab>

                            {/* </form> */}
                        </Grid>
                    </Grid>
                    {this.props.searchResults &&
                        <GridList
                            cols={1}
                            cellHeight={'auto'}
                            spacing={15}
                            className={classes.gridList}
                        >
                            {searchResultsList}
                        </GridList>}
                    {/* {JSON.stringify(this.props.searchResults)} */}
                </div>
                <SnackbarNotifications />
            </>
        )
    }
}

const mapStateToProps = (reduxStore) => {
    return {
        searchResults: reduxStore.searchResults.searchReducer,
        user: reduxStore.user
    }
}

export default connect(mapStateToProps)(withStyles(styles)(Search));