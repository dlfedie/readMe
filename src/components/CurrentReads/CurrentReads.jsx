import React, { Component } from 'react';
import { connect } from 'react-redux';
import LibraryItem from '../LibraryItem/LibraryItem';
import Notes from '../Notes/Notes';
import SnackbarNotifications from '../SnackbarNotifications/SnackbarNotifications';


//material ui
import 'typeface-roboto';
import { withStyles } from '@material-ui/core/styles';

import GridList from '@material-ui/core/GridList';


const styles = theme => ({

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
        width: '90%',
        height: 'auto',
        justifyContent: 'center',
        display: 'flex',
        spacing: 1,
    },
    tileItem: {
        borderColor: 'text.primary',
        height: 'auto',
        width: '90%',
        border: 1,
        borderStyle: 'solid',
        margin: theme.spacing(1),
        justifyContent: 'center',

    }

});


class CurrentReads extends Component {

    componentDidMount() {
        this.getLibrary();
        this.props.dispatch({
            type: 'SET_BOOK_CLICKED',
            payload: ''
        })
    }

    getLibrary = () => {
        this.props.dispatch({
            type: 'FETCH_LIBRARY'
        })
        // window.scrollTo(0, this.props.history);
        if (this.props.bookOn && this.props.library) {
            document.getElementById(this.props.bookOn).scrollIntoView();
        }
        this.props.dispatch({
            type: 'SET_BOOK_CLICKED',
            payload: ''
        })
    }

    render() {
        const { classes } = this.props;

        let libraryResults = this.props.library.map((book) => {
            if(book.currently_reading)
            return (
                <LibraryItem book={book} key={book.id} className={classes.tileItem} />
            ); else return false
        })


        return (
            <div className={classes.root}>
                <h1 id="topOfPage">Current Reads</h1>
                {this.props.library &&
                    <GridList
                        cols={1}
                        cellHeight={'auto'}
                        spacing={15}
                        className={classes.gridList}
                    >
                        {libraryResults}
                    </GridList>}
                <Notes />
                <SnackbarNotifications />
            </div>
            
        )
    }
}

const mapStateToProps = reduxStore => ({
    library: reduxStore.library.libraryReducer,
    bookOn: reduxStore.library.bookOnReducer,
    user: reduxStore.user,
});

export default connect(mapStateToProps)(withStyles(styles)(CurrentReads));