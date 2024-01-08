import { combineReducers } from 'redux'
import authReducer from './auth'
import usersReducer from './users';
import singleUserReducer from './singleUser';
import messagesReducer from './messages';

export default combineReducers({
  auth: authReducer,
  users: usersReducer,
  user: singleUserReducer,
  messages: messagesReducer,
})
