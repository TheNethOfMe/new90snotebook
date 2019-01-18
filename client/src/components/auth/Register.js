import React, { Component } from "react";
import axios from "axios";
import classnames from "classnames";

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
    axios
      .post("/api/users/register", newUser)
      .then(res => console.log(res.data))
      .catch(err => {
        this.setState({ errors: err.response.data });
      });
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

export default Register;
