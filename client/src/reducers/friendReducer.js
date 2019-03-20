import {
  GET_FRIENDS,
  FRIENDS_LOADING,
  ADD_FRIEND,
  REMOVE_FRIEND,
  ACCEPT_FRIEND
} from "../actions/types";

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
    case REMOVE_FRIEND:
      return {
        ...state,
        friends: {
          ...state.friends,
          [action.payload.list]: state.friends[action.payload.list].filter(
            request => {
              return request.friendUserId !== action.payload.data;
            }
          )
        },
        loading: false
      };
    case ACCEPT_FRIEND:
      const acceptedFriend = state.friends.received.filter(
        request => request.friendUserId === action.payload
      );
      return {
        ...state,
        friends: {
          ...state.friends,
          received: state.friends.received.filter(
            request => request.friendUserId !== action.payload
          ),
          mutual: state.friends.mutual.concat(acceptedFriend)
        }
      };
    default:
      return state;
  }
}
