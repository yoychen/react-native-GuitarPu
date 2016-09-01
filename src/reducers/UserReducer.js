import {
  SET_USER_INFO
} from '../actions/UserActions';

export function user(state = {
  uid: null,
  name: null,
}, action) {
  switch (action.type) {
    case SET_USER_INFO:
      return {
        uid: action.uid,
        name: action.name,
      };
    default:
      return state;
  }
}
