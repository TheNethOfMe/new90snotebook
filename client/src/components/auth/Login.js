import React, { Component } from "react";

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      errors: {}
    };
  }
  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  onSubmit = e => {
    e.preventDefault();
    const loggedUser = {
      email: this.state.email,
      password: this.state.password
    };
    console.log(loggedUser);
  };
  render() {
    return (
      <div>
        <h1>Login</h1>
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
          <input type="submit" value="Log In" />
        </form>
      </div>
    );
  }
}

export default Login;
