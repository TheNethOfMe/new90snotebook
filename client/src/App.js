import React, { Component } from "react";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";
import { clearCurrentProfile } from "./actions/profileActions";
import { Provider } from "react-redux";
import store from "./store";

import NoAuthRoute from "./components/routers/NoAuthRoute";
import PrivateRoute from "./components/routers/PrivateRoute";

import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import Footer from "./components/layout/Footer";

import Login from "./components/auth/Login";
import Register from "./components/auth/Register";

import Dashboard from "./components/dashboard/Dashboard";

import "./sass/main.scss";

// check for token (means user is logged in)
if (localStorage.notebookToken) {
  setAuthToken(localStorage.notebookToken);
  const decoded = jwt_decode(localStorage.notebookToken);
  store.dispatch(setCurrentUser(decoded));
  // check if token is expired
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    store.dispatch(logoutUser());
    store.dispatch(clearCurrentProfile());
    // redirect to login
    window.location.href = "./login";
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Navbar />
            <Switch>
              <NoAuthRoute exact path="/" component={Landing} />
              <NoAuthRoute exact path="/login" component={Login} />
              <NoAuthRoute exact path="/register" component={Register} />
            </Switch>
            <Switch>
              <PrivateRoute exact path="/dashboard" component={Dashboard} />
            </Switch>
            <Footer />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
