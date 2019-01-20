import React, { Component } from "react";
import { Link } from "react-router-dom";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";

export class Landing extends Component {
  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }
  render() {
    return (
      <div>
        <div className="landing__notebook">
          <div className="landing__subheading">
            Planner, Notebook, and More with 90's Flair!
          </div>
          <ul>
            <li>
              <Link className="landing__nav-item" to="/login">
                <p>Login</p>
              </Link>
            </li>
            <li>
              <Link className="landing__nav-item" to="/register">
                <p>Register</p>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

Landing.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(Landing);
