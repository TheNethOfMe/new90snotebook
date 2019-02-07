import axios from "axios";
import { GET_FRIENDS, FRIENDS_LOADING } from "./types";

// get Friends for user
export const getUserFriends = () => dispatch => {
  dispatch(setFriendsLoading);
  axios
    .get("/api/friends")
    .then(res => {
      dispatch({
        type: GET_FRIENDS,
        payload: res.data
      });
    })
    .catch(err => {
      console.log(err);
    });
};

export const setFriendsLoading = () => {
  return {
    type: FRIENDS_LOADING
  };
};
