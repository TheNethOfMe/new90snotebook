import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { sendNewFriendRequest } from "../../actions/friendActions";

export class FoundProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      relationship: "not friends"
    };
  }
  componentWillMount() {
    this.determineRelationship();
  }
  checkList = list => {
    let result = false;
    for (let i = 0; i < list.length; i++) {
      if (list[i].friendUserId === this.props.profile.user) {
        result = true;
      }
    }
    return result;
  };
  determineRelationship = () => {
    if (this.checkList(this.props.friends.friends.mutual)) {
      this.setState({ relationship: "mutual" });
    } else if (this.checkList(this.props.friends.friends.pending)) {
      this.setState({ relationship: "pending" });
    } else if (this.checkList(this.props.friends.friends.received)) {
      this.setState({ relationship: "recieved" });
    } else {
      this.setState({ relationship: "not friends" });
    }
  };
  handleNewRequest = recipientId => {
    this.props.sendNewFriendRequest({ recipientId });
    this.setState({ relationship: "pending" });
  };
  render() {
    const { profile } = this.props;
    let friendOptions;
    if (this.state.relationship === "mutual") {
      friendOptions = "You are mutal friends";
    } else if (this.state.relationship === "pending") {
      friendOptions = "Friend request sent";
    } else if (this.state.relationship === "recieved") {
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
