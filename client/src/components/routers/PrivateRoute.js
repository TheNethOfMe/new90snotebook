import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import FirstTime from "../dashboard/FirstTime";

const PrivateRoute = ({
  component: Component,
  auth,
  bgTheme,
  subBgTheme,
  ...rest
}) => (
  <Route
    {...rest}
    render={props =>
      auth.isAuthenticated ? (
        <div id="main" className={bgTheme}>
          <div id="sub-main" className={subBgTheme}>
            {auth.hasProfile ? <Component {...props} /> : <FirstTime />}
          </div>
        </div>
      ) : (
        <Redirect to="/login" />
      )
    }
  />
);

PrivateRoute.propTypes = {
  auth: PropTypes.object.isRequired,
  bgTheme: PropTypes.string.isRequired,
  subBgTheme: PropTypes.string.isRequired
};

const mapStateToProps = state => {
  const returnProps = {
    auth: state.auth,
    bgTheme: "main-background-paper-cup",
    subBgTheme: "sub-background-paper-cup"
  };
  if (state.profile && state.profile.profile) {
    returnProps.hasProfile = !!Object.keys(state.profile.profile).length;
    if (state.profile.profile.theme) {
      returnProps.bgTheme = `main-background-${state.profile.profile.theme}`;
      returnProps.subBgTheme = `sub-background-${state.profile.profile.theme}`;
    }
  }
  return returnProps;
};

export default connect(mapStateToProps)(PrivateRoute);
