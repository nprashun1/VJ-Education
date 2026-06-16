import React, { useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import './Navbar.css'

function Navbar() {
  const location = useLocation();
  const currentPath = location.pathname;
  const navigate = useNavigate();
  
  useEffect(() => {
    navigate('/');
  }, []);

  const NavLinks = [
    { name: 'Home', to: '/' },
    { name: 'Branches ▾', dropdown: [{ Name: 'School', to: '/School' }, { Name: 'Coaching', to: '/Coaching' }, { Name: 'Hostel', to: '/Hostel' }] },
    { name: 'Gallery', to: '/gallery' },
    { name: 'About', to: '/About' },
    { name: 'Contact', to: '/Contact' },
  ]
  
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <img src="/vj.png" alt="vj logo" className='navbar-logo' />
        <h1 className="navbar-title"><b>VJ Education</b></h1>
      </div>
      <div className="navbar-links">
        {NavLinks.map(link => {
          if (link.dropdown) {
            const isActive = link.dropdown.some(item => currentPath.toLowerCase() === item.to.toLowerCase());
            return (
              <div className="dropdown" key={link.name}>
                <button className={isActive ? 'active' : ''}>{link.name}</button>
                <div className="dropdown-content">
                  {link.dropdown.map(item => (
                    <Link to={item.to} key={item.Name}>{item.Name}</Link>
                  ))}
                </div>
              </div>
            );
          } else if (link.to) {
            const isActive = link.to === '/' ? currentPath === '/' : currentPath.toLowerCase().startsWith(link.to.toLowerCase());
            return (
              <Link
                to={link.to}
                key={link.name}
                className={isActive ? 'active' : ''}
              >
                {link.name}
              </Link>
            );
          } else {
            return (
              <a href={link.href} key={link.name}>
                {link.name}
              </a>
            );
          }
        })}
      </div>
      <div className="navbar-login">
        <Link to="/staff">Staff Recruitment</Link>
      </div>
    </nav>
  )
}

export default Navbar