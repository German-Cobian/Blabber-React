import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import '../style/sidebar.css'

function WithSidebar() {
  return (
    <>
      <Sidebar />
      <Outlet />
    </>
  );
}

export default WithSidebar;