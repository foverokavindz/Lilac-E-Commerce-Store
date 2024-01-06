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

  const styles = {
    inputbox:
      'bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ',
    lable: 'block mb-2 text-sm font-medium text-gray-900 ',
    checkbox: 'ms-2 text-sm font-medium text-gray-900 ',
    button:
      'text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center ',
  };

  return (
    <>
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

      <form onSubmit={handleSubmit}>
        {/* first section */}
        <div class="grid gap-6 mb-6 md:grid-cols-2">
          <div>
            <label for="first_name" className={styles.lable}>
              First name
            </label>
            <input
              type="text"
              id="firstName"
              className={styles.inputbox}
              placeholder="John"
              onChange={handleChnage}
              required
            />
          </div>
          <div>
            <label for="last_name" className={styles.lable}>
              Last name
            </label>
            <input
              type="text"
              id="lastName"
              className={styles.inputbox}
              placeholder="Doe"
              onChange={handleChnage}
              required
            />
          </div>
          <div>
            <label for="company" className={styles.lable}>
              Phone number
            </label>
            <input
              type="text"
              id="company"
              className={styles.inputbox}
              placeholder="Flowbite"
              required
            />
          </div>
          <div>
            <label for="phone" className={styles.lable}>
              City
            </label>
            <input
              type="tel"
              id="phone"
              className={styles.inputbox}
              placeholder="123-45-678"
              pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
              required
            />
          </div>
        </div>

        {/* next sextion */}
        <div class="mb-6">
          <label for="email" className={styles.lable}>
            Email address
          </label>
          <input
            type="email"
            id="email"
            className={styles.inputbox}
            placeholder="john.doe@company.com"
            onChange={handleChnage}
            required
          />
        </div>

        <div class="mb-6">
          <label for="email" className={styles.lable}>
            Address
          </label>
          <input
            type="email"
            id="email"
            className={styles.inputbox}
            placeholder="No.10, SamanRD , Colombo"
            onChange={handleChnage}
            required
          />
        </div>

        <div class="mb-6">
          <label for="password" className={styles.lable}>
            Password
          </label>
          <input
            type="password"
            id="password"
            className={styles.inputbox}
            placeholder="•••••••••"
            onChange={handleChnage}
            required
          />
        </div>
        <div class="mb-6">
          <label for="confirm_password" className={styles.lable}>
            Confirm password
          </label>
          <input
            type="password"
            id="confirm_password"
            className={styles.inputbox}
            placeholder="•••••••••"
            onChange={handleChnage}
            required
          />
        </div>

        {/* terms and conditions */}
        <div class="flex items-start mb-6">
          <div class="flex items-center h-5">
            <input
              id="remember"
              type="checkbox"
              value=""
              className={styles.checkbox}
              onChange={handleChnage}
              required
            />
          </div>
          <label for="remember" className={styles.lable}>
            I agree with the{' '}
            <Link to={'/'} class="text-blue-600 hover:underline">
              terms and conditions
            </Link>
            .
          </label>
        </div>

        {/* submit button */}
        <button type="submit" disabled={isLoading} className={styles.button}>
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

      {error ? <p>Something went Wrong!</p> : ''}
    </>
  );
};

export default SignUp;
