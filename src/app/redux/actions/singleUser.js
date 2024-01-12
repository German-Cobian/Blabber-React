import { FETCH_USER } from '.';
import { getToken } from './auth';

export const displayUser = (id) => async (dispatch) => {
  const response = await fetch(`http://localhost:3001/users/${id}`, {
    method: 'GET',
    headers: { 
      'Content-Type': 'application/json',
      Authorization: getToken(),
     },
  });
  if (response.ok) {
    const data = await response.json();
    dispatch({ type: FETCH_USER, payload: data });
    } else {
    dispatch({ type: FETCH_USER, payload: [] });
  }
};
