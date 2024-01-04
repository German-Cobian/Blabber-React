import React, {useState } from 'react';
import { NavLink } from 'react-router-dom';
import MenuHamburger from '../assets/menu.svg';
import MenuClose from '../assets/close.svg';
import contacts from '../assets/data';
import '../style/sidebar.css'

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const openMenu = (event) => {
    event.preventDefault();
    setIsOpen(!isOpen);
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
            {contacts.map((contact) => (
              <li key={contact.id} className="rounded-4">
                <NavLink
                  to={`/chat/${contact.id}`}
                  id={contact.id}
                  activeClassName="active-link"
                  className="link-txt mt-5">
                  <span><small>{contact.name}</small></span>
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