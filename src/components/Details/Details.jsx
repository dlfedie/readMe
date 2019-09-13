import React, { Component } from 'react';
import { connect } from 'react-redux';

import { withStyles } from '@material-ui/core/styles';
import Rating from '@material-ui/lab/Rating';

import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
// import CardHeader from '@material-ui/core/CardHeader';
// import CardMedia from '@material-ui/core/CardMedia';
// import CardContent from '@material-ui/core/CardContent';
// import CardActions from '@material-ui/core/CardActions';

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
        // float: 'top',
        padding: '10px'
        // position: 'absolute',
        // right: '0px'
    },
    summaryText: {
        maxHeight: 200,
        overflow: 'auto'
    }

});

class Details extends Component {

    componentDidMount() {
        this.props.dispatch({
            type: 'GET_DETAILS',
            payload: this.props.match.params.id
        })
        window.scrollTo(0,0);
    }

    render() {

        const { classes } = this.props;

        return (
            <div>
                <h1 className={classes.title}>Book Details</h1>
                <Card className={classes.cardItem}  >
                    <div className={classes.topOfCard}>
                        <img className={classes.imageCard} src={this.props.book.book_image_url} alt={this.props.book.book_title} />

                        <h4>{this.props.book.book_title}</h4>
                        <h5>{this.props.book.book_subtitle}</h5>
                        <p>Author(s): {this.props.book.book_author}</p>
                        <Rating
                            name={JSON.stringify(this.props.book.id)}
                            value={this.props.book.rating}
                            readOnly
                        />
                        <p>Pages: {this.props.book.page_total}</p>
                    </div>
                    <div className={classes.summaryText}>
                        <h5 className={classes.title}>Summary</h5>
                        <p>{this.props.book.book_summary}</p>
                    </div>
                    <Button variant="contained" size="small" color="primary" onClick={()=> this.props.history.push('/library')}>
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

export default connect(mapStateToProps)(withStyles(styles)(Details));