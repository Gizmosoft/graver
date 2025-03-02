import React from 'react'
import './Logo.css';
import { Link } from 'react-router-dom';

const NavbarLogo = () => {
  return (
    <div className='navbar-logo'>
      <Link to='/'>Graver</Link>
    </div>
  )
}

export default NavbarLogo;
