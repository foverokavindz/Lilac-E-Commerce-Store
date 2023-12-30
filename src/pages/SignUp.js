import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import OAuth from '../components/OAuth';

const SignUp = () => {
  const [formData, setFormData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const handleChnage = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
    console.log('formData  ', formData);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Data  ', JSON.stringify(formData));
    try {
      setIsLoading(true);
      const res = await fetch('http://localhost:3005/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (data.error) setError(true);

      setIsLoading(false);
      console.log('data  ', data);
      navigate('/sign-in');
    } catch (error) {
      console.log('error', error);
      setIsLoading(false);
      setError(true);
    }
  };
  return (
    <div>
      Sign up
      <div>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="firstname"
            id="firstName"
            className=""
            onChange={handleChnage}
          />
          <input
            type="text"
            placeholder="lastname"
            id="lastName"
            className=""
            onChange={handleChnage}
          />
          <input
            type="text"
            placeholder="phone"
            id="phone"
            className=""
            onChange={handleChnage}
          />
          <input
            type="text"
            placeholder="address"
            id="address"
            className=""
            onChange={handleChnage}
          />
          <input
            type="text"
            placeholder="city"
            id="city"
            className=""
            onChange={handleChnage}
          />
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
          <button disabled={isLoading}>
            {isLoading ? 'loading...' : 'Sign up'}
          </button>
        </form>
        <div>
          <p>
            Have an account{' '}
            <span>
              <Link to={'/sign-in'}>Sign in</Link>
            </span>
          </p>
        </div>
        <OAuth />
      </div>
      {error ? <p>Something went Wrong!</p> : ''}
    </div>
  );
};

export default SignUp;
