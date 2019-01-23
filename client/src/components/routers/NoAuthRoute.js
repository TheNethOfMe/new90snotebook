import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const NoAuthRoute = ({ component: Component, auth, ...rest }) => (
  <div className="noauth">
    <div className="noauth__notebook">
      <img
        className="noauth__logo"
        src="images/icons/ninties-logo.png"
        alt="My 90s Notebook"
      />
      <Route
        {...rest}
        render={props =>
          !auth.isAuthenticated ? (
            <Component {...props} />
          ) : (
            <Redirect to="/dashboard" />
          )
        }
      />
    </div>
  </div>
);

NoAuthRoute.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(NoAuthRoute);
