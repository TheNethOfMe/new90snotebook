import axios from "axios";
import { GET_NOTIFICATIONS, NOTIFICATIONS_LOADING } from "./types";
import { addToLocalStorageStore } from "../utils/localStorageStore";

// set notifications loading
export const setNotificationsLoading = () => {
  return {
    type: NOTIFICATIONS_LOADING
  };
};

// populate Notifications store from database on login
export const getAllNotifications = () => dispatch => {
  dispatch(setNotificationsLoading);
  axios
    .get("/api/notification")
    .then(res => {
      dispatch({
        type: GET_NOTIFICATIONS,
        payload: res.data
      });
      addToLocalStorageStore("notifications", res.data);
    })
    .catch(err => console.log(err));
};

// delete a notification
export const deleteNotification = id => dispatch => {
  axios
    .delete(`/api/notification/${id}`)
    .then(res => dispatch(getAllNotifications()))
    .catch(err => console.log(err));
};

// Populate store from local storage on reload
export const populateNotificationsFromStorage = localStorageData => dispatch => {
  dispatch({
    type: GET_NOTIFICATIONS,
    payload: localStorageData
  });
};
