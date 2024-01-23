/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import OAuth from '../../components/OAuth';

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
    //console.log('Data  ', JSON.stringify(formData));
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
    checkbox: ' text-sm font-medium text-gray-900 mr-2',
    button:
      ' px-5 py-4 rounded-lg w-full text-white hover:text-gray-800 bg-gray-800 hover:bg-gray-900 hover:border-gray-800 hover:border-2 border-2 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:hover:bg-gray-200',
  };

  return (
    <>
      <div className="container mx-auto px-4 max-w-7xl py-10">
        <div className="justify-center items-center flex flex-row gap-10">
          <div className="w-1/2">
            <img
              src="https://images.unsplash.com/photo-1495121605193-b116b5b9c5fe?q=80&w=1976&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              className="object-cover rounded-lg"
              alt="Sing up form image"
            />
          </div>
          <div className="w-1/2">
            <div className="my-7 flex flex-row justify-start items-center">
              <h2 className="text-3xl font-semibold"> Sign up </h2>
            </div>
            <div>
              <form onSubmit={handleSubmit}>
                {/* first section */}
                <div class="grid gap-6 mb-6 md:grid-cols-2">
                  <div>
                    <label for="firstName" className={styles.lable}>
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
                    <label for="lastName" className={styles.lable}>
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
                    <label for="phone" className={styles.lable}>
                      Phone number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      className={styles.inputbox}
                      placeholder="123-45-678"
                      onChange={handleChnage}
                      required
                    />
                  </div>
                  <div>
                    <label for="city" className={styles.lable}>
                      City
                    </label>
                    <input
                      type="text"
                      id="city"
                      className={styles.inputbox}
                      placeholder="Colombo"
                      onChange={handleChnage}
                      required
                    />
                  </div>
                </div>

                {/* next sextion */}
                <div class="mb-6">
                  <label for="email" className={styles.lable}>
                    Address
                  </label>
                  <input
                    type="text"
                    id="address"
                    className={styles.inputbox}
                    placeholder="No.10, SamanRD , Colombo"
                    onChange={handleChnage}
                    required
                  />
                </div>

                <div class="mb-6">
                  <label for="email" className={styles.lable}>
                    Email
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
                  />
                </div>

                {/* terms and conditions */}

                {/*
                
                
                
                
                
                
                <div class="flex items-start mb-6">
                  <div class="flex items-center h-5">
                    <input
                      id="remember"
                      type="checkbox"
                      value=""
                      className={styles.checkbox}
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
                */}

                {/* submit button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className={styles.button}
                >
                  {isLoading ? 'loading...' : 'Sign up'}
                </button>
              </form>
            </div>

            <div className="flex justify-center items-center mb-5">
              <p className="inline-flex gap-2  mb-2 text-md font-medium text-gray-900">
                Have an account already?{' '}
                <span>
                  <Link to={'/sign-in'} class="text-blue-600 hover:underline">
                    Sign in
                  </Link>
                </span>
              </p>
            </div>
            <OAuth />

            {error ? <p>Something went Wrong!</p> : ''}
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
