import React, { Component } from 'react';
import {
  HashRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';

import { connect } from 'react-redux';

import Nav from '../Nav/Nav';
import Footer from '../Footer/Footer';

import './App.css';


import ProtectedRoute from '../ProtectedRoute/ProtectedRoute'

import AboutPage from '../AboutPage/AboutPage';
import CurrentReads from '../CurrentReads/CurrentReads';
import MyLibrary from '../MyLibrary/MyLibrary';
import WishList from '../WishList/WishList';
import Search from '../Search/Search';
import LibraryDetails from '../LibraryDetails/LibraryDetails';
import EditBook from '../EditBook/EditBook';
import Tags from '../Tags/Tags';

//Material UI
import 'typeface-roboto';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import SearchDetails from '../SearchDetails/SearchDetails';

const theme = createMuiTheme({
  //color palette
  palette: {
    primary: {
      main: '#03a9f4'
    },
    secondary: {
      main: '#8bc34a'
    }
  }
  // palette: {
  //   primary: {
  //     main: '#e53935'
  //   },
  //   secondary: {
  //     main: '#5c6bc0'
  //   }
  // }
})


class App extends Component {
  componentDidMount() {
    this.props.dispatch({ type: 'FETCH_USER' })
  }

  render() {
    return (
      <Router>
        <MuiThemeProvider theme={theme}>
          <div>
            <Nav />
            <Switch>
              {/* Visiting localhost:3000 will redirect to localhost:3000/home */}
              <Redirect exact from="/" to="/home" />
              {/* Visiting localhost:3000/about will show the about page.
            This is a route anyone can see, no login necessary */}
              <Route
                exact
                path="/about"
                component={AboutPage}
              />
              {/* For protected routes, the view could show one of several things on the same route.
            Visiting localhost:3000/home will show the UserPage if the user is logged in.
            If the user is not logged in, the ProtectedRoute will show the 'Login' or 'Register' page.
            Even though it seems like they are different pages, the user is always on localhost:3000/home */}
              <ProtectedRoute
                exact
                path="/home"
                component={CurrentReads}
              />
              {/* This works the same as the other protected route, except that if the user is logged in,
            they will see the info page instead. */}
              <ProtectedRoute
                exact
                path="/search"
                component={Search}
              />
              <ProtectedRoute
                exact
                path="/searchdetails"
                component={SearchDetails}
              />
              <ProtectedRoute
                exact
                path="/library"
                component={MyLibrary}
              />
              <ProtectedRoute
                exact
                path="/wishlist"
                component={WishList}
              />
              <ProtectedRoute
                exact
                path="/librarydetails/:id"
                component={LibraryDetails}
              />
              <ProtectedRoute
                exact
                path="/editbook/:id"
                component={EditBook}
              />
              <ProtectedRoute
                exact
                path="/tags"
                component={Tags}
              />
              {/* If none of the other routes matched, we will show a 404. */}
              <Route render={() => <h1>404</h1>} />
            </Switch>
            <Footer />
          </div>
        </MuiThemeProvider>
      </Router>
    )
  }
}

export default connect()(App);
