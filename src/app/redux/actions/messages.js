import { CREATE_MESSAGE } from '.';
import { getToken } from './auth';

export const addMessage = (conversationId, data) => async (dispatch) => {
  try {
  
  const response = await fetch(`http://localhost:3001/conversations/${conversationId}/messages`, {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json',
      Authorization: getToken(),
     },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error('Failed to create message');
  }

  const responseData = await response.json();
  dispatch({ type: CREATE_MESSAGE, payload: responseData.data });
  } catch (error) {
  console.error('Error creating message:', error);
  // Handle error, dispatch appropriate action if needed
  };
};
