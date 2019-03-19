import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

export class MyFriends extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mutualState: true,
      receivedState: true,
      pendingState: false
    };
  }
  toggleState = stateName => {
    this.setState({ [stateName]: !this.state[stateName] });
  };
  render() {
    const { mutualState, receivedState, pendingState } = this.state;
    const allFriends = this.props.friends.friends;

    const mutuals = allFriends.mutual.map(friend => {
      return (
        <div
          key={friend.friendUserId}
          className="friend__panel friend__panel-mutual"
        >
          {friend.friendFirstName} {friend.friendLastname}
        </div>
      );
    });
    const received = allFriends.received.map(friend => {
      return (
        <div
          key={friend.friendUserId}
          className="friend__panel friend__panel-received"
        >
          {friend.friendFirstName} {friend.friendLastname} wants to be your
          friend.
        </div>
      );
    });
    const pending = allFriends.pending.map(friend => {
      return (
        <div
          key={friend.friendUserId}
          className="friend__panel friend__panel-pending"
        >
          You sent {friend.friendFirstName} {friend.friendLastname} a request.
        </div>
      );
    });
    return (
      <div className="friend__main">
        <div className="friend__buttons">
          <button onClick={() => this.toggleState("mutualState")}>
            {mutualState ? "Hide Mutuals" : "Show Mutuals"}
          </button>
          <button onClick={() => this.toggleState("receivedState")}>
            {receivedState ? "Hide Requests" : "Show Requests"}
          </button>
          <button onClick={() => this.toggleState("pendingState")}>
            {pendingState ? "Hide Pending" : "Show Pending"}
          </button>
        </div>
        <div className="friend__display">
          {mutualState && <div>{mutuals}</div>}
          {receivedState && <div>{received}</div>}
          {pendingState && <div>{pending}</div>}
        </div>
      </div>
    );
  }
}

MyFriends.propTypes = {
  friends: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  friends: state.friends
});

export default connect(mapStateToProps)(MyFriends);
