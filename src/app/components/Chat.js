import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addMessage } from '../redux/actions/messages';
import '../style/outlet.css';
import '../style/components.css';

const Chat = (props) => {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.auth);
  const [message, setMessage] = useState('');

  const {
    id, username, email, role, is_enabled, conversations
  } = props;

  const onSubmit = (data) => {
    console.log("onSubmit fired!")
    console.log(conversations.id)
    console.log(currentUser.id)
    console.log(message)

    if (!conversations) {
      // Handle the case where conversations is undefined
      console.error('Conversations is undefined');
      return;
    }

    // Extract conversation ID from the props
    const conversationId = conversations.id;

    // Combine data with conversation ID and user ID
    const messageData = {
      user_id: currentUser.id,
      body: message,
    };

    // Dispatch the addMessage action
    dispatch(addMessage(conversationId, messageData));

    // Reset form or navigate, if needed
    setMessage('');
  };

  return (
    <div className="container">
      <div className="border border-dark rounded my-3 w-50" key={id}>
        <div className="mx-5 mb-5">
          <p>ID: {id}</p>
          <p>Username: {username}</p>
          <p>Email: {email}</p>
          <p>Role: {role}</p>
          <p>Enabled: {is_enabled}</p>
          <h3>Conversations:</h3>
          <ul>
            <li key={conversations.id}>
              <p>ID: {conversations.id}</p>
              <p>Title: {conversations.title}</p>
              <p>Participants:</p>
              <ul>
                {conversations.participants.map((participant) => (
                  <li key={participant.user_id}>
                    {participant.username}
                  </li>
                ))}
              </ul>
              <p>Messages:</p>
              <ul>
                {conversations.messages.map((message) => (
                  <li key={message.user_id}>
                    <p>Body: {message.body}</p>
                  </li>
                ))}
              </ul>
            </li>
          </ul>
        </div>
        <form className="my-3 d-flex flex-row justify-content-center border border-dark" onSubmit={onSubmit}>
          <div className="my-3 mx-5">
            <div className="d-flex flex-row justify-content-between my-3">
              <label htmlFor="message">Message Text:</label>
              <input
                id="message"
                type="text"
                name="message"
                placeholder="Type your message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
              />
            </div>
            <div className="my-3">
              <button className="btn btn-primary btn-lg" type="submit">
                Add Message
              </button>
            </div>
          </div>
        </form>
      </div>

    </div>
  );
};

export default Chat;
