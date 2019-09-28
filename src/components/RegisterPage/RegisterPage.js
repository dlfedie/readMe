import React, { Component } from 'react';
import {connect} from 'react-redux';


import 'typeface-roboto';
import { withStyles } from '@material-ui/core/styles';
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

class RegisterPage extends Component {
  state = {
    username: '',
    password: '',
  };

  registerUser = (event) => {
    event.preventDefault();

    if (this.state.username && this.state.password && this.state.password.length > 5) {
      this.props.dispatch({
        type: 'REGISTER',
        payload: {
          username: this.state.username,
          password: this.state.password,
        },
      });
    } else {
      this.props.dispatch({type: 'REGISTRATION_INPUT_ERROR'});
    }
  } // end registerUser

  handleInputChangeFor = propertyName => (event) => {
    this.setState({
      [propertyName]: event.target.value,
    });
  }

  render() {

    const { classes } = this.props;

    return (
      <div>
        {this.props.errors.registrationMessage && (
          <h2
            className="alert"
            role="alert"
          >
            {this.props.errors.registrationMessage}
          </h2>
        )}
        <form onSubmit={this.registerUser} className={classes.form}>
          <h1 className={classes.header}>Register User</h1>
          <h4 className={classes.header}>Please enter a password with 6 or more characters.</h4>
          <div>
            <label htmlFor="username">
              Username:
              <input
                type="text"
                name="username"
                value={this.state.username}
                onChange={this.handleInputChangeFor('username')}
              />
            </label>
          </div>
          <div>
            <label htmlFor="password">
              Password:
              <input
                type="password"
                name="password"
                value={this.state.password}
                onChange={this.handleInputChangeFor('password')}
              />
            </label>
          </div>
          <div>
            <center>
              <div>
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.button}
                  type="submit"
                  name="submit"
                  value="Register"> Register
                </Button>
              </div>
            </center>
            {/* <input
              className="register"
              type="submit"
              name="submit"
              value="Register"
            /> */}
          </div>
        </form>
        <center>
          <br/>
          <button
            type="button"
            className="link-button"
            onClick={() => {this.props.dispatch({type: 'SET_TO_LOGIN_MODE'})}}
          >
            Login
          </button>
        </center>
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

export default connect(mapStateToProps)(withStyles(styles)(RegisterPage));

