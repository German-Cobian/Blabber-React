import React, {useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { logoutUser } from '../redux/actions/auth';
import { displayUsers } from '../redux/actions/users';
import MenuHamburger from '../assets/menu.svg';
import MenuClose from '../assets/close.svg';
import '../style/sidebar.css'

const Sidebar = () => {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const { currentUser } = useSelector((state) => state.auth);

  const openMenu = (event) => {
    event.preventDefault();
    setIsOpen(!isOpen);
  };

  const users = useSelector((state) => state.users);
  useEffect(() => {
      dispatch(displayUsers());
  }, [dispatch]);

  const logout = () => {
    dispatch(logoutUser());
  };

  const adminLinks = [{
    path: '/manage',
    name: 'Manage Users',
  }];

  const isAdmin = () => {
    if (currentUser && currentUser.role === 'admin') {
      return true;
    }
    return false;
  };
  
  return (
    <>
      <div className="divH-C">
        <button className="buttonH-C" onClick={(e) => openMenu(e)} type="button" id="menu-options">
          <img className="iconH-C" src={isOpen ? MenuClose : MenuHamburger} alt="hamburger-menu" />
        </button>
      </div>
      <aside className={isOpen ? 'open sidebar' : 'sidebar'}>
        <nav className="nav d-flex flex-column align-items-center mt-5">
          <h2 className="link-txt">Contacts:</h2>
          <ul className="list-unstyled my-5">
            {Array.isArray(users) && users.map((user) => (
              <li key={user.id} className="rounded-4">
                <NavLink
                  to={`/chat/${user.id}`}
                  key={user.id}
                  id={user.id}
                  activeClassName="active-link"
                  className="link-txt my-5">
                  <span><small>{user.username}</small></span>
                </NavLink>
              </li>
            ))}
            {isAdmin()? adminLinks.map(({ path, name }) => (
                <li key={path}>
                  <NavLink 
                    className="link-txt" 
                    to={path}>
                    <span><small>{name}</small></span>
                  </NavLink>
                </li>
              ))
              : null}
          </ul>
          <div className="nav-btns mt-5">
          <NavLink to="/" activeClassName="active-link" className="link-txt me-3"><span><small>Back</small></span></NavLink>
            <button className="btn btn-outline-light" type="button" onClick={logout}>Logout</button>
          </div>
        </nav>
      </aside>
    </>
  )
}

export default Sidebar;
