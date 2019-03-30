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

const mapStateToProps = state => ({
  auth: state.auth,
  bgTheme: `main-background-${state.auth.user.theme}`,
  subBgTheme: `sub-background-${state.auth.user.theme}`
});

export default connect(mapStateToProps)(PrivateRoute);
