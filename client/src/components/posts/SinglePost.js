import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import ColorPicker from "./ColorPicker";

export class SinglePost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      edit: false,
      content: props.post && props.post.content ? props.post.content : "",
      color: props.post && props.post.color ? props.post.color : "grey"
    };
  }
  returnClass = () => {
    return `post__container-${this.props.post.color}`;
  };
  pickColor = selectedColor => {
    this.setState({ color: selectedColor });
  };
  render() {
    const date = new Date(this.props.post.createdAt);
    const displayDate = `${date.getMonth() +
      1}/${date.getDate()}/${date.getFullYear() - 2000}`;
    return (
      <div className={this.returnClass()}>
        <div className="post__header">
          <div className="post__date">{displayDate}</div>
          <div className="post__icons">
            <button className="icon-button" onClick={this.onDelete}>
              <img src="/images/icons/pencil-icon.png" alt="update post" />
            </button>
            <button className="icon-button" onClick={this.onDelete}>
              <img src="/images/icons/trash-icon.png" alt="delete post" />
            </button>
          </div>
        </div>

        <div>{this.props.post.content}</div>

        <ColorPicker
          color={this.state.color}
          handlePickColor={this.pickColor}
        />
      </div>
    );
  }
}

SinglePost.propTypes = {
  post: PropTypes.object.isRequired
};

export default connect(null)(SinglePost);
