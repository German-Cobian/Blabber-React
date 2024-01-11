import { FETCH_USERS, DELETE_USER } from '.';
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
    console.log(data)
    const users = data.map((user) => user.attributes);
    dispatch({ type: FETCH_USERS, payload: users });
    } else {
    dispatch({ type: FETCH_USERS, payload: [] });
  }
};

export const deleteUser = (id) => async (dispatch) => {
  const response = await fetch(`http://localhost:3001/users/${id}`, {
    method: 'DELETE',
    headers: { 
      'Content-Type': 'application/json',
      Authorization: getToken(),
     },
  });

  if (response.ok) dispatch({ type: DELETE_USER, payload: id });
};
