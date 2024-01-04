import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import useAuth from './app/hooks/useAuth';
import ProtectedRoutes from './app/components/ProtectedRoutes';
import WithSidebar from './app/components/WithSidebar';
import Signup from './app/components/Signup';
import Login from './app/components/Login';
import Logout from './app/components/Logout';
import Chat from './app/components/Chat';

function App() {
  const { authChecked, loggedIn } = useAuth();

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login loggedIn={loggedIn} />} />
        <Route path="/signup" element={<Signup />} />
        <Route element={<ProtectedRoutes isAllowed={loggedIn} authChecked={authChecked} redirectPath="/login" />}>
          <Route element={<WithSidebar />}>
            <Route path="/chat/:id" element={<Chat />} />
            <Route path="/logout" element={<Logout />} />
          </Route>  
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
