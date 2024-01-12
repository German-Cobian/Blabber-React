import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { getToken } from '../redux/actions/auth';
import { editUser } from '../redux/actions/users';
import { deleteUser } from '../redux/actions/users';
import '../style/outlet.css';

const EditUser = () => {
  const { reset } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const [username, setUsername] = useState('');

  const { currentUser } = useSelector((state) => state.auth);
  if (currentUser.role !== 'admin') {
    navigate('/');
  }

  const [user, setUser] = useState({
    role: '',
    status: '',
  });
  

  useEffect(() => {
    (async () => {
      const response = await fetch(`http://localhost:3001/users/${id}`, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: getToken(),
        },
      });
      if (response.ok) {
        const data = await response.json();
        setUsername(data.username);
        setUser({
          role: data.role,
          status: data.is_enabled,
        });
      }
    })();
  }, [id]);
 
  const handleChange = (e) => {
    setUser((prevUser) => ({
      ...prevUser,
      [e.target.name]: e.target.name === 'role' ? e.target.value : e.target.name === 'status' ? e.target.value === 'true' : prevUser.status,
    }));
    console.log(user.role)
    console.log(user.status)
  };

  const handleSubmit = (e) => {
    e.preventDefault();
      const updatedUserData = {
        role: user.role,
        is_enabled: user.status,
      };

      dispatch(editUser(id, updatedUserData));
      navigate('/manage');
      reset();
  };
  

  return (
    <main className="container">
      <div className="my-3 d-flex flex-column align-items-center">
        <h2>Edit User</h2>
        <div className="d-flex flex-column justify-content-between border border-dark rounded my-3 px-5">
          <div className="d-flex flex-column justify-content-around mt-3">
            <label htmlFor="username">Username: </label>
            <input className="form-control form-control-sm" type="" value={username} disabled />
          </div>
          <form onSubmit={handleSubmit}>
            <div>
              <div className="my-3">
                <label htmlFor="user-role"><strong>User Role:</strong></label>
                <div className="d-flex flex-column justify-content-start ms-5">
                  <div className="d-flex flex-row justify-content-between mb-3">
                    <label>User</label>
                    <input
                      type="radio"
                      name="role"
                      value="user"
                      checked={user.role === 'user'}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="d-flex flex-row justify-content-between mb-3">
                    <label>Admin</label>
                    <input
                      type="radio"
                      name="role"
                      value="admin"
                      checked={user.role === 'admin'}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>
              <div className="my-3">
                <label htmlFor="user-status"><strong>Status:</strong></label>
                <div className="d-flex flex-column justify-content-start ms-5">
                  <div className="d-flex flex-row justify-content-between mb-3">
                    <label>Enabled</label>
                    <input
                      type="radio"
                      name="status"
                      value={true}
                      checked={user.status === true}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="d-flex flex-row justify-content-between">
                  <label>Disabled</label>
                    <input
                      type="radio"
                      name="status"
                      value={false}
                      checked={user.status === false}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>
              <div className="d-flex flex-row justify-content-between mt-5 mb-3">
                <button className="btn btn-outline-primary rounded" type="submit" >
                  Edit User
                </button>
                <button
                  type="button"
                  className="btn btn-outline-danger rounded"
                  onClick={() => dispatch(deleteUser(id))}
                >
                  Delete User if Inactive
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
};

export default EditUser;
