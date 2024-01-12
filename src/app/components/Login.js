/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/jsx-props-no-spreading */

import React from 'react';
import { useState } from 'react';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { Link, Navigate } from 'react-router-dom';
import { loginUser } from '../redux/actions/auth';

const Login = ({ loggedIn }) => {
  if (loggedIn) return <Navigate to="/" replace />;

  const dispatch = useDispatch();
  const [error, setError] = useState(null);
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onFormSubmit = (data) => dispatch(loginUser(data)).catch(() => setError('Invalid credentials. Try again'));

  return (
    <main className="d-flex flex-row justify-content-center">
      <div className="border border-dark rounded mt-5 py-5 px-5">
        <div className="mb-4">
          <h2 className="">LOG IN</h2>
        </div>
        {error && <p className="">{error}</p>}
        {errors.username && <p className="">Username is required</p>}
        {errors.email && <p className="">Email is required</p>}
        {errors.password && <p className="">Password is required</p>}
        <form onSubmit={handleSubmit(onFormSubmit)}>
          <div className="mb-3">
            <input
              type="username"
              placeholder="Username"
              {...register('username', { required: 'Username is required' })}
            />
          </div>
          <div className="mb-3">
            <input
              type="email"
              placeholder="e-mail address"
              {...register('email', { required: 'email is required' })}
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              placeholder="Password"
              {...register('password', { required: 'Password is required' })}
            />
          </div>
          <div className="d-flex flex-column">
            <input className="btn btn-outline-primary rounded" type="submit" value="Log In" />
            <Link className="text-success mt-3" to="/signup">Sign Up</Link>
          </div>
        </form>
      </div>
    </main>
  );
};

Login.propTypes = {
  loggedIn: PropTypes.bool.isRequired,
};

export default Login;
