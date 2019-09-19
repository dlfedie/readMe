import React, { Component } from 'react';
import { connect } from 'react-redux';



import { withStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';




const styles = theme => ({
    chip: {
        // color: 'oyster',
    },
    heading: {
        textAlign: 'center',
    }
})

class Tags extends Component {

    state = {
        addTag: ''
    }

    componentDidMount() {
        this.getTags();
    }

    getTags = () => {
        this.props.dispatch({
            type: 'FETCH_TAGS'
        })
    }

    handleTagDelete = () => {
        console.log('gonna delete the chip!');

    }

    handleTagClick = () => {
        console.log('clicked the chip!!');

    }

    setAdd = (event) => {
        //sets our input to state
        this.setState({
            addTag: event.target.value
        })
    }

    addTag = () => {
        console.log('clicked on the add button(s)');
        
    }

    render() {

        const { classes } = this.props;





        return (
            <Grid container spacing={2} justify={'center'} alignItems={'center'} direction={'column'}>
                <Grid item className={classes.heading}>
                    <h3>Edit/Add/Remove Tags</h3>
                    <p>Click on a tag to edit it. Click on the X to delete it.</p>
                    <p>Or use the input below to add a new Tag!</p>
                </Grid>
                <Grid container direction="row" spacing={2} justify="center">
                    <Grid item xl={12}>
                        {/* <form onSubmit={this.searchForBooks}> */}
                        <TextField
                            id="outlined-helperText"
                            label="Add Tag"
                            value={this.state.addTag}
                            className={classes.textField}
                            margin="normal"
                            variant="outlined"
                            onChange={this.setAdd}
                        />
                    </Grid>
                    <Grid item>
                        <Fab color="primary" aria-label="add" className={classes.fab} onClick={this.addTag} size="small">
                            <AddIcon  />
                        </Fab>
                        {/* </form> */}
                    </Grid>
                </Grid>
                <Grid item>
                    <Chip
                        label="Library"
                        onDelete={this.handleTagDelete}
                        onClick={this.handleTagClick}
                        className={classes.chip}
                        color="primary"
                    />
                </Grid>
            </Grid>

        )
    }
}

const mapStateToProps = (reduxStore) => {
    return {
        tags: reduxStore.tags
    }
}

export default connect(mapStateToProps)(withStyles(styles)(Tags));