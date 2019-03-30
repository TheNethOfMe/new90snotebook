import React, { Component } from "react";
import PropTypes from "prop-types";

export default class FriendPost extends Component {
  returnClass = () => {
    return `post__container-${this.props.post.color}`;
  };
  render() {
    const displayDate = `${this.props.post.time.getMonth() +
      1}/${this.props.post.time.getDate()}/${this.props.post.time.getFullYear() -
      2000}`;
    return (
      <div className={this.returnClass()}>
        <p>
          On {displayDate} {this.props.post.name} said:{" "}
        </p>
        <p>{this.props.post.content}</p>
      </div>
    );
  }
}

FriendPost.propTypes = {
  post: PropTypes.object.isRequired
};
