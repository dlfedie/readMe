import React, { Component } from 'react';
import { connect } from 'react-redux';

import 'typeface-roboto';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

const styles = theme => ({
  form: {
    padding: '50px',
    paddingBottom: '100px'
  },
  header: {
    textAlign: 'center'
  },
  button: {
    margin: '3%',
  }


})

class LoginPage extends Component {
  state = {
    username: '',
    password: '',
  };

  login = (event) => {
    event.preventDefault();

    if (this.state.username && this.state.password) {
      this.props.dispatch({
        type: 'LOGIN',
        payload: {
          username: this.state.username,
          password: this.state.password,
        },
      });
    } else {
      this.props.dispatch({ type: 'LOGIN_INPUT_ERROR' });
    }
    this.props.history.push('/');
  } // end login

  handleInputChangeFor = propertyName => (event) => {
    this.setState({
      [propertyName]: event.target.value,
    });
  }

  render() {
    const { classes } = this.props;

    return (
      <div>
        {this.props.errors.loginMessage && (
          <h2
            className="alert"
            role="alert"
          >
            {this.props.errors.loginMessage}
          </h2>
        )}
        <Grid container spacing={2} justify={'center'} alignItems={'center'} direction={'column'}>
          <form onSubmit={this.login} className={classes.form}>
            <Grid item>
              <h1 className={classes.header}>Login</h1>
            </Grid>
            <center>
              <Grid item>
                <label htmlFor="username">
                  <TextField
                    id="user-name"
                    label="Username:"
                    className={classes.textField}
                    value={this.state.username}
                    onChange={this.handleInputChangeFor('username')}
                    margin="normal"
                  />
                  {/* Username:
              <input
                type="text"
                name="username"
                value={this.state.username}
                onChange={this.handleInputChangeFor('username')}
              /> */}
                </label>
              </Grid>
            </center>
            <center>
              <Grid item>
                <label htmlFor="password">
                  <TextField
                    id="password"
                    label="Password:"
                    className={classes.textField}
                    type="password"
                    value={this.state.password}
                    onChange={this.handleInputChangeFor('password')}
                    margin="normal"
                  />
                  {/* Password:
              <input
                type="password"
                name="password"
                value={this.state.password}
                onChange={this.handleInputChangeFor('password')}
              /> */}
                </label>
              </Grid>
            </center>
            <center>
              <div>
                <Button 
                  variant="contained" 
                  color="primary" 
                  className={classes.button} 
                  type="submit"
                  name="submit"
                  value="Log In"> Log In
              {/* <input
                className="log-in"
                type="submit"
                name="submit"
                value="Log In"
              /> */}
                </Button>
              </div>
            </center>
            <center>
              <button
                type="button"
                className="link-button"
                onClick={() => { this.props.dispatch({ type: 'SET_TO_REGISTER_MODE' }) }}
              >
                Register
          </button>
            </center>
          </form>
        </Grid>
      </div>
    );
  }
}

// Instead of taking everything from state, we just want the error messages.
// if you wanted you could write this code like this:
// const mapStateToProps = ({errors}) => ({ errors });
const mapStateToProps = state => ({
  errors: state.errors,
});

export default connect(mapStateToProps)(withStyles(styles)(LoginPage));
