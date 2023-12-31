import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const headerStyle = {
  backgroundColor: '#DADADA',
  marginBottom: '20px',
};

const Navbar = () => {
  const { currentUser } = useSelector((state) => state.user);
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
          <Link to={'/profile'}>
            {currentUser ? (
              // eslint-disable-next-line jsx-a11y/img-redundant-alt
              <img
                src={currentUser.profilePicture}
                alt={'profile image'}
                width={'80px'}
                style={{ borderRadius: '100%' }}
              />
            ) : (
              <li>Sign in</li>
            )}
          </Link>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
