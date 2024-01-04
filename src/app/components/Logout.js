import React from 'react';
import { useDispatch } from 'react-redux';
import { logoutUser } from '../redux/actions/auth';
import '../style/outlet.css';
import '../style/components.css';

const Logout = () => {
  const dispatch = useDispatch();

  const logout = () => {
    dispatch(logoutUser());
  };

  return (
    <>
      <div className="container">
        <h1>Logout Test Page</h1>
        <button className="" type="button" onClick={logout}>Logout</button>
      </div>
    </>
  );
};

export default Logout
;