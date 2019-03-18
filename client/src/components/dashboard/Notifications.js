import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  getAllNotifications,
  populateNotificationsFromStorage
} from "../../actions/notificationActions";
import Spinner from "../common/Spinner";

export class Notifications extends Component {
  componentDidMount() {
    const storeString = window.localStorage.getItem("My90sNBStore");
    if (
      !storeString ||
      !JSON.parse(storeString).hasOwnProperty("notifications")
    ) {
      console.log("Notifications Get from DB");
      this.props.getAllNotifications();
    } else {
      console.log("Notifications Get from LocalStorage");
      const storeObject = JSON.parse(storeString);
      this.props.populateNotificationsFromStorage(storeObject.notifications);
    }
  }
  render() {
    const { notifications, loading } = this.props.notifications;
    let componentContent;

    if (!notifications || loading) {
      componentContent = <Spinner />;
    } else if (notifications.length === 0) {
      componentContent = <p>There are no notifications to display</p>;
    } else {
      componentContent = (
        <div>
          {notifications.map(note => (
            <p key={note._id}>{note.message}</p>
          ))}
        </div>
      );
    }
    return <div>{componentContent}</div>;
  }
}

Notifications.propTypes = {
  getAllNotifications: PropTypes.func.isRequired,
  populateNotificationsFromStorage: PropTypes.func.isRequired,
  notifications: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  notifications: state.notifications
});

export default connect(
  mapStateToProps,
  { getAllNotifications, populateNotificationsFromStorage }
)(Notifications);
