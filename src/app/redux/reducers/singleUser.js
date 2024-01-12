import { FETCH_USER } from '../actions/.';

const initialState = [];

const singleUserReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USER:
      return [action.payload];
    default:
      return state;
  }
};

export default singleUserReducer;
