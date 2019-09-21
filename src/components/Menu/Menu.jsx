import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
// import LogOutButton from '../LogOutButton/LogOutButton';



import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import LabelIcon from '@material-ui/icons/Label';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import InfoIcon from '@material-ui/icons/Info';
import NotInterestedIcon from '@material-ui/icons/NotInterested';


//basic class component. what we've been taught, so I'll start here.

const styles = theme => ({
    menu: {
        color: '#a2cf6e',
    },
    list: {
        background: '#e7f7fe',
        backgroundColor: '#e7f7fe'
    },
    paper: {
        background: '#e7f7fe',
        backgroundColor: '#e7f7fe'
    }
})



class Menu extends Component {

    state = {
        left: false
    }


    toggleDrawer = (side, open) => event => {
        console.log('in toggledrawer:', side, open);
        
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        this.setState({ ...this.state, [side]: open });
    };

    goToAbout = () => {
        console.log('clicked about');
        this.props.history.push('/about');
    }

    goToTags = () => {
        console.log('clicked tags');
        this.props.history.push('/tags');
    }

    render() {

        const { classes } = this.props;


        return (
            <>
                <IconButton
                    aria-label="open menu"
                    className={classes.menu}
                    onClick={this.toggleDrawer('left', true)}
                >
                    <MenuIcon />
                </IconButton>
                <Drawer open={this.state.left} onClose={this.toggleDrawer('left', false)} className={classes.drawer}>
                    <div
                        className={classes.list}
                        role="presentation"
                        onClick={this.toggleDrawer('left', false)}
                        onKeyDown={this.toggleDrawer('left', false)}
                    >
                        <List>
                            <ListItem button key={'tags'} onClick={() => this.goToTags()}>
                                <ListItemIcon>
                                    <LabelIcon />
                                </ListItemIcon>
                                <ListItemText primary={'Tags'} />
                            </ListItem>
                            <ListItem button key={'nope list'} >
                                <ListItemIcon>
                                    <NotInterestedIcon />
                                </ListItemIcon>
                                <ListItemText primary={'NOPE List'} />
                            </ListItem>
                        </List>
                        <Divider />
                        <List>
                            <ListItem button key={'about'} onClick={() => this.goToAbout()}>
                                <ListItemIcon>
                                    <InfoIcon />
                                </ListItemIcon>
                                <ListItemText primary={'About'}/>
                            </ListItem>
                            <ListItem button key={'login'} onClick={() => this.props.dispatch({ type: 'LOGOUT' })}>
                                <ListItemIcon>
                                    <ExitToAppIcon />
                                </ListItemIcon>
                                <ListItemText primary={'Logout'} />
                            </ListItem>
                        </List>
                    </div>
                </Drawer>
            </>
        )
    }
}

const mapStateToProps = state => ({
    user: state.user,
});

export default withRouter(connect(mapStateToProps)(withStyles(styles)(Menu)));
