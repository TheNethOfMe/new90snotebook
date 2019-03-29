import axios from "axios";
import {
  GET_POSTS,
  POSTS_LOADING,
  CREATE_POST,
  GET_FRIEND_POSTS
} from "./types";

import {
  addToLocalStorageStore,
  updateLocalStorageStore
} from "../utils/localStorageStore";

// Populate User's own posts
export const getOwnPosts = () => dispatch => {
  dispatch(setPostsLoading);
  axios
    .get("/api/posts")
    .then(res => {
      dispatch({
        type: GET_POSTS,
        payload: res.data
      });
      addToLocalStorageStore("posts", res.data);
    })
    .catch(err => {
      console.log(err);
    });
};

// Set posts loading
export const setPostsLoading = () => {
  return {
    type: POSTS_LOADING
  };
};

// Delete post
export const deletePost = id => dispatch => {
  axios
    .delete(`/api/posts/${id}`)
    .then(() => {
      dispatch(getOwnPosts());
    })
    .catch(err => console.log(err));
};

// Create new post
export const createPost = postData => dispatch => {
  dispatch(setPostsLoading);
  axios
    .post("/api/posts", postData)
    .then(post => {
      dispatch({
        type: CREATE_POST,
        payload: post.data
      });
      updateLocalStorageStore("posts");
    })
    .catch(err => console.log(err));
};

// Get Friend's Posts
export const getFrendsPosts = () => dispatch => {
  dispatch(setPostsLoading);
  axios.get("/api/posts/friends").then(posts => {
    dispatch({
      type: GET_FRIEND_POSTS,
      payload: posts
    }).catch(err => console.log(err));
  });
};

// Populate store from local storage on reload
export const populatePostsFromStorage = localStorageData => dispatch => {
  dispatch({
    type: GET_POSTS,
    payload: localStorageData
  });
};
