import React, { Component } from 'react';
//material ui
import 'typeface-roboto';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import SearchIcon from '@material-ui/icons/Search';


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
});

class Search extends Component {

    searchForBooks = () => {
        console.log('clicked on the search icon!');
        this.props.dispatch({
            type: 'SEARCH_FOR_BOOKS',
            payload: 'the hobbit'
        })
    }

    render() {
        const { classes } = this.props;

        return (
            <>
                <h1>Search</h1>
                <div>
                    <TextField
                        id="outlined-helperText"
                        label="Search"
                        defaultValue=""
                        className={classes.textField}
                        helperText="Search by title, author, category, or all three!"
                        margin="normal"
                        variant="outlined"
                    />
                    <Fab color="primary" aria-label="add" className={classes.fab} onClick={this.searchForBooks}>
                        <SearchIcon />
                    </Fab>
                </div>

            </>
        )
    }
}

export default (withStyles(styles)(Search));