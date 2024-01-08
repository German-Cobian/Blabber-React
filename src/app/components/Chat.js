import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addMessage } from '../redux/actions/messages';
import Send from '../assets/send.png';
import '../style/outlet.css';
import '../style/components.css';

const Chat = (props) => {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.auth);
  const [message, setMessage] = useState('');

  const {
    id, conversations
  } = props;

  const onSubmit = (data) => {
    
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
      <div className="ms-5">
      <div className="d-flex flex-row justify-content-start my-5 ms-5">
        <h3>{conversations.title}</h3>
      </div>
      <div key={id}>
        <ul>
          {conversations.messages.map((message) => (
            <li className="border border-dark rounded my-3 me-5 w-100" key={message.user_id}>
              <p className="ms-3"><small><strong>{message.username}</strong></small></p>
              <p className="ms-5"> {message.body}</p>
            </li>
          ))}
        </ul>
      </div>
      <form className="d-flex flex-row justify-content-end border-top border-dark mt-5" onSubmit={onSubmit}>
        <div className="chat-input d-flex flex-row">
          <div className="">
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
          <div>
            <button  type="submit">
              <img className="send" src={Send} width="35" height="23" alt="send icon" />
            </button>
          </div>
        </div>
      </form>
      </div>
    </div>
  );
};

export default Chat;
