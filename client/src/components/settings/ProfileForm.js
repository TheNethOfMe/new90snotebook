import React, { Component } from "react";
import PropTypes from "prop-types";
import TextFieldGroup from "../common/TextFieldGroup";
import DropDownGroup from "../common/DropDownGroup";

export default class ProfileForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: props.profile ? props.profile.firstName : "",
      lastName: props.profile ? props.profile.lastName : "",
      nickName: props.profile ? props.profile.nickName : "",
      theme: props.profile ? props.profile.theme : "paper-cup",
      searchableProfile: props.profile
        ? props.profile.searchableProfile
        : false,
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
  onSubmit = e => {
    e.preventDefault();
    this.props.handleSubmit({
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      nickName: this.state.nickName,
      theme: this.state.theme,
      searchableProfile: this.state.searchableProfile
    });
  };
  render() {
    const { errors } = this.state;
    const searchableOptions = [
      {
        val: false,
        display: "Make my profile hidden"
      },
      {
        val: true,
        display: "Make my profile searchable"
      }
    ];
    const themeOptions = [
      {
        val: "paper-cup",
        display: "Paper Cup"
      },
      {
        val: "tropical",
        display: "Tropical"
      },
      {
        val: "frankly-lisa",
        display: "Frankly Lisa"
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
          <DropDownGroup
            name="searchableProfile"
            label="Do you want to be searchable?"
            info="Hidden profiles can not be found or friended by anyone else."
            onChange={this.onChange}
            options={searchableOptions}
          />
          <DropDownGroup
            name="theme"
            label="Choose a theme"
            onChange={this.onChange}
            options={themeOptions}
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
  handleSubmit: PropTypes.func.isRequired
};
