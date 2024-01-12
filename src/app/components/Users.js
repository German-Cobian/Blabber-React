import React from 'react';
import { Link } from 'react-router-dom';
import '../style/outlet.css';

const ManageUsers = (props) => {

  const {
    id, username, role, status
  } = props;

  return (
    <main className="">
      <div className="d-flex flex-row">
        <div key={id} className="">
          <div className="div-flex flex-column my-3 mx-5">
              <p className="">
                <span className="font-weight-bold"><strong>Username: </strong></span>
                {username}
              </p>
              <p className="">
                <span className="font-weight-bold"><strong>Role: </strong></span>
                {role}
              </p>
              <p className="">
                <span className="font-weight-bold"><strong>Status: </strong></span>
                {status}
              </p>
              <Link  to={`/update/${id}`} className="text-decoration-none">Edit User</Link>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ManageUsers;
