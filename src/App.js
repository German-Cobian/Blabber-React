import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import useAuth from './app/hooks/useAuth';
import ProtectedRoutes from './app/components/ProtectedRoutes';
import WithSidebar from './app/components/WithSidebar';
import Signup from './app/components/Signup';
import Login from './app/components/Login';
import Blank from './app/components/Blank';
import ChatContainer from './app/components/ChatContainer';
import ManageUsers from './app/components/ManageUsers';
import EditUser from './app/components/EditUser';

function App() {
  const { authChecked, loggedIn } = useAuth();

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login loggedIn={loggedIn} />} />
        <Route path="/signup" element={<Signup />} />
        <Route element={<ProtectedRoutes isAllowed={loggedIn} authChecked={authChecked} redirectPath="/login" />}>
          <Route element={<WithSidebar />}>
            <Route path="/" element={<Blank />} />
            <Route path="/chat/:id" element={<ChatContainer />} />
            <Route path="/manage" element={<ManageUsers />} />
            <Route path="/update/:id" element={<EditUser />} />
          </Route>  
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
