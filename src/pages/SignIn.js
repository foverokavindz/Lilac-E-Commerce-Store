import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  signInFailure,
  signInStart,
  signInSuccess,
} from '../store/reducers/user/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import OAuth from '../components/OAuth';

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

      console.log('res', res);
      const data = await res.json();

      const token = res.headers.get('x-auth-token');
      console.log('token  ', token);
      console.log('data', data);

      if (token) {
        localStorage.setItem('lilac-auth-token', token);
      }

      if (data.error) dispatch(signInFailure());
      //setError(true);

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
        <OAuth />
      </div>
      {error ? <p>Something went Wrong!</p> : ''}
    </div>
  );
};

export default SignIn;
