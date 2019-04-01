import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { userChangeTheme } from "../../actions/authActions";

import TextFieldGroup from "../common/TextFieldGroup";
import DropDownGroup from "../common/DropDownGroup";

export class ProfileForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: props.profile ? props.profile.firstName : "",
      lastName: props.profile ? props.profile.lastName : "",
      nickName:
        props.profile && props.profile.nickName ? props.profile.nickName : "",
      theme: props.theme,
      errors: props.errors
    };
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }
  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  pickTheme = e => {
    const theme = e.target.value;
    this.setState({ theme });
    this.props.userChangeTheme({ theme });
  };
  onSubmit = e => {
    e.preventDefault();
    this.props.handleSubmit({
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      nickName: this.state.nickName,
      bio: this.state.bio
    });
  };
  render() {
    const { errors } = this.state;
    const themeOptions = [
      {
        val: "paper-cup",
        display: "Paper Cup"
      },
      {
        val: "food-court",
        display: "Food Court"
      },
      {
        val: "frankly-lisa",
        display: "Frankly Lisa"
      },
      {
        val: "old-mac",
        display: "Old Mac"
      },
      {
        val: "tropical",
        display: "Tropical"
      }
    ];
    return (
      <div>
        <form onSubmit={this.onSubmit}>
          <TextFieldGroup
            name="firstName"
            placeholder="firstName"
            value={this.state.firstName}
            label="First Name"
            error={errors.firstName}
            onChange={this.onChange}
          />
          <TextFieldGroup
            name="lastName"
            placeholder="lastName"
            value={this.state.lastName}
            label="Last Name"
            error={errors.lastName}
            onChange={this.onChange}
          />
          <TextFieldGroup
            name="nickName"
            placeholder="nickName"
            value={this.state.nickName}
            label="Nick Name"
            error={errors.nickName}
            onChange={this.onChange}
          />
          <div className="input">
            <label className="input__label" htmlFor="bio">
              Tell us about yourself.
            </label>
            <textarea
              className="input__field"
              name="bio"
              onChange={this.onChange}
              value={this.state.bio}
            />
          </div>
          <DropDownGroup
            name="theme"
            label="Choose a theme"
            onChange={this.pickTheme}
            options={themeOptions}
            selected={this.state.theme}
          />
          <input className="input__submit" type="submit" value="Finished!" />
        </form>
      </div>
    );
  }
}

ProfileForm.propTypes = {
  profile: PropTypes.object,
  errors: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  userChangeTheme: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  theme: state.auth.user.theme
});

export default connect(
  mapStateToProps,
  { userChangeTheme }
)(ProfileForm);
