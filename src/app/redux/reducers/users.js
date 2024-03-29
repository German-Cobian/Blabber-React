import { FETCH_USERS, EDIT_USER, DELETE_USER } from '../actions/.';

const initialState = [];

const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USERS:
      return action.payload;
    case EDIT_USER:
      return state.filter((item) => item.id !== action.payload);
    case DELETE_USER:
      return state.filter((item) => item.id !== action.payload);
    default:
      return state;
  }
};

export default usersReducer;
