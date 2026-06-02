import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import './Navbar.css'
// import Staff from '../Staaff/Staff'

function Navbar() {
  const [activeLink, setActiveLink] = useState('Home')

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
        {NavLinks.map(link => (
          link.dropdown ? (
            <div className="dropdown" key={link.name}>
              <button>{link.name}</button>
              <div className="dropdown-content">
                {link.dropdown.map(item => (
                  <a href={item.to} key={item.Name}>{item.Name}</a>
                ))}
              </div>
            </div>
          ) : link.to ? (
            <Link
              to={link.to}
              key={link.name}
              className={activeLink === link.name ? 'active' : ''}
              onClick={() => setActiveLink(link.name)}
            >
              {link.name}
            </Link>
          ) : (
            <a
              href={link.href}
              key={link.name}
              className={activeLink === link.name ? 'active' : ''}
              onClick={() => setActiveLink(link.name)}
            >
              {link.name}
            </a>
          )
        ))}
      </div>
      <div className="navbar-login">
        <Link to="/staff">Staff Recruitment</Link>
      </div>
    </nav>
  )
}

export default Navbar