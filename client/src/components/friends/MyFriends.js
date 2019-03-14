import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

export class MyFriends extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: "My Friends"
    };
  }
  render() {
    const allFriends = this.props.friends.friends;
    const mutuals = allFriends.mutual.map(friend => {
      return (
        <div key={friend.friendUserId}>
          {friend.friendFirstName} {friend.friendLastname}
        </div>
      );
    });
    const received = allFriends.received.map(friend => {
      return (
        <div key={friend.friendUserId}>
          {friend.friendFirstName} {friend.friendLastname}
        </div>
      );
    });
    const pending = allFriends.pending.map(friend => {
      return (
        <div key={friend.friendUserId}>
          {friend.friendFirstName} {friend.friendLastname}
        </div>
      );
    });
    return (
      <div>
        <h2>They want to be your friend.</h2>
        {mutuals}
        <h2>You friends</h2>
        {received}
        <h2>Pending requests</h2>
        {pending}
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
