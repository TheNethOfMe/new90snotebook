import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import ProfileForm from "../settings/ProfileForm";
import { createNewProfile } from "../../actions/profileActions";

export class FirstTime extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: {}
    };
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }
  createProfile = newProfile => {
    this.props.createNewProfile(newProfile);
  };
  render() {
    const { errors } = this.state;

    return (
      <div>
        <h1>Profile Setup</h1>
        <ProfileForm
          profile={null}
          errors={errors}
          handleSubmit={this.createProfile}
        />
      </div>
    );
  }
}

FirstTime.propTypes = {
  errors: PropTypes.object.isRequired,
  createNewProfile: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { createNewProfile }
)(FirstTime);
