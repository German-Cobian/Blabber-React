import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Users from './Users';
import { displayUsers } from '../redux/actions/users';
import '../style/outlet.css';

const ManageUsers = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const users = useSelector((state) => state.users);

  const { currentUser } = useSelector((state) => state.auth);
  if (currentUser.role !== 'admin') {
    navigate('/');
  }

  useEffect(() => {
    if (users.length === 0) {
      dispatch(displayUsers());
    }
  }, [dispatch, users.length]);

  return (
    <main className="container">
      <div>
        <div>
          {users.map((user) => (
            <div key={user.id} className="border border-light my-3 mx-5 h-25">
              <Users 
                key={user.id}
                id={user.id}
                username={user.username}
                role={user.role}
                status={user.is_enabled}
              />
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default ManageUsers;
