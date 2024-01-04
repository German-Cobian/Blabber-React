import React, {useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { displayUsers } from '../redux/actions/users';
import MenuHamburger from '../assets/menu.svg';
import MenuClose from '../assets/close.svg';
import '../style/sidebar.css'

const Sidebar = () => {
  const dispatch = useDispatch();

  const [isOpen, setIsOpen] = useState(false);

  const openMenu = (event) => {
    event.preventDefault();
    setIsOpen(!isOpen);
  };

  const users = useSelector((state) => state.users);
  useEffect(() => {
      dispatch(displayUsers());
  }, [dispatch]);
  
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
            {users.map((user) => (
              <li key={user.id} className="rounded-4">
                <NavLink
                  to={`/chat/${user.id}`}
                  id={user.id}
                  activeClassName="active-link"
                  className="link-txt mt-5">
                  <span><small>{user.username}</small></span>
                </NavLink>
              </li>
            ))}
          </ul>
          <NavLink to="/" activeClassName="active-link" className="link-txt mt-5"><span><small>Back</small></span></NavLink>
        </nav>
      </aside>
    </>
  )
}

export default Sidebar;