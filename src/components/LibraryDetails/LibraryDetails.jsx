import React, { Component } from 'react';
import { connect } from 'react-redux';

import { withStyles } from '@material-ui/core/styles';
import Rating from '@material-ui/lab/Rating';

import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
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
        backgroundColor: '#e7f7fe'

    },
    title: {
        display: 'center',
        textAlign: 'center'
    },
    textNextToImage: {
        paddingLeft: '8px'
    },
    imageCard: {
        padding: '8px'
    },
    summaryText: {
        maxHeight: 200,
        overflow: 'auto',
        padding: '8px'
    },
    notesText: {
        padding: '8px'
    },
    backButton: {
        justifyContent: 'center',
        margin: '8px'
    }

});

class LibraryDetails extends Component {

    componentDidMount() {
        this.props.dispatch({
            type: 'GET_DETAILS',
            payload: this.props.match.params.id
        })
        window.scrollTo(0, 0);
        this.props.dispatch({
            type: 'SET_BOOK_CLICKED',
            payload: this.props.match.params.id
        })
    }

    render() {

        const { classes } = this.props;

        return (
            <div>
                <h1 className={classes.title}>Book Details</h1>
                <Card className={classes.cardItem}  >
                    <div className={classes.topOfCard}>
                        <Grid container spacing={1} justify={'space-evenly'} alignItems={'center'} direction={'row'}>
                            <Grid item xs className={classes.imageCard}>
                                <h4 className={classes.textNextToImage}>{this.props.book.book_title}</h4>
                                <h5 className={classes.textNextToImage}>{this.props.book.book_subtitle}</h5>
                                <p className={classes.textNextToImage}>Author(s): {this.props.book.book_author}</p>
                                <Rating
                                    name={JSON.stringify(this.props.book.id)}
                                    value={this.props.book.rating}
                                    readOnly
                                    className={classes.textNextToImage}
                                />
                                <p className={classes.textNextToImage}>Pages: {this.props.book.page_total}</p>
                            </Grid>
                            <Grid item xs>
                                <img className={classes.imageCard} src={this.props.book.book_image_url} alt={this.props.book.book_title} />
                            </Grid>
                        </Grid>
                    </div>
                    <div className={classes.summaryText}>
                        <h5 className={classes.title}>Summary</h5>
                        <p>{this.props.book.book_summary}</p>
                    </div>
                    <div className={classes.notesText}>
                        <h5 className={classes.title}>Notes</h5>
                        <p>{this.props.book.notes}</p>
                    </div>
                    <Button 
                        variant="contained" 
                        size="small" 
                        color="primary"
                        className={classes.backButton}
                        onClick={() => this.props.history.goBack()}>
                            Back
                    </Button>
                </Card>
            </div>
        )
    }
}

const mapStateToProps = (reduxStore) => {
    return {
        book: reduxStore.library.detailsReducer
    }
}

export default connect(mapStateToProps)(withStyles(styles)(LibraryDetails));