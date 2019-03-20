import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

export class FriendPanel extends Component {
  returnClass = () => {
    return `friend__panel ${this.props.type}`;
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
            <button>Accept</button>
            <button>Decline</button>
          </div>
        );
      }
      if (type === "friend__panel-mutual") {
        return (
          <div>
            <button>Unfriend</button>
          </div>
        );
      }
      if (type === "friend__panel-pending") {
        return (
          <div>
            <button>Cancel Request</button>
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
  type: PropTypes.string.isRequired,
  first: PropTypes.string.isRequired,
  last: PropTypes.string.isRequired,
  nick: PropTypes.string
};

export default connect(null)(FriendPanel);
