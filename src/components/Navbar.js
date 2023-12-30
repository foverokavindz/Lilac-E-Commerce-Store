import React from 'react';
import { Link } from 'react-router-dom';

const headerStyle = {
  backgroundColor: '#DADADA',
  marginBottom: '20px',
};

const Navbar = () => {
  return (
    <div style={headerStyle}>
      <div>
        <Link to="/">
          <h1>Lilac</h1>
        </Link>
      </div>
      <div>
        <ul>
          <Link to={'/'}>
            {' '}
            <li>Home</li>
          </Link>
          <Link to={'/about'}>
            {' '}
            <li>About</li>
          </Link>
          <Link to={'/sign-in'}>
            {' '}
            <li>Sign in</li>
          </Link>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
