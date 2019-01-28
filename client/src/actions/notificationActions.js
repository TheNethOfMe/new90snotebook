import axios from "axios";
import { GET_NOTIFICATIONS, NOTIFICATIONS_LOADING } from "./types";

// set notifications loading
export const setNotificationsLoading = () => {
  return {
    type: NOTIFICATIONS_LOADING
  };
};

// get all user's notifications
export const getAllNotifications = () => dispatch => {
  dispatch(setNotificationsLoading);
  axios
    .get("/api/notification")
    .then(res => {
      dispatch({
        type: GET_NOTIFICATIONS,
        payload: res.data
      });
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
