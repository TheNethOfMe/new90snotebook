import axios from "axios";
import jwt_decode from "jwt-decode";
import setAuthToken from "../utils/setAuthToken";
import setErrors from "./errorAction";

import { SET_CURRENT_USER } from "./types";

// Set Logged in User
export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
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
    })
    .catch(err => dispatch(setErrors(err)));
};

// Log Out
export const logoutUser = () => dispatch => {
  // Remove token from local storage
  localStorage.removeItem("notebookToken");
  // Rmove auth header from future requests
  setAuthToken(false);
  // Set current user to empty object
  dispatch(setCurrentUser({}));
};
