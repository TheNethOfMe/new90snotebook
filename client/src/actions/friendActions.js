import axios from "axios";
import { GET_FRIENDS, FRIENDS_LOADING, ADD_FRIEND } from "./types";
import friendOrganizer from "../utils/friendOrganizer";

// get Friends for user
export const getUserFriends = () => dispatch => {
  let friends = {};
  dispatch(setFriendsLoading);
  axios
    .get("/api/friends")
    .then(res => {
      friends = friendOrganizer(res.data);
      dispatch({
        type: GET_FRIENDS,
        payload: friends
      });
    })
    .catch(err => {
      console.log(err);
    });
};

export const sendNewFriendRequest = recipientId => dispatch => {
  axios
    .post("/api/friends", recipientId)
    .then(res => {
      dispatch({
        type: ADD_FRIEND,
        payload: {
          cat: "new",
          data: res.data
        }
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
