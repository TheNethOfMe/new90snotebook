import axios from "axios";
import {
  GET_POSTS,
  POSTS_LOADING,
  CREATE_POST,
  GET_FRIEND_POSTS,
  UPDATE_POST,
  DELETE_POST
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
      dispatch({
        type: DELETE_POST,
        payload: id
      });
      updateLocalStorageStore("posts");
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

// Update post
export const updatePost = postData => dispatch => {
  dispatch(setPostsLoading);
  axios
    .put(`/api/posts/${postData.id}`, postData)
    .then(updatedPost => {
      const newKey = Object.keys(postData.updates)[0];
      const newVal = postData.updates[Object.keys(postData.updates)[0]];
      updatedPost.data[newKey] = newVal;
      dispatch({
        type: UPDATE_POST,
        payload: updatedPost.data
      });
      updateLocalStorageStore("posts");
    })
    .catch(err => console.log(err));
};

// Get Friend's Posts
export const getFriendsPosts = () => dispatch => {
  dispatch(setPostsLoading);
  axios
    .get("/api/posts/friends")
    .then(posts => {
      dispatch({
        type: GET_FRIEND_POSTS,
        payload: posts.data
      });
    })
    .catch(err => console.log(err));
};

// Populate store from local storage on reload
export const populatePostsFromStorage = localStorageData => dispatch => {
  dispatch({
    type: GET_POSTS,
    payload: localStorageData
  });
};
