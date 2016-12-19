import {
  FETCH_USERS,
  FETCH_USER
} from '../actions/types';

export default function(state = {}, action) {
  switch (action.type) {
    case FETCH_USERS:
      return { ...state, users: action.payload }
    case FETCH_USER:
      return { ...state, displayedUser: action.payload }
    default:
        return state;
  }
}
