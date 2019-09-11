import React, { Component } from 'react';
import { connect } from 'react-redux';

//material ui
import 'typeface-roboto';
import { withStyles } from '@material-ui/core/styles';

import Fab from '@material-ui/core/Fab';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';


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

    }

});

class MyLibrary extends Component {
    //go get library on mount
    componentDidMount() {
        this.getLibrary();
    }

    getLibrary = () => {
        this.props.dispatch({
            type: 'FETCH_LIBRARY'
        })
    }

    render() {
        const { classes } = this.props;

        let libraryResults = this.props.library.map((book, index) => {
            return ( 
                <GridListTile key={index} cols={1} rows={1} className={classes.tileItem}  >
                    <div>
                        <h4>{book.book_title}</h4>
                        <h5>{book.book_subtitle}</h5>
                        <img src={book.book_image_url} alt={book.book_title} />
                        <p>Author(s): {book.book_author}</p>
                        <p>Pages: {book.page_total}</p>
                        {/* <Fab color="secondary" aria-label="add" className={classes.fab} onClick={() => this.addBookToLibrary(book)} size="small">
                            <AddCircleOutlineIcon fontSize="small" />
                        </Fab> */}
                    </div>
                </GridListTile>
            )
        })


        return (
            <div className={classes.root}>
                <h1>My Library</h1>
                    {this.props.library &&
                    <GridList
                        cols={1}
                        cellHeight={'auto'}
                        spacing={15}
                        className={classes.gridList}
                    >
                        {libraryResults}
                    </GridList>}
            </div>
        )
    }
}

const mapStateToProps = (reduxStore) => {
    return {
        library: reduxStore.library
    }
}

export default connect(mapStateToProps)(withStyles(styles)(MyLibrary));