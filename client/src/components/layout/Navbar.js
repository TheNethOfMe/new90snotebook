import React, { Component } from "react";

class Navbar extends Component {
  render() {
    return (
      <div>
        <nav className="header__nav">
          <div className="header__nav-item">
            <p>Menu</p>
          </div>

          <div className="header__nav-item">
            <p>Settings</p>
          </div>

          <div className="header__nav-item">
            <p>Logout</p>
          </div>
        </nav>
      </div>
    );
  }
}

export default Navbar;
