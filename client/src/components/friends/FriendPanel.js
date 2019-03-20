import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  rejectFriendRequest,
  deleteRelationship,
  acceptFriendRequest
} from "../../actions/friendActions";

export class FriendPanel extends Component {
  returnClass = () => {
    return `friend__panel ${this.props.type}`;
  };
  accept = id => {
    this.props.acceptFriendRequest(id);
  };
  reject = id => {
    this.props.rejectFriendRequest(id);
  };
  delete = (id, list) => {
    this.props.deleteRelationship(id, list);
  };
  render() {
    const displayName = this.props.nick
      ? `${this.props.first} "${this.props.nick}" ${this.props.last}`
      : `${this.props.first} ${this.props.last}`;
    const displayText = type => {
      if (type === "friend__panel-received") {
        return " wants to be your friend.";
      }
      if (type === "friend__panel-mutual") {
        return " is your friend.";
      }
      if (type === "friend__panel-pending") {
        return " Request Pending.";
      }
    };
    const displayOptions = type => {
      if (type === "friend__panel-received") {
        return (
          <div>
            <button onClick={() => this.accept(this.props.id)}>Accept</button>
            <button onClick={() => this.reject(this.props.id)}>Decline</button>
          </div>
        );
      }
      if (type === "friend__panel-mutual") {
        return (
          <div>
            <button onClick={() => this.delete(this.props.id, "mutual")}>
              Unfriend
            </button>
          </div>
        );
      }
      if (type === "friend__panel-pending") {
        return (
          <div>
            <button onClick={() => this.delete(this.props.id, "pending")}>
              Cancel Request
            </button>
          </div>
        );
      }
    };
    return (
      <div className={this.returnClass()}>
        {displayName}
        {displayText(this.props.type)}
        {displayOptions(this.props.type)}
      </div>
    );
  }
}

FriendPanel.propTypes = {
  id: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  first: PropTypes.string.isRequired,
  last: PropTypes.string.isRequired,
  nick: PropTypes.string,
  rejectFriendRequest: PropTypes.func.isRequired,
  deleteRelationship: PropTypes.func.isRequired,
  acceptFriendRequest: PropTypes.func.isRequired
};

export default connect(
  null,
  { rejectFriendRequest, deleteRelationship, acceptFriendRequest }
)(FriendPanel);
