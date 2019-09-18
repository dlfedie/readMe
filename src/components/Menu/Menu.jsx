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
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';

//basic class component. what we've been taught, so I'll start here.

const styles = theme => ({
    menu: {
        color: 'blue',
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
                <Drawer open={this.state.left} onClose={this.toggleDrawer('left', false)}>
                    <div
                        className={classes.list}
                        role="presentation"
                        onClick={this.toggleDrawer('left', false)}
                        onKeyDown={this.toggleDrawer('left', false)}
                    >
                        <List>
                            <ListItem button key={'tags'}>
                                <ListItemIcon>
                                    <MailIcon />
                                </ListItemIcon>
                                <ListItemText primary={'Tags'} />
                            </ListItem>
                        </List>
                        <Divider />
                        <List>
                            <ListItem button key={'about'}>
                                <ListItemIcon>
                                    <MailIcon />
                                </ListItemIcon>
                                <ListItemText primary={'About'} onClick={() => this.goToAbout()}/>
                            </ListItem>
                            <ListItem button key={'login'} onClick={() => this.props.dispatch({ type: 'LOGOUT' })}>
                                <ListItemIcon>
                                    <InboxIcon />
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
