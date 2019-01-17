import React, { Component } from "react";

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
    console.log(newUser);
  };
  render() {
    return (
      <div>
        <h1>Register</h1>
        <form onSubmit={this.onSubmit}>
          <input
            type="text"
            name="email"
            value={this.state.email}
            onChange={this.onChange}
          />
          <input
            type="password"
            name="password"
            value={this.state.password}
            onChange={this.onChange}
          />
          <input
            type="password"
            name="password2"
            value={this.state.password2}
            onChange={this.onChange}
          />
          <input type="submit" value="Sign Up" />
        </form>
      </div>
    );
  }
}

export default Register;
