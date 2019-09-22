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


class WishList extends Component {

    componentDidMount() {
        this.getWishList();
        this.props.dispatch({
            type: 'SET_BOOK_CLICKED',
            payload: ''
        })
    }

    getWishList = () => {
        this.props.dispatch({
            type: 'FETCH_WISH_LIST'
        })
        if (this.props.bookOn && this.props.wishList) {
            document.getElementById(this.props.bookOn).scrollIntoView();
        }
        this.props.dispatch({
            type: 'SET_BOOK_CLICKED',
            payload: ''
        })
    }

    render() {
        const { classes } = this.props;

        let libraryResults = this.props.wishList.map((book) => {
                return (
                    <LibraryItem book={book} key={book.id} className={classes.tileItem} wish_list={book.wish_list} />
                )
        })

        return (
            <div className={classes.root}>
                <h1 id="topOfPage">Wish List</h1>
                {/* {JSON.stringify(this.props.history.location.pathname)} */}

                {this.props.wishList &&
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
    wishList: reduxStore.library.wishListReducer,
});

export default connect(mapStateToProps)(withStyles(styles)(WishList));