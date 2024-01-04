import { FETCH_USERS } from '.';
import { getToken } from './auth';

export const displayUsers = () => async (dispatch) => {
  const response = await fetch('http://localhost:3001/users', {
    method: 'GET',
    headers: { 
      'Content-Type': 'application/json',
      Authorization: getToken(),
     },
  });
  if (response.ok) {
    const data = await response.json();
    const users = data.map((user) => user.attributes);
    dispatch({ type: FETCH_USERS, payload: users });
    } else {
  dispatch({ type: FETCH_USERS, payload: [] });
  }
};
