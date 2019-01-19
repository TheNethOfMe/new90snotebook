import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import classnames from "classnames";
import { connect } from "react-redux";
import { registerUser } from "../../actions/authActions";

class Register extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      password2: "",
      errors: {}
    };
  }
  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }
  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  onSubmit = e => {
    e.preventDefault();
    const newUser = {
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2
    };
    this.props.registerUser(newUser, this.props.history);
  };
  render() {
    const { errors } = this.state;
    return (
      <div>
        <h1>Register</h1>
        <form noValidate onSubmit={this.onSubmit}>
          <input
            type="email"
            className={classnames({ "invalid-input": errors.email })}
            name="email"
            value={this.state.email}
            onChange={this.onChange}
          />
          {errors.email && <div>{errors.email}</div>}
          <input
            type="password"
            className={classnames({ "invalid-input": errors.password })}
            name="password"
            value={this.state.password}
            onChange={this.onChange}
          />
          {errors.password && <div>{errors.password}</div>}
          <input
            type="password"
            className={classnames({ "invalid-input": errors.password2 })}
            name="password2"
            value={this.state.password2}
            onChange={this.onChange}
          />
          {errors.password2 && <div>{errors.password2}</div>}
          <input type="submit" value="Sign Up" />
        </form>
      </div>
    );
  }
}

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { registerUser }
)(withRouter(Register));
