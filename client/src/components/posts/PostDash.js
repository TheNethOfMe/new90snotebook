import React, { Component } from "react";
// import PropTypes from "prop-types";
import { connect } from "react-redux";

import SubMenu from "../common/SubMenu";
import MyPosts from "./MyPosts";
import AllPosts from "./AllPosts";

export class PostDash extends Component {
  constructor(props) {
    super(props);
    this.state = {
      postTabs: [
        {
          title: "My Posts",
          link: "mine"
        },
        {
          title: "Posts by Friends",
          link: "friends"
        }
      ],
      selected: "mine"
    };
  }
  handleSelect = tab => {
    this.setState({ selected: tab });
  };
  render() {
    let display;

    if (this.state.selected === "mine") display = <MyPosts />;
    if (this.state.selected === "friends") display = <AllPosts />;

    return (
      <div>
        <h2>Posts Page</h2>
        <SubMenu
          notebookTabs={this.state.postTabs}
          tabSelect={this.handleSelect}
          selected={this.state.selected}
        />
        {display}
      </div>
    );
  }
}

export default connect(null)(PostDash);
