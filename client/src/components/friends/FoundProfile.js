import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { sendNewFriendRequest } from "../../actions/friendActions";

export class FoundProfile extends Component {
  handleNewRequest = recipientId => {
    this.props.sendNewFriendRequest(recipientId);
  };
  render() {
    const { profile } = this.props;
    const { friends } = this.props.friends;
    let friendOptions;
    const checkUserList = list => {
      list.find(item => {
        return item.id === profile.id;
      });
    };
    if (!!checkUserList(friends.mutual)) {
      friendOptions = "You are mutal friends";
    } else if (!!checkUserList(friends.requested)) {
      friendOptions = "Freind request sent";
    } else if (!!checkUserList(friends.received)) {
      friendOptions = "Wants to be your friend";
    } else {
      friendOptions = (
        <div>
          <button onClick={() => this.handleNewRequest(profile.user)}>
            Send Friend Request
          </button>
        </div>
      );
    }
    return (
      <div>
        <h4>
          Name: {profile.firstName} {profile.lastName}
        </h4>
        <div>{friendOptions}</div>
      </div>
    );
  }
}

FoundProfile.propTypes = {
  profile: PropTypes.object.isRequired,
  friends: PropTypes.object.isRequired,
  sendNewFriendRequest: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  friends: state.friends
});

export default connect(
  mapStateToProps,
  { sendNewFriendRequest }
)(FoundProfile);
