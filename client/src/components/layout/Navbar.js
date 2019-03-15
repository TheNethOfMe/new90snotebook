import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import { clearCurrentProfile } from "../../actions/profileActions";
import Menu from "../common/Menu";

export class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menuToggle: false
    };
  }
  onLogoutClick = e => {
    e.preventDefault();
    this.props.clearCurrentProfile();
    this.props.logoutUser();
  };
  toggleMenu = () => {
    this.setState({ menuToggle: !this.state.menuToggle });
  };
  returnIcon = icon => {
    return `/images/themes/${this.props.theme}/${icon}-icon.png`;
  };
  render() {
    const { isAuthenticated } = this.props.auth;
    const showLinks = isAuthenticated && this.state.menuToggle;
    const authLinks = (
      <ul className="header__nav-list">
        <li>
          <div className="header__nav-item" onClick={this.toggleMenu}>
            <img
              className="header__nav-icon"
              src={this.returnIcon("menu")}
              alt="menu-icon"
            />
            <p>Menu</p>
          </div>
        </li>
        <li>
          <Link className="header__nav-item" to="/dashboard">
            <img
              className="header__nav-icon"
              src={this.returnIcon("settings")}
              alt="settings-icon"
            />
            <p>Settings</p>
          </Link>
        </li>
        <li>
          <div className="header__nav-item" onClick={this.onLogoutClick}>
            <img
              className="header__nav-icon"
              src={this.returnIcon("logout")}
              alt="logout-icon"
            />
            <p>Logout</p>
          </div>
        </li>
      </ul>
    );

    const guestLinks = (
      <ul className="header__nav-list">
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
          <div className="header__nav-section">
            <ul>
              <li>
                <Link className="header__nav-item" to="/">
                  <p>My 90s Notebook</p>
                </Link>
              </li>
            </ul>
          </div>
          <div className="header__nav-section">
            {isAuthenticated ? authLinks : guestLinks}
          </div>
        </nav>
        {showLinks && <Menu />}
      </div>
    );
  }
}

Navbar.propTypes = {
  auth: PropTypes.object.isRequired,
  theme: PropTypes.string.isRequired,
  logoutUser: PropTypes.func.isRequired,
  clearCurrentProfile: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  theme: state.profile.theme ? state.profile.theme : "paper-cup"
});

export default connect(
  mapStateToProps,
  { logoutUser, clearCurrentProfile }
)(Navbar);
