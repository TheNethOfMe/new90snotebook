import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import ColorPicker from "./ColorPicker";

import { createPost } from "../../actions/postActions";

export class PostForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: props.post && props.post.content ? props.post.content : "",
      color: props.post && props.post.color ? props.post.color : "grey",
      error: ""
    };
  }
  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  returnPostClass = () => {
    return `post__container-${this.state.color}`;
  };
  pickColor = selectedColor => {
    this.setState({ color: selectedColor });
  };
  createNewPost = () => {
    const postData = {
      content: this.state.content,
      color: this.state.color
    };
    this.props.createPost(postData);
  };
  render() {
    return (
      <div className={this.returnPostClass()}>
        <label htmlFor="content">Post Text</label>
        <textarea
          name="content"
          placeholder="Write your note here"
          autoFocus
          onChange={this.onChange}
          value={this.state.content}
        />
        <button onClick={this.createNewPost}>Create Post</button>
        <ColorPicker
          color={this.state.color}
          handlePickColor={this.pickColor}
        />
      </div>
    );
  }
}

PostForm.propTypes = {
  post: PropTypes.object,
  createPost: PropTypes.func.isRequired
};

export default connect(
  null,
  { createPost }
)(PostForm);
