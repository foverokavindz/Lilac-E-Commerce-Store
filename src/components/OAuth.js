import React from 'react';
import { GoogleAuthProvider, signInWithPopup, getAuth } from 'firebase/auth';
import { app } from '../firebase';
import { useDispatch } from 'react-redux';
import { signInSuccess } from '../store/reducers/user/userSlice';
import { useNavigate } from 'react-router-dom';

const OAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleGoogleClick = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);
      const result = await signInWithPopup(auth, provider);
      console.log('result  ', result);
      const res = await fetch('http://localhost:3005/api/auth/google', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: result.user.displayName,
          email: result.user.email,
          photo: result.user.photoURL,
        }),
      }); // you need add this line

      const data = await res.json();
      const token = res.headers.get('x-auth-token');

      console.log('token  ', token);
      console.log('data', data);

      if (token) {
        localStorage.setItem('lilac-auth-token', token);
      }
      dispatch(signInSuccess(data));
      navigate('/');
    } catch (error) {
      console.log('Could not login with google', error);
    }
  };
  return (
    <>
      <button type="button" onClick={handleGoogleClick}>
        Continue with Google
      </button>
    </>
  );
};

export default OAuth;
