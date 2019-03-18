import axios from "axios";
import { GET_FRIENDS, FRIENDS_LOADING, ADD_FRIEND } from "./types";
import friendOrganizer from "../utils/friendOrganizer";
import { addToLocalStorageStore } from "../utils/localStorageStore";

// populate Friends store from database on login
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
      addToLocalStorageStore("friends", friends);
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

// Populate store from local storage on reload
export const populateFriendsFromStorage = localStorageData => dispatch => {
  dispatch({
    type: GET_FRIENDS,
    payload: localStorageData
  });
};
