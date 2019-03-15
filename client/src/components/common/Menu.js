import React from "react";
import { Link } from "react-router-dom";

export default () => (
  <div id="menu__display">
    <Link to="/dashboard">
      <img
        className="menu__button"
        src="/images/DashboardButton.png"
        alt="Dashboard"
      />
    </Link>
    <Link to="/friendDash">
      <img
        className="menu__button"
        src="/images/MyFriendsButton.png"
        alt="My Friends"
      />
    </Link>
  </div>
);
