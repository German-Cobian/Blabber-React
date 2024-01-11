import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { deleteUser } from '../redux/actions/users';
import '../style/outlet.css';

const ManageUsers = (props) => {
  const dispatch = useDispatch();

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
            <div className="my-3">
              <button
                type="button"
                className="btn btn-outline-danger rounded"
                onClick={() => dispatch(deleteUser(id))}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ManageUsers;