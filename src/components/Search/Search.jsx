import React, { Component } from 'react';
import { connect } from 'react-redux';

//material ui
import 'typeface-roboto';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import SearchIcon from '@material-ui/icons/Search';
import Grid from '@material-ui/core/Grid';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';

import { borders } from '@material-ui/system';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

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
    },
    tileItem: {
        borderColor: 'text.primary',
        m: 1,
    }

});

class Search extends Component {

    state = {
        search: ''
    }

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
    }

    render() {
        const { classes } = this.props;

        let searchResultsList = this.props.searchResults.map((book, index) => {
            return (
                <GridListTile key={index} cols={1} rows={1} className={classes.tileItem} border={1} >
                    <div>
                        <p>Title: {book.volumeInfo.title}</p>
                        <p>{book.volumeInfo.subtitle}</p>
                        <img src={book.volumeInfo.imageLinks && book.volumeInfo.imageLinks.smallThumbnail} alt={book.volumeInfo.title} />
                        <p>Authors: {book.volumeInfo.authors && book.volumeInfo.authors[0]}</p>
                        <p>Pages: {book.volumeInfo.pageCount}</p>
                    </div>
                </GridListTile>
            )
        })

        return (
            <>
                <h1>Search</h1>
                <div className={classes.root}>
                    <Grid container direction="row" spacing={2} justify="center">
                        <Grid item xl={12}>
                            {/* <form onSubmit={this.searchForBooks}> */}
                                <TextField
                                    id="outlined-helperText"
                                    label="Search"
                                    defaultValue=""
                                    className={classes.textField}
                                    helperText="Search by title and/or author!"
                                    margin="normal"
                                    variant="outlined"
                                    onChange={this.setSearch}
                                />
                                <Fab color="primary" aria-label="add" className={classes.fab} onClick={this.searchForBooks}>
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

            </>
        )
    }
}

const mapStateToProps = (reduxStore) => {
    return {
        searchResults: reduxStore.searchResults
    }
}

export default connect(mapStateToProps)(withStyles(styles)(Search));