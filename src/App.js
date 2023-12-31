import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { loginUser, checkAuth } from './app/redux/actions/auth';

function App() {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const handleClick = () => {
    dispatch(loginUser({ username: 'Steve', email: 'steve@gmail.com', password: 'steve123' }));
  };

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  return (
    <Router>
      <div className="App">
        { auth.loggedIn ? 'logged in' : 'not logged in'}
        <button type="button" onClick={handleClick}>get data</button>
      </div>
    </Router>
  );
}

export default App;
