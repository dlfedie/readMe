import React, { Component } from 'react';
import { connect } from 'react-redux';
import LibraryItem from '../LibraryItem/LibraryItem';
import Notes from '../Notes/Notes';

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
    render() {
        const { classes } = this.props;

        return (
            <h1>Currently Beef</h1>
        )
    }
}

const mapStateToProps = reduxStore => ({
    user: reduxStore.user,
});

export default connect(mapStateToProps)(withStyles(styles)(CurrentReads));