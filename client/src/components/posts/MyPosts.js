import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  populatePostsFromStorage,
  getOwnPosts
} from "../../actions/postActions";
import Spinner from "../common/Spinner";
import PostForm from "./PostForm";
import SinglePost from "./SinglePost";

export class MyPosts extends Component {
  componentDidMount() {
    const storeString = window.localStorage.getItem("My90sNBStore");
    if (!storeString || !JSON.parse(storeString).hasOwnProperty("posts")) {
      this.props.getOwnPosts();
    } else {
      const storeObject = JSON.parse(storeString);
      this.props.populatePostsFromStorage(storeObject.posts);
    }
  }
  render() {
    const { loading, posts } = this.props.posts;
    let form;
    let display;
    if (loading) {
      display = <Spinner />;
      form = <div />;
    } else {
      if (posts.length === 0) {
        display = <div>No Posts to Display</div>;
      } else {
        display = posts.map(post => {
          return <SinglePost key={post._id} post={post} />;
        });
      }
      if (posts.length === 5) {
        form = <div>Max Posts Reached!</div>;
      } else {
        form = <PostForm />;
      }
    }
    return (
      <div className="post__list">
        {form}
        {display}
      </div>
    );
  }
}

MyPosts.propTypes = {
  posts: PropTypes.object.isRequired,
  populatePostsFromStorage: PropTypes.func.isRequired,
  getOwnPosts: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  posts: state.posts
});

export default connect(
  mapStateToProps,
  { populatePostsFromStorage, getOwnPosts }
)(MyPosts);
