import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import { clearCurrentProfile } from "../../actions/profileActions";

export class Navbar extends Component {
  onLogoutClick(e) {
    e.preventDefault();
    this.props.clearCurrentProfile();
    this.props.logoutUser();
  }
  render() {
    const { isAuthenticated } = this.props.auth;

    const authLinks = (
      <ul>
        <li>
          <Link className="header__nav-item" to="/dashboard">
            <p>Menu</p>
          </Link>
        </li>
        <li>
          <Link className="header__nav-item" to="/register">
            <p>Settings</p>
          </Link>
        </li>
        <li>
          <div
            href="#"
            className="header__nav-item"
            onClick={this.onLogoutClick.bind(this)}
          >
            <p>Logout</p>
          </div>
        </li>
      </ul>
    );

    const guestLinks = (
      <ul>
        <li>
          <Link className="header__nav-item" to="/login">
            <p>Login</p>
          </Link>
        </li>
        <li>
          <Link className="header__nav-item" to="/register">
            <p>Register</p>
          </Link>
        </li>
      </ul>
    );
    return (
      <div>
        <nav className="header__nav">
          {isAuthenticated ? authLinks : guestLinks}
        </nav>
      </div>
    );
  }
}

Navbar.propTypes = {
  auth: PropTypes.object.isRequired,
  logoutUser: PropTypes.func.isRequired,
  clearCurrentProfile: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser, clearCurrentProfile }
)(Navbar);
