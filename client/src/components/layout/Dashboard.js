import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCurrentProfile } from "../../actions/profileActions";
import Spinner from "../common/Spinner";

export class Dashboard extends Component {
  componentDidMount() {
    this.props.getCurrentProfile();
  }
  render() {
    const { user } = this.props.auth;
    const { profile, loading } = this.props.profile;
    let dashboardContent;

    if (!profile || loading) {
      dashboardContent = <Spinner />;
    } else {
      if (Object.keys(profile).length > 0) {
        dashboardContent = <h3>Display Profile</h3>;
      } else {
        dashboardContent = <h3>You Have No Profile</h3>;
      }
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
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { getCurrentProfile }
)(Dashboard);
