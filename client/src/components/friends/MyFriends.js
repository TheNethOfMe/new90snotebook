import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import FriendPanel from "./FriendPanel";

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
        <FriendPanel
          key={friend.friendUserId}
          type="friend__panel-mutual"
          first={friend.friendFirstName}
          last={friend.friendLastName}
          nick={friend.friendNickName}
        />
      );
    });
    const received = allFriends.received.map(friend => {
      return (
        <FriendPanel
          key={friend.friendUserId}
          type="friend__panel-received"
          first={friend.friendFirstName}
          last={friend.friendLastName}
          nick={friend.friendNickName}
        />
      );
    });
    const pending = allFriends.pending.map(friend => {
      return (
        <FriendPanel
          key={friend.friendUserId}
          type="friend__panel-pending"
          first={friend.friendFirstName}
          last={friend.friendLastName}
          nick={friend.friendNickName}
        />
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
