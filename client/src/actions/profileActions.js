import axios from "axios";
import { GET_PROFILE, PROFILE_LOADING, CLEAR_CURRENT_PROFILE } from "./types";
import setErrors from "./errorAction";
import { userProfileWasCreated } from "./authActions";

// Get current profile
export const getCurrentProfile = () => dispatch => {
  dispatch(setProfileLoading);
  axios
    .get("/api/profile")
    .then(res => {
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: GET_PROFILE,
        payload: {}
      });
    });
};

// Set profile loading
export const setProfileLoading = () => {
  return {
    type: PROFILE_LOADING
  };
};

// Clear current profile
export const clearCurrentProfile = () => {
  return {
    type: CLEAR_CURRENT_PROFILE
  };
};

// Create a profile
export const createNewProfile = profileData => dispatch => {
  axios
    .post("/api/profile/", profileData)
    .then(res => {
      dispatch(getCurrentProfile());
      console.log("Fire 1");
      dispatch(userProfileWasCreated());
      console.log("Fire 2");
    })
    .catch(err => {
      dispatch(setErrors(err));
    });
};
