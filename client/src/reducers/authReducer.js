import { SET_CURRENT_USER, PROFILE_CREATED } from "../actions/types";
import isEmpty from "../utils/isEmpty";

const initialState = {
  isAuthenticated: false,
  hasProfile: false,
  user: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        hasProfile: action.payload.hasProfile,
        user: action.payload
      };
    case PROFILE_CREATED:
      return {
        ...state,
        hasProfile: true
      };
    default:
      return state;
  }
}
