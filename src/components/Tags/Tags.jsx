import React, { Component } from 'react';
import { connect } from 'react-redux';



import { withStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';





const styles = theme => ({
    root: {
        flexGrow: 1,
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        // width: '100%'
    },
    mainGrid: {
        width: '100%'
    },
    chip: {
        // color: 'oyster',
    },
    heading: {
        textAlign: 'center',
    },
    fab: {
        marginTop: '50%'
    }
})

class Tags extends Component {

    state = {
        addTag: '',
        editTag: '',
        editTagOpen: false
    }

    componentDidMount() {
        this.getTags();
    }

    getTags = () => {
        this.props.dispatch({
            type: 'FETCH_TAGS'
        })
    }

    handleTagDelete = (id) => {
        console.log('gonna delete the chip of ID:', id);
        this.props.dispatch({
            type: 'REMOVE_TAG',
            payload: { tagId: id }
        })
    }

    handleTagClick = (tag) => {
        console.log('clicked the chip id:', tag.id);
        this.setState({
            ...this.state,
            editTag: tag.tag_name,
            editTagOpen: true
        })
    }

    setAddInput = (event) => {
        //sets our input to state
        this.setState({
            ...this.state,
            addTag: event.target.value
        })
    }

    addTag = () => {
        console.log('clicked on the add button(s)');
        this.props.dispatch({
            type: 'ADD_TAG',
            payload: this.state
        })
        this.setState({
            addTag: '',
            editTag: '',
            editTagOpen: false
        })
    }

    editTagName = (event) => {
        console.log('typing edit box');
        this.setState({
            ...this.state,
            editTag: event.target.value
        })
    };

    handleCancelEdit = () => {
        console.log('clicked cancel');
        this.setState({
            addTag: '',
            editTag: '',
            editTagOpen: false
        })
    }

    handleSaveEdit = () => {
        console.log('clicked save');

        this.props.dispatch({
            type: 'UPDATE_TAG',
            payload: this.state
        })
        
        this.setState({
            addTag: '',
            editTag: '',
            editTagOpen: false
        })
    }

    render() {

        const { classes } = this.props;


        let userTags = this.props.tags.tagsReducer.map((tag) => {
            return (
                <Grid item key={tag.id}>
                    <Chip
                        key={tag.id}
                        label={tag.tag_name}
                        onDelete={() => this.handleTagDelete(tag.id)}
                        onClick={() => this.handleTagClick(tag)}
                        className={classes.chip}
                        color="primary"
                    />
                </Grid>
            )
        })


        return (
            <div>
                <Grid container spacing={0} justify={'center'} alignItems={'center'} direction={'column'} className={classes.mainGrid}>
                    <Grid item className={classes.heading}>
                        <h3>Edit/Add/Remove Tags</h3>
                        <p>Click on a tag to edit it. Click on the X to delete it.</p>
                        <p>Or use the input below to add a new Tag!</p>
                    </Grid>
                    <Grid container direction="row" spacing={2} justify="center">
                        <Grid item md={10}>
                            {/* <form onSubmit={this.searchForBooks}> */}
                            <TextField
                                id="outlined-helperText"
                                label="Add Tag"
                                value={this.state.addTag}
                                className={classes.textField}
                                margin="normal"
                                variant="outlined"
                                onChange={this.setAddInput}
                            />
                        </Grid>
                        <Grid item>
                            <Fab color="primary" aria-label="add" className={classes.fab} onClick={this.addTag} size="small">
                                <AddIcon />
                            </Fab>
                            {/* </form> */}
                        </Grid>
                    </Grid>
                    <Grid item container direction="row" spacing={2} justify="center">
                        {/* this is just a demo tag */}
                        {/* <Chip
                        label="Library"
                        onDelete={this.handleTagDelete}
                        onClick={this.handleTagClick}
                        className={classes.chip}
                        color="primary"
                    /> */}
                        {userTags}
                    </Grid>
                </Grid>
                <Dialog
                    onClose={this.handleClose}
                    aria-labelledby="customized-dialog-title"
                    open={this.state.editTagOpen}
                    maxWidth="xs"
                    fullWidth={true}
                    className={classes.noteBox}
                >
                    <DialogTitle className={classes.title}>
                        Edit
                    </DialogTitle>
                    <DialogContent>
                        <Grid container spacing={2} justify={'center'} alignItems={'center'} direction={'column'}>
                            <Grid item>
                                <TextField
                                    id="outlined-name"
                                    label="tagEdit"
                                    fullWidth
                                    className={classes.textField}
                                    value={this.state.editTag}
                                    onChange={this.editTagName}
                                    margin="normal"
                                    variant="outlined"
                                />
                            </Grid>
                        </Grid>
                    </DialogContent>
                    <DialogActions>
                        <Grid item container spacing={2} justify={'center'} alignItems={'center'} direction={'row'}>
                            <Grid item>
                                <Button onClick={() => this.handleCancelEdit()} variant="outlined" color="secondary" className={classes.buttons}>
                                    Cancel
                                </Button>
                            </Grid>
                            <Grid item>
                                <Button onClick={() => this.handleSaveEdit()} variant="outlined" color="primary" className={classes.buttons}>
                                    Save
                                </Button>
                            </Grid>
                        </Grid>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }
}

const mapStateToProps = (reduxStore) => {
    return {
        tags: reduxStore.tags
    }
}

export default connect(mapStateToProps)(withStyles(styles)(Tags));