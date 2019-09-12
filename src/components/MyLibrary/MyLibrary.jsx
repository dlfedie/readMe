import React, { Component } from 'react';
import { connect } from 'react-redux';
import LibraryItem from '../LibraryItem/LibraryItem';

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
        // maxWidth: '80%',
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

    // removeBookFromLibrary = (id) => {
    //     console.log('clicked on delete for book ID:', id);
    //     this.props.dispatch({
    //         type: 'DELETE_BOOK',
    //         payload: {bookIdToDelete: id}
    //     })
    // }

    // changeRating = (event) => {
    //     console.log('changing rating of book id, value:', event);
        
    // }

    render() {
        const { classes } = this.props;

        let libraryResults = this.props.library.map((book, index) => {
            return ( 
                <LibraryItem book={book} key={index} className={classes.tileItem}/>
                // <GridListTile key={index} cols={1} rows={1} className={classes.tileItem}  >
                //     <div>
                //         <h4>{book.book_title}</h4>
                //         <h5>{book.book_subtitle}</h5>
                //         <img src={book.book_image_url} alt={book.book_title} />
                //         <Rating
                //             name={book.book_title}
                //             value={book.rating}
                //             onChange={(event) => this.changeRating(book.id)}
                //         />
                //         <p>Author(s): {book.book_author}</p>
                //         <p>Pages: {book.page_total}</p>
                //         <Fab color="secondary" aria-label="remove" className={classes.fab} onClick={() => this.removeBookFromLibrary(book.id)} size="small">
                //             <DeleteIcon fontSize="small" />
                //         </Fab>
                //     </div>
                // </GridListTile>
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