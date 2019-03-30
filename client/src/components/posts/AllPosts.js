import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import fpo from "../../utils/friendPostOrganizer";

import { getFriendsPosts } from "../../actions/postActions";
import FriendPost from "./FriendPost";

export class AllPosts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allPosts: []
    };
  }
  componentWillMount() {
    this.props.getFriendsPosts();
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.posts.friendPosts) {
      const friendPosts = fpo(nextProps.posts.friendPosts);
      this.setState({ allPosts: friendPosts });
    }
  }
  render() {
    let display;
    if (this.state.allPosts.length === 0) {
      display = <div>This is the All Posts area!</div>;
    } else {
      display = this.state.allPosts.map(post => {
        return <FriendPost key={post.id} post={post} />;
      });
    }
    return <div className="post__list">{display}</div>;
  }
}

AllPosts.propTypes = {
  getFriendsPosts: PropTypes.func.isRequired,
  posts: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  posts: state.posts
});

export default connect(
  mapStateToProps,
  { getFriendsPosts }
)(AllPosts);
