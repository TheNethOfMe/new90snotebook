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
          id={friend.friendUserId}
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
          id={friend.friendUserId}
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
          id={friend.friendUserId}
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
          <div
            className="friend__selector"
            onClick={() => this.toggleState("mutualState")}
          >
            <p>Mutual </p>
            {mutualState ? (
              <i className="far fa-eye" />
            ) : (
              <i className="far fa-eye-slash" />
            )}
          </div>
          <div
            className="friend__selector"
            onClick={() => this.toggleState("receivedState")}
          >
            <p>Requests </p>
            {receivedState ? (
              <i className="far fa-eye" />
            ) : (
              <i className="far fa-eye-slash" />
            )}
          </div>
          <div
            className="friend__selector"
            onClick={() => this.toggleState("pendingState")}
          >
            <p>Pending </p>
            {pendingState ? (
              <i className="far fa-eye" />
            ) : (
              <i className="far fa-eye-slash" />
            )}
          </div>
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
