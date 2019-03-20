import { GET_FRIENDS, FRIENDS_LOADING, ADD_FRIEND } from "../actions/types";

const initialState = {
  friends: null,
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
    case ADD_FRIEND:
      return {
        ...state,
        friends: {
          ...state.friends,
          pending: state.friends.pending.concat(action.payload)
        }
      };
    default:
      return state;
  }
}
