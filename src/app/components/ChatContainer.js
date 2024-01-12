/* eslint-disable eqeqeq */
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { displayUser } from '../redux/actions/singleUser';
import Chat from './Chat';
import '../style/outlet.css';
import '../style/components.css';

const ChatContainer = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(displayUser(id));
  }, [dispatch, id]);

  const userData = useSelector((state) => state.user);

  if (!userData || userData.length === 0) {
    // Render a loading state when user is still being fetched
    return <div>Loading...</div>;
  }
  
  // Destructure the user data for cleaner props
  const {
    username,
    email,
    role,
    is_enabled,
    conversations,
  } = userData[0];

  return (
    <div className="container">
      <Chat
        key={id}
        id={id}
        username={username}
        email={email}
        role={role}
        is_enabled={is_enabled}
        conversations={conversations}
      />
    </div>
  );
};
export default ChatContainer;