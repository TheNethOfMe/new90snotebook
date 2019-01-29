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
  hasProfile,
  ...rest
}) => (
  <Route
    {...rest}
    render={props =>
      auth.isAuthenticated ? (
        <div id="main" className={bgTheme}>
          <div id="sub-main" className={subBgTheme}>
            {hasProfile ? <Component {...props} /> : <FirstTime />}
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
  hasProfile: PropTypes.bool.isRequired,
  bgTheme: PropTypes.string.isRequired,
  subBgTheme: PropTypes.string.isRequired
};

const mapStateToProps = state => {
  const returnProps = {
    auth: state.auth,
    hasProfile: false,
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

// {Object.keys(profile.profile).length === 0 ? (
//   <Redirect to="/firsttime" />
// ) : (
//   <Component {...props} />
// )}

// const mapStateToProps = state => ({
//   auth: state.auth,
//   profile: state.profile.profile,
//   bgTheme: state.profile.profile.theme
//     ? `main-background-${state.profile.profile.theme}`
//     : "main-background-paper-cup",
//   subBgTheme: state.profile.profile.theme
//     ? `sub-background-${state.profile.profile.theme}`
//     : "sub-background-paper-cup"
// });
