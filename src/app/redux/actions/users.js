import { FETCH_USERS, EDIT_USER, DELETE_USER } from '.';
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

export const editUser = (id, updatedUserData) => async (dispatch) => {
  try {
    const response = await fetch(`http://localhost:3001/users/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: getToken(),
      },
      body: JSON.stringify(updatedUserData),
    });

    if (response.ok) {
      dispatch({ type: EDIT_USER, payload: id });
    } else {
      // Handle errors if needed
      console.error('Failed to update user');
    }
  } catch (error) {
    // Handle fetch errors if needed
    console.error('Error updating user:', error);
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
