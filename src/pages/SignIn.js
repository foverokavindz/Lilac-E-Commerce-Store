import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  signInFailure,
  signInStart,
  signInSuccess,
} from '../store/reducers/user/userSlice';
import { useDispatch, useSelector } from 'react-redux';

const SignIn = () => {
  const [formData, setFormData] = useState({});
  // const [isLoading, setIsLoading] = useState(false);
  // const [error, setError] = useState(false);

  const { loading, error } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleChnage = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
    console.log('formData  ', formData);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      //setIsLoading(true);
      dispatch(signInStart());
      const res = await fetch('http://localhost:3005/api/auth/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });
      const data = await res.json();

      if (data.error) dispatch(signInFailure());
      //setError(true);

      console.log('data  ', data);
      dispatch(signInSuccess(data));
      navigate('/');
    } catch (error) {
      console.log('error', error);

      dispatch(signInFailure(error));
    }
  };
  return (
    <div>
      Sign In
      <div>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="email"
            id="email"
            className=""
            onChange={handleChnage}
          />
          <input
            type="password"
            placeholder="password"
            id="password"
            className=""
            onChange={handleChnage}
          />
          <br />
          <br />
          <button disabled={loading}>
            {loading ? 'loading...' : 'Sign up'}
          </button>
        </form>
        <div>
          <p>
            Have an account{' '}
            <span>
              <Link to={'/sign-up'}>Sign up</Link>
            </span>
          </p>
        </div>
        <button>Login with Google</button>
      </div>
      {error ? <p>Something went Wrong!</p> : ''}
    </div>
  );
};

export default SignIn;
