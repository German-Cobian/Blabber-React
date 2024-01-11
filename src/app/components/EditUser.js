import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { getToken } from '../redux/actions/auth';
import { editUser } from '../redux/actions/users';
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
    role: 'user',  // initialize role
    status: true,  // initialize status as true (checked)
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
      [e.target.name]: e.target.name === 'status' ? e.target.checked : e.target.value,
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
        <div className="d-flex flex-column justify-content-between border rounded border-primary my-3 px-5">
          <div className="d-flex flex-column justify-content-around mt-3">
            <label htmlFor="username">Username: </label>
            <input className="form-control form-control-sm" type="" value={username} disabled />
          </div>
          <form onSubmit={handleSubmit}>
            <div>
              <div className="d-flex flex-column justify-content-around my-3">
                <label htmlFor="user-role">User Role: </label>
                <input
                  id="user-role"
                  type="text"
                  name="role"
                  placeholder="user-role"
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="d-flex flex-column justify-content-around my-3">
                <label htmlFor="user-status"> Enabled: </label>
                <input
                  id="user-status"
                  type="checkbox"
                  name="status"
                  checked={user.status}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <button className="btn btn-outline-primary rounded" type="submit" >
                  Edit User
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
