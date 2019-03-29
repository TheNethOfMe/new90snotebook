import axios from "axios";
import jwt_decode from "jwt-decode";
import setAuthToken from "../utils/setAuthToken";
import setErrors from "./errorAction";
import * as lss from "../utils/localStorageStore";

import { SET_CURRENT_USER, PROFILE_CREATED, CHANGE_THEME } from "./types";
import { getCurrentProfile } from "./profileActions";
import {
  updateThemeForLocalStorage,
  addToLocalStorageStore
} from "../utils/localStorageStore";

// Set Logged in User
export const setCurrentUser = decoded => {
  const decodedWithTheme = updateThemeForLocalStorage(decoded);
  return {
    type: SET_CURRENT_USER,
    payload: decodedWithTheme
  };
};

// Register User
export const registerUser = (userData, history) => dispatch => {
  axios
    .post("/api/users/register", userData)
    .then(res => history.push("/login"))
    .catch(err => dispatch(setErrors(err)));
};

// Login - Get User Token
export const loginUser = userData => dispatch => {
  axios
    .post("/api/users/login", userData)
    .then(res => {
      // Save token to localstorage and auth header
      const { token } = res.data;
      localStorage.setItem("notebookToken", token);
      setAuthToken(token);
      // Set current user
      const decoded = jwt_decode(token);
      dispatch(setCurrentUser(decoded));
      dispatch(getCurrentProfile());
    })
    .catch(err => dispatch(setErrors(err)));
};

// Update store when user creates profile
export const userProfileWasCreated = () => {
  return { type: PROFILE_CREATED };
};

// Update store when user updates theme
export const userChangeTheme = theme => dispatch => {
  console.log(theme.theme);
  axios
    .put("/api/users/update", theme)
    .then(update => {
      dispatch({
        type: CHANGE_THEME,
        payload: theme.theme
      });
      addToLocalStorageStore("theme", theme.theme);
    })
    .catch(err => console.log(err));
};

// Log Out
export const logoutUser = () => dispatch => {
  // Remove token from local storage
  localStorage.removeItem("notebookToken");
  // Rmove auth header from future requests
  setAuthToken(false);
  // Set current user to empty object
  dispatch(setCurrentUser({}));
  lss.emptyLocalStore();
};
