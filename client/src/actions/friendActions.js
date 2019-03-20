import axios from "axios";
import {
  GET_FRIENDS,
  FRIENDS_LOADING,
  ADD_FRIEND,
  REMOVE_FRIEND,
  ACCEPT_FRIEND
} from "./types";
import friendOrganizer from "../utils/friendOrganizer";
import {
  addToLocalStorageStore,
  updateLocalStorageStore
} from "../utils/localStorageStore";

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

// creates new friend request and adds pending friend
export const sendNewFriendRequest = recipientId => dispatch => {
  dispatch(setFriendsLoading);
  axios
    .post("/api/friends", recipientId)
    .then(res => {
      dispatch({
        type: ADD_FRIEND,
        payload: res.data
      });
      updateLocalStorageStore("friends");
    })
    .catch(err => {
      console.log(err);
    });
};

// sets a friend request object to accepted
export const acceptFriendRequest = senderId => dispatch => {
  let bodyProp = {};
  bodyProp.updateParams = { accepted: true };
  bodyProp.senderId = senderId;
  dispatch(setFriendsLoading);
  axios
    .put("/api/friends", bodyProp)
    .then(() => {
      dispatch({
        type: ACCEPT_FRIEND,
        payload: senderId
      });
      updateLocalStorageStore("friends");
    })
    .catch(err => console.log(err));
};

// marks a friend request as deleted by the recipient
export const rejectFriendRequest = senderId => dispatch => {
  let bodyProp = {};
  bodyProp.updateParams = { deleted: true };
  bodyProp.senderId = senderId;
  dispatch(setFriendsLoading);
  axios
    .put("/api/friends", bodyProp)
    .then(() => {
      dispatch({
        type: REMOVE_FRIEND,
        payload: {
          list: "received",
          data: senderId
        }
      });
      updateLocalStorageStore("friends");
    })
    .catch(err => console.log(err));
};

// Delete a friend object
export const deleteRelationship = (otherId, list) => dispatch => {
  dispatch(setFriendsLoading);
  axios
    .delete("/api/friends", otherId)
    .then(() => {
      dispatch({
        type: REMOVE_FRIEND,
        payload: {
          list,
          data: otherId
        }
      });
      updateLocalStorageStore("friends");
    })
    .catch(err => console.log(err));
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
