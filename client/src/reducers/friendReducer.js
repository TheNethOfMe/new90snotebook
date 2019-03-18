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
      let result = {};
      if (action.payload.cat === "new") {
        result.sent = state.friends.sent.concat(action.payload.data);
      }
      if (action.payload.cat === "accept") {
        result.mutual = state.friends.mutual.concat(action.payload.data);
      }
      console.log(result);
      return {
        ...state,
        friends: {
          ...state.friends,
          ...result
        }
      };
    default:
      return state;
  }
}
