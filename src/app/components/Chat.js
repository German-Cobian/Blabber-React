import React from 'react';

const Chat = (props) => {
  const {
    id, username, email, role, is_enabled, conversations
  } = props;

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
            {conversations.map((conversation) => (
              <li key={conversation.id}>
                <p>Title: {conversation.title}</p>
                <p>Participants:</p>
                <ul>
                  {conversation.participants.map((participant) => (
                    <li key={participant.user_id}>
                      {participant.username}
                    </li>
                  ))}
                </ul>
                <p>Messages:</p>
                <ul>
                  {conversation.messages.map((message) => (
                    <li key={message.user_id}>
                      <p>Body: {message.body}</p>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Chat;
