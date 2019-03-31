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
      menuToggle: false,
      hide: false,
      theme: this.props.auth.user.theme
    };
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.auth) {
      if (nextProps.auth.user.theme) {
        this.setState({ theme: nextProps.auth.user.theme });
      }
    }
  }
  onLogoutClick = e => {
    e.preventDefault();
    this.props.clearCurrentProfile();
    this.props.logoutUser();
  };
  toggleMenu = () => {
    if (this.state.menuToggle) {
      this.setState({ hide: true });
      setTimeout(() => {
        this.setState({ menuToggle: false });
      }, 300);
    } else {
      this.setState({ hide: false, menuToggle: !this.state.menuToggle });
    }
  };
  returnIcon = icon => {
    return `/images/themes/${this.state.theme}/${icon}-icon.png`;
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
          <Link className="header__nav-item" to="/settings">
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
        {showLinks && <Menu hide={this.state.hide} />}
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
