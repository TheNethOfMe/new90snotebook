import axios from "axios";
import {
  GET_PROFILE,
  PROFILE_LOADING,
  CLEAR_CURRENT_PROFILE,
  SEARCH_PROFILES
} from "./types";
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
      dispatch(userProfileWasCreated());
    })
    .catch(err => {
      dispatch(setErrors(err));
    });
};

// Return profiles after name search
export const searchForUser = searchQuery => dispatch => {
  dispatch(setProfileLoading);
  let urlString = "/api/profile/search/?";
  let queryArray = [];
  if (searchQuery.firstName)
    queryArray.push(`firstName=${searchQuery.firstName}`);
  if (searchQuery.lastName) queryArray.push(`lastName=${searchQuery.lastName}`);
  if (searchQuery.nickName) queryArray.push(`nickName=${searchQuery.nickName}`);
  urlString += queryArray.join("&");
  axios.get(urlString).then(res => {
    dispatch({
      type: SEARCH_PROFILES,
      payload: res.data
    });
  });
};
