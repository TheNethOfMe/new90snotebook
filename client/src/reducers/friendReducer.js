import { GET_FRIENDS, FRIENDS_LOADING } from "../actions/types";

const initialState = {
  friends: {
    mutual: [],
    requested: [],
    received: []
  },
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_FRIENDS:
      return {
        ...state,
        friends: action.payload,
        loading: false
      };
    case FRIENDS_LOADING:
      return {
        ...state,
        loading: true
      };
    default:
      return state;
  }
}
