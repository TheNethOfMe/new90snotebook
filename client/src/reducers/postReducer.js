import {
  GET_POSTS,
  POSTS_LOADING,
  CREATE_POST,
  GET_FRIEND_POSTS
} from "../actions/types";

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
