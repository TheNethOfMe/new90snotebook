import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import ProfileForm from "./ProfileForm";
import {
  createNewProfile,
  populateProfileFromStorage
} from "../../actions/profileActions";
import Spinner from "../common/Spinner";

export class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profile: props.profile,
      errors: {}
    };
  }
  componentWillMount() {
    const storeString = window.localStorage.getItem("My90sNBStore");
    if (!this.state.profile || !this.state.profile.profile) {
      if (!storeString || !JSON.parse(storeString).hasOwnProperty("profile")) {
        this.props.getCurrentProfile();
      } else {
        const storeObject = JSON.parse(storeString);
        this.props.populateProfileFromStorage(storeObject.profile);
      }
    }
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
    if (nextProps.profile) {
      this.setState({ profile: nextProps.profile });
    }
  }
  updateProfile = profileData => {
    this.props.createNewProfile(profileData);
  };
  render() {
    const { loading, profile } = this.state.profile;
    return (
      <div>
        <h2>Settings</h2>
        {loading || !profile ? (
          <Spinner />
        ) : (
          <ProfileForm
            profile={profile}
            errors={this.state.errors}
            handleSubmit={this.updateProfile}
          />
        )}
      </div>
    );
  }
}

Settings.propTypes = {
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  createNewProfile: PropTypes.func.isRequired,
  populateProfileFromStorage: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { createNewProfile, populateProfileFromStorage }
)(Settings);
