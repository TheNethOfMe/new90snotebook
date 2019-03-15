import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import profileReducer from "./profileReducer";
import notificationReducer from "./notificationReducer";
import friendReducer from "./friendReducer";

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  profile: profileReducer,
  notifications: notificationReducer,
  friends: friendReducer
});
