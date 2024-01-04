/* eslint-disable eqeqeq */
import React from 'react';
import { useParams } from 'react-router-dom';
import '../style/outlet.css';
import '../style/components.css';
import contacts from '../assets/data';
import Send from '../assets/send.png';

const Chat = () => {
  const { id } = useParams();

  const selectedContact = contacts.find((contact) => contact.id === parseInt(id, 10));

  return (
    <div className="container">
      <div  className="d-flex flex-column align-items-start m-flex">
        <div>
          <h2 className="mt-5">Chat</h2>
        </div>
        <div className="border border-dark rounded my-2">
          <div class="d-flex flex-row justify-content-between mt-4">
              <p className="ms-5"><strong>{selectedContact.name}</strong></p>
              <p className="text-secondary me-5">{selectedContact.time}</p>
          </div>
          <p className="text-secondary mx-5">{selectedContact.text}</p>
        </div>
        <form class="resp-form">
          <div class="form-group d-flex flex-column align-items-start my-3">
            <input type="text" class="form-control" id="message-respond" placeholder="" />
          </div>
          <div class="d-flex flex-row justify-content-end">
            <button type="submit" class="mb-2" >
              <img className="send" src={Send} width="30" alt="send icon" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default Chat;
