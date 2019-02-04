import React, { Component } from "react";
import { connect } from "react-redux";
import SubMenu from "../common/SubMenu";

export class MyFriends extends Component {
  handleSelect = option => {
    console.log(option);
  };
  render() {
    const friendTabs = [
      {
        title: "Find Friends",
        link: "find"
      },
      {
        title: "My Friends",
        link: "friends"
      }
    ];
    return (
      <div>
        <SubMenu notebookTabs={friendTabs} tabselect={this.handleSelect} />
        <h3>Friends Page</h3>
      </div>
    );
  }
}

export default connect(null)(MyFriends);
