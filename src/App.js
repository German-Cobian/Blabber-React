import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import useAuth from './app/hooks/useAuth';
import ProtectedRoutes from './app/components/ProtectedRoutes';
import Signup from './app/components/Signup';
import Login from './app/components/Login';
import Logout from './app/components/Logout';

function App() {
  const { authChecked, loggedIn } = useAuth();

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login loggedIn={loggedIn} />} />
        <Route path="/signup" element={<Signup />} />
        <Route element={<ProtectedRoutes isAllowed={loggedIn} authChecked={authChecked} redirectPath="/login" />}>
          <Route path="/" element={<Logout />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
