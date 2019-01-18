import React, { Component } from "react";
import { Link } from "react-router-dom";

class Navbar extends Component {
  render() {
    return (
      <div>
        <nav className="header__nav">
          <Link className="header__nav-item" to="/login">
            <p>Login</p>
          </Link>

          <Link className="header__nav-item" to="/register">
            <p>Register</p>
          </Link>
        </nav>
      </div>
    );
  }
}

export default Navbar;
