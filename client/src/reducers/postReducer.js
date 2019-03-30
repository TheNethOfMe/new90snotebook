import {
  GET_POSTS,
  POSTS_LOADING,
  CREATE_POST,
  GET_FRIEND_POSTS,
  UPDATE_POST,
  DELETE_POST
} from "../actions/types";

import replaceInArr from "../utils/replaceInArr";

const initialState = {
  posts: [],
  friendPosts: [],
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_POSTS:
      return {
        ...state,
        posts: action.payload,
        loading: false
      };
    case POSTS_LOADING:
      return {
        ...state,
        loading: true
      };
    case CREATE_POST:
      return {
        ...state,
        posts: [...state.posts, action.payload],
        loading: false
      };
    case UPDATE_POST:
      return {
        ...state,
        posts: replaceInArr(state.posts, action.payload),
        loading: false
      };
    case DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter(post => post._id !== action.payload)
      };
    case GET_FRIEND_POSTS:
      return {
        ...state,
        friendPosts: action.payload,
        loading: false
      };
    default:
      return {
        ...state
      };
  }
}
