import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import {
  populateFriendsFromStorage,
  getUserFriends
} from "../../actions/friendActions";

import Spinner from "../common/Spinner";
import SubMenu from "../common/SubMenu";
import FindFriends from "./FindFriends";
import MyFriends from "./MyFriends";

export class FriendDash extends Component {
  constructor(props) {
    super(props);
    this.state = {
      friendTabs: [
        {
          title: "Find Friends",
          link: "find"
        },
        {
          title: "My Friends",
          link: "friends"
        }
      ],
      selected: "find"
    };
  }
  componentDidMount() {
    const storeString = window.localStorage.getItem("My90sNBStore");
    if (!storeString || !JSON.parse(storeString).hasOwnProperty("friends")) {
      this.props.getUserFriends();
    } else {
      const storeObject = JSON.parse(storeString);
      this.props.populateFriendsFromStorage(storeObject.friends);
    }
  }
  handleSelect = tab => {
    this.setState({ selected: tab });
  };
  render() {
    const { friends, loading } = this.props.friends;
    let display;

    if (!friends || loading) {
      display = <Spinner />;
    } else {
      if (this.state.selected === "find") display = <FindFriends />;
      if (this.state.selected === "friends") display = <MyFriends />;
    }

    return (
      <div>
        <h2>Friends Page</h2>
        <SubMenu
          notebookTabs={this.state.friendTabs}
          tabSelect={this.handleSelect}
          selected={this.state.selected}
        />
        {display}
      </div>
    );
  }
}

FriendDash.propTypes = {
  friends: PropTypes.object.isRequired,
  getUserFriends: PropTypes.func.isRequired,
  populateFriendsFromStorage: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  friends: state.friends
});

export default connect(
  mapStateToProps,
  { getUserFriends, populateFriendsFromStorage }
)(FriendDash);
