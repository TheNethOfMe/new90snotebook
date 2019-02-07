import React, { Component } from "react";
import { connect } from "react-redux";
import SubMenu from "../common/SubMenu";

export class MyFriends extends Component {
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
  handleSelect = tab => {
    this.setState({ selected: tab });
  };
  render() {
    return (
      <div>
        <SubMenu
          notebookTabs={this.state.friendTabs}
          tabSelect={this.handleSelect}
          selected={this.state.selected}
        />
        <h3>Friends Page</h3>
      </div>
    );
  }
}

export default connect(null)(MyFriends);
