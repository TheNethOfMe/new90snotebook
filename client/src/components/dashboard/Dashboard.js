import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  getCurrentProfile,
  populateProfileFromStorage
} from "../../actions/profileActions";
import Spinner from "../common/Spinner";
import Notification from "./Notifications";

export class Dashboard extends Component {
  componentDidMount() {
    const storeString = window.localStorage.getItem("My90sNBStore");
    if (!storeString || !JSON.parse(storeString).hasOwnProperty("profile")) {
      console.log("Profile Get from DB");
      this.props.getCurrentProfile();
    } else {
      console.log("Profile Get from LocalStorage");
      const storeObject = JSON.parse(storeString);
      this.props.populateProfileFromStorage(storeObject.profile);
    }
  }
  render() {
    const { profile, loading } = this.props.profile;
    let dashboardContent;

    if (!profile || loading) {
      dashboardContent = <Spinner />;
    } else {
      dashboardContent = <Notification />;
    }
    return (
      <div className="dashbaord">
        <h1>Welcome</h1>
        {dashboardContent}
      </div>
    );
  }
}

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  populateProfileFromStorage: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { getCurrentProfile, populateProfileFromStorage }
)(Dashboard);
