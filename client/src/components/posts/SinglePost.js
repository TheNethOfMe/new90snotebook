import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { updatePost, deletePost } from "../../actions/postActions";

import ColorPicker from "./ColorPicker";

export class SinglePost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      edit: false,
      deleteCheck: false,
      id: props.post._id,
      content: props.post.content,
      color: props.post.color,
      textAreaContent: props.post.content
    };
  }
  returnClass = () => {
    return `post__container-${this.state.color}`;
  };
  updateTextArea = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  pickColor = selectedColor => {
    this.setState({ color: selectedColor });
    const postData = {
      id: this.state.id,
      updates: { color: selectedColor }
    };
    this.props.updatePost(postData);
  };
  handleUpdate = () => {
    this.setState({
      content: this.state.textAreaContent,
      edit: false
    });
    const postData = {
      id: this.state.id,
      updates: { content: this.state.textAreaContent }
    };
    this.props.updatePost(postData);
  };
  editMode = () => {
    this.setState({ edit: true });
  };
  normalMode = () => {
    this.setState({
      textAreaContent: this.state.content,
      edit: false
    });
  };
  toggleDelete = () => {
    const deleteCheck = !this.state.deleteCheck;
    this.setState({ deleteCheck });
  };
  handleDelete = () => {
    this.props.deletePost(this.state.id);
  };
  render() {
    const date = new Date(this.props.post.createdAt);
    const displayDate = `${date.getMonth() +
      1}/${date.getDate()}/${date.getFullYear() - 2000}`;
    return (
      <div className={this.returnClass()}>
        {!this.state.edit && (
          <div className="post__header">
            <div className="post__date">{displayDate}</div>
            <div className="post__icons">
              <button className="icon-button" onClick={this.editMode}>
                <img src="/images/icons/pencil-icon.png" alt="update post" />
              </button>
              <button className="icon-button" onClick={this.toggleDelete}>
                <img src="/images/icons/trash-icon.png" alt="delete post" />
              </button>
            </div>
          </div>
        )}

        {!this.state.edit && (
          <div className="post__content">{this.state.content}</div>
        )}

        {this.state.edit && (
          <div>
            <textarea
              name="textAreaContent"
              autoFocus
              onChange={this.updateTextArea}
              value={this.state.textAreaContent}
            />
            <button onClick={this.handleUpdate}>Update</button>
            <button onClick={this.normalMode}>Cancel</button>
          </div>
        )}

        {this.state.deleteCheck && (
          <div>
            <p>Are you sure you want to delete? This can't be undone.</p>
            <button onClick={this.handleDelete}>Delete</button>
            <button onClick={this.toggleDelete}>Cancel</button>
          </div>
        )}

        <ColorPicker
          color={this.state.color}
          handlePickColor={this.pickColor}
        />
      </div>
    );
  }
}

SinglePost.propTypes = {
  post: PropTypes.object.isRequired,
  updatePost: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired
};

export default connect(
  null,
  { updatePost, deletePost }
)(SinglePost);
