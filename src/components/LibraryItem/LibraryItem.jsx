import React, {Component} from 'react';
import { connect } from 'react-redux';


//material ui
import 'typeface-roboto';
import { withStyles } from '@material-ui/core/styles';

import Fab from '@material-ui/core/Fab';
import GridListTile from '@material-ui/core/GridListTile';
import DeleteIcon from '@material-ui/icons/Delete';
import Rating from '@material-ui/lab/Rating';



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
    
    tileItem: {
        borderColor: 'text.primary',
        height: 'auto',
        width: '90%',
        // maxWidth: '90%',
        border: 1,
        borderStyle: 'solid',
        margin: theme.spacing(1),
        justifyContent: 'space-around',

    }

});

class LibraryItem extends Component {

    removeBookFromLibrary = (id) => {
        console.log('clicked on delete for book ID:', id);
        this.props.dispatch({
            type: 'DELETE_BOOK',
            payload: { bookIdToDelete: id }
        })
    }

    changeRating = (event) => {
        console.log('changing rating of book id, value:', event.target.value, this.props.book.id);
        this.props.dispatch({
            type: 'UPDATE_RATING',
            payload: {
                value: event.target.value,
                bookId: this.props.book.id
            }
        })

    }


    render() {
        const { classes } = this.props;

        return (
            <GridListTile key={this.props.index} cols={1} rows={1} className={classes.tileItem}  >
                <div>
                    <h4>{this.props.book.book_title}</h4>
                    <h5>{this.props.book.book_subtitle}</h5>
                    <img src={this.props.book.book_image_url} alt={this.props.book.book_title} />
                    <Rating
                        name={JSON.stringify(this.props.book.id)}
                        value={this.props.book.rating}
                        onChange={(event) => this.changeRating(event)}
                    />
                    <p>Author(s): {this.props.book.book_author}</p>
                    <p>Pages: {this.props.book.page_total}</p>
                    <Fab color="secondary" aria-label="remove" className={classes.fab} onClick={() => this.removeBookFromLibrary(this.props.book.id)} size="small">
                        <DeleteIcon fontSize="small" />
                    </Fab>
                </div>
            </GridListTile>
        )
    }
}



export default connect()(withStyles(styles)(LibraryItem));
