import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import Menu from "../common/Menu";

const PrivateRoute = ({
  component: Component,
  auth,
  menuToggle,
  bgTheme,
  subBgTheme,
  ...rest
}) => (
  <Route
    {...rest}
    render={props =>
      auth.isAuthenticated ? (
        <div id="main" className={bgTheme}>
          <div id="menu">{menuToggle && <Menu />}</div>
          <div id="sub-main" className={subBgTheme}>
            <Component {...props} />
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
  subBgTheme: PropTypes.string.isRequired,
  menuToggle: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  bgTheme: state.profile.theme
    ? `main-background-${state.profile.theme}`
    : "main-background-paper-cup",
  subBgTheme: state.profile.theme
    ? `sub-background-${state.profile.theme}`
    : "sub-background-paper-cup",
  menuToggle: !!state.profile.menuToggle
});

export default connect(mapStateToProps)(PrivateRoute);
