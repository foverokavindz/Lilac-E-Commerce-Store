/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from 'firebase/storage';
import { app } from '../../firebase';
import {
  userUpdateStart,
  userUpdateSuccess,
  userUpdateFailure,
  userDeleteStart,
  userDeleteSuccess,
  userDeleteFailure,
  userSignOut,
} from '../../store/reducers/user/userSlice';
import { Link, useNavigate } from 'react-router-dom';
import MyOrders from '../../sections/userProfile/MyOrders';

const navbarData = [
  {
    key: 1,
    name: 'Overview',
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        className="w-5 h-5"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M7.5 3.75H6A2.25 2.25 0 0 0 3.75 6v1.5M16.5 3.75H18A2.25 2.25 0 0 1 20.25 6v1.5m0 9V18A2.25 2.25 0 0 1 18 20.25h-1.5m-9 0H6A2.25 2.25 0 0 1 3.75 18v-1.5M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
        />
      </svg>
    ),
  },

  {
    key: 2,
    name: 'Update Information',
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        className="w-5 h-5"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
        />
      </svg>
    ),
  },

  {
    key: 3,
    name: 'Orders',
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        className="w-5 h-5"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0 1 18 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3 1.5 1.5 3-3.75"
        />
      </svg>
    ),
  },
];

const Profile = () => {
  const fileRef = useRef(null);
  const [image, setImage] = useState(undefined);
  const { currentUser } = useSelector((state) => state.user);
  const [uploadPrecentage, setUploadPrecentage] = useState(0);
  const [formData, setFormData] = useState({});
  const [imageError, setImageError] = useState(false);
  const [activePage, setActivePage] = useState(1);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  /*
  
  firebase storage rules
  
  match /{allPaths=**} {
      allow read;
      allow write: if  
      request.resource.size < 2 *1024*1024 && 
      request.resource.contentType.matches('image/.*')
    } */
  const handleChnage = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
    //console.log('formData  ', formData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    //console.log('Data  ', JSON.stringify(formData));
    const token = localStorage.getItem('lilac-auth-token');
    console.log('token', token);
    try {
      dispatch(userUpdateStart());
      const res = await fetch(`http://localhost:3005/api/user/update`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': token,
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      // if (data.success === false) {
      //   dispatch(userUpdateFailure(data));
      //   return;
      // }

      dispatch(userUpdateSuccess(data));
      //console.log('data  ', data);
      navigate('/profile');
    } catch (error) {
      console.log('error', error);
      dispatch(userUpdateFailure(error));
    }
  };

  useEffect(() => {
    if (image) handleFileUpload(image);
  }, [image]);

  const handleFileUpload = async (image) => {
    // console.log('imageData', image);
    const storage = getStorage(app);
    const fileName = currentUser._id;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, image);
    uploadTask.on(
      'state_changed',
      (snapShot) => {
        const progress =
          (snapShot.bytesTransferred / snapShot.totalBytes) * 100;
        setUploadPrecentage(Math.round(progress));

        //console.log('progrss - ', progress);
      },

      (error) => {
        setImageError(true);
      },

      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setFormData({ ...formData, profilePicture: downloadURL });
        });
      }
    );
  };

  const handleDeleteAccount = async () => {
    const token = localStorage.getItem('lilac-auth-token');
    //console.log('token', token);
    try {
      dispatch(userDeleteStart());
      const res = await fetch(`http://localhost:3005/api/user/delete`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': token,
        },
      });

      //const data = await res.json();

      // if (data.success === false) {
      //   dispatch(userDeleteFailure(data));
      //   return;
      // }

      dispatch(userDeleteSuccess());
      localStorage.removeItem('lilac-auth-token');
      localStorage.clear();

      navigate('/sign-in');
    } catch (error) {
      console.log('error', error);
      dispatch(userDeleteFailure(error));
    }
  };

  // const handleSignOut = () => {
  //   localStorage.removeItem('lilac-auth-token');
  //   localStorage.clear();
  //   dispatch(userSignOut());
  //   navigate('/sign-in');
  // };

  const changeActivePage = (key) => setActivePage(key);

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);

    // Get individual components
    const year = date.getFullYear();
    const month = date.getMonth() + 1; // Months are zero-based, so add 1
    const day = date.getDate();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();

    // Create a user-friendly string
    const formattedDate = `${hours}:${minutes}:${seconds}h ${year}.${month}.${day}`;

    return formattedDate;
  };

  return (
    <div>
      <div className="container mx-auto max-w-7xl  py-10 px-4">
        <div className="md:flex">
          {/* menu */}
          <ul className="flex-column space-y space-y-4 text-sm font-medium text-gray-500  md:me-4 mb-4 md:mb-0">
            {navbarData.map((item) => {
              return (
                <li key={item.key}>
                  <Link
                    to="#"
                    onClick={() => changeActivePage(item.key)}
                    className={`inline-flex items-center px-6 py-4 rounded-xl active w-full gap-4  transition-all ${
                      activePage === item.key
                        ? 'bg-gray-800 text-white hover:bg-gray-700'
                        : 'text-gray-700 bg-gray-100 hover:bg-gray-200'
                    }`}
                    aria-current="page"
                  >
                    {item.icon}
                    {item.name}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/*  dynamic content */}
          <div className="p-10 bg-gray-100 text-medium text-gray-500   rounded-2xl w-full  ">
            {activePage === 1 ? (
              // overview
              <div>
                <div className="px-4 sm:px-0">
                  <h3 className="text-xl font-semibold leading-7 text-gray-900">
                    Your Information
                  </h3>
                  <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
                    Personal details overview.
                  </p>
                </div>
                <div className="mt-6 border-t border-gray-300">
                  <dl className="divide-y divide-gray-300">
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                      <dt className="text-sm font-medium leading-6 text-gray-900">
                        Profile picture
                      </dt>
                      <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                        <img
                          src={currentUser.profilePicture}
                          className="w-56 h-56 rounded-full object-cover "
                          alt="Profile picture"
                        />
                      </dd>
                    </div>
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                      <dt className="text-sm font-medium leading-6 text-gray-900">
                        Full name
                      </dt>
                      <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                        {currentUser.firstName} {currentUser.lastName}
                      </dd>
                    </div>
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                      <dt className="text-sm font-medium leading-6 text-gray-900">
                        Email address
                      </dt>
                      <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                        {currentUser.email}
                      </dd>
                    </div>
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                      <dt className="text-sm font-medium leading-6 text-gray-900">
                        Home address
                      </dt>
                      <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                        {currentUser.address}
                      </dd>
                    </div>
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                      <dt className="text-sm font-medium leading-6 text-gray-900">
                        Current city
                      </dt>
                      <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                        {currentUser.city}
                      </dd>
                    </div>
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                      <dt className="text-sm font-medium leading-6 text-gray-900">
                        Phone number
                      </dt>
                      <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                        {currentUser.phone}
                      </dd>
                    </div>
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                      <dt className="text-sm font-medium leading-6 text-gray-900">
                        Account created at
                      </dt>
                      <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                        {formatTimestamp(currentUser.createdAt)}
                      </dd>
                    </div>
                  </dl>
                </div>
              </div>
            ) : activePage === 2 ? (
              // Update data
              <div>
                {/*    
                <form onSubmit={handleSubmit}>
                  <img
                    src={formData.profilePicture || currentUser.profilePicture}
                    alt="profile picture"
                    width={'100px'}
                    onClick={() => fileRef.current.click()}
                  />
                  {imageError ? (
                    <span>
                      Error uploading image (should be image file and less than
                      2 MB)
                    </span>
                  ) : uploadPrecentage > 0 && uploadPrecentage < 100 ? (
                    <span>Uploading ... {uploadPrecentage}%</span>
                  ) : uploadPrecentage === 100 ? (
                    <span>Upload Successfully</span>
                  ) : (
                    ''
                  )}
                  <input
                    type="file"
                    ref={fileRef}
                    hidden
                    accept="image/*"
                    onChange={(e) => {
                      setImage(e.target.files[0]);
                    }}
                  />
                  <p> {currentUser.email}</p>

                  <input
                    type="text"
                    placeholder="firstname"
                    id="firstName"
                    className=""
                    onChange={handleChnage}
                    defaultValue={currentUser.firstName}
                  />
                  <input
                    type="text"
                    placeholder="lastname"
                    id="lastName"
                    className=""
                    onChange={handleChnage}
                    defaultValue={currentUser.lastName}
                  />
                  <input
                    type="text"
                    placeholder="phone"
                    id="phone"
                    className=""
                    onChange={handleChnage}
                    defaultValue={currentUser.phone}
                  />
                  <input
                    type="text"
                    placeholder="address"
                    id="address"
                    className=""
                    onChange={handleChnage}
                    defaultValue={currentUser.address}
                  />
                  <input
                    type="text"
                    placeholder="city"
                    id="city"
                    className=""
                    onChange={handleChnage}
                    defaultValue={currentUser.city}
                  />

                  <button>Update</button>
                </form>

                <div>
                  <br />
                  <button onClick={handleSignOut}>Sign out</button>
                  <button onClick={handleDeleteAccount}>Delete Account</button>
                  </div> 
                  
                  */}

                <div>
                  <div className="px-4 sm:px-0">
                    <h3 className="text-xl font-semibold leading-7 text-gray-900">
                      Update Your Information
                    </h3>
                    <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
                      Insert valid informations.
                    </p>
                  </div>

                  <form onSubmit={handleSubmit}>
                    <div className="mt-6 border-t border-gray-300">
                      <dl className="divide-y divide-gray-300">
                        <div className="  px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                          <dt className="text-sm font-medium leading-6 text-gray-900">
                            Profile picture
                          </dt>
                          <dd className="relative mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                            <div className="overflow-hidden w-56 h-56 rounded-full">
                              <img
                                src={
                                  formData.profilePicture ||
                                  currentUser.profilePicture
                                }
                                className="w-56 h-56 rounded-full object-cover hover:scale-110 transition-all "
                                alt="Profile picture"
                                width={'100px'}
                              />
                              <div>
                                {imageError ? (
                                  <p>
                                    Error uploading image (should be image file
                                    and less than 2 MB)
                                  </p>
                                ) : uploadPrecentage > 0 &&
                                  uploadPrecentage < 100 ? (
                                  <p>Uploading ... {uploadPrecentage}%</p>
                                ) : uploadPrecentage === 100 ? (
                                  <p>Upload Successfully</p>
                                ) : (
                                  ''
                                )}
                              </div>
                              <input
                                type="file"
                                ref={fileRef}
                                hidden
                                accept="image/*"
                                onChange={(e) => {
                                  setImage(e.target.files[0]);
                                }}
                              />
                              <div className="t-0 absolute left-40 bottom-1  ">
                                <p
                                  onClick={() => fileRef.current.click()}
                                  className="h-12 cursor-pointer w-12 shadow-lg flex items-center justify-center rounded-full bg-white p-2.5  text-xs text-gray-800 hover:-rotate-12 hover:scale-105 transition-all"
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke-width="1.5"
                                    stroke="currentColor"
                                    class="w-6 h-6"
                                  >
                                    <path
                                      stroke-linecap="round"
                                      stroke-linejoin="round"
                                      d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
                                    />
                                  </svg>
                                </p>
                              </div>
                            </div>
                          </dd>
                        </div>
                        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                          <dt className="text-sm font-medium leading-6 text-gray-900">
                            First name
                          </dt>
                          <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                            <input
                              type="text"
                              placeholder="firstname"
                              id="firstName"
                              onChange={handleChnage}
                              autoComplete="firstname"
                              className="block w-full rounded-md border-0 px-5 py-3 text-gray-600 text-base font-medium shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                              defaultValue={currentUser.firstName}
                            />
                          </dd>
                        </div>
                        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                          <dt className="text-sm font-medium leading-6 text-gray-900">
                            Last name
                          </dt>
                          <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                            <input
                              type="text"
                              placeholder="lastname"
                              id="lastName"
                              autoComplete="lastname"
                              className="block w-full rounded-md border-0 px-5 py-3 text-gray-600 text-base font-medium shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                              onChange={handleChnage}
                              defaultValue={currentUser.lastName}
                            />
                          </dd>
                        </div>

                        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                          <dt className="text-sm font-medium leading-6 text-gray-900">
                            Home address
                          </dt>
                          <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                            <input
                              type="text"
                              placeholder="address"
                              id="address"
                              autoComplete="address"
                              className="block w-full rounded-md border-0 px-5 py-3 text-gray-600 text-base font-medium shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                              onChange={handleChnage}
                              defaultValue={currentUser.address}
                            />
                          </dd>
                        </div>
                        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                          <dt className="text-sm font-medium leading-6 text-gray-900">
                            Current city
                          </dt>
                          <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                            <input
                              type="text"
                              placeholder="city"
                              id="city"
                              autoComplete="city"
                              className="block w-full rounded-md border-0 px-5 py-3 text-gray-600 text-base font-medium shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                              onChange={handleChnage}
                              defaultValue={currentUser.city}
                            />
                          </dd>
                        </div>
                        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                          <dt className="text-sm font-medium leading-6 text-gray-900">
                            Phone number
                          </dt>
                          <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                            <input
                              type="text"
                              placeholder="phone"
                              id="phone"
                              autoComplete="tel"
                              className="block w-full rounded-md border-0 px-5 py-3 text-gray-600 text-base font-medium shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                              onChange={handleChnage}
                              defaultValue={currentUser.phone}
                            />
                          </dd>
                        </div>
                        <div className="flex flex-row justify-end pt-5">
                          <button className="flex flex-row justify-center items-center px-6 py-3 rounded-xl  gap-3  transition-all bg-gray-800 text-white hover:bg-gray-700">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke-width="1.5"
                              stroke="currentColor"
                              class="w-5 h-5"
                            >
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
                              />
                            </svg>
                            Update
                          </button>
                        </div>
                      </dl>
                    </div>
                  </form>
                  <div className="-mt-10">
                    <button
                      onClick={handleDeleteAccount}
                      class="text-red-700 hover:text-white border border-red-500 hover:bg-red-500 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 "
                    >
                      Delete Account
                    </button>
                  </div>
                </div>
              </div>
            ) : activePage === 3 ? (
              // Orders
              <div className="px-4 ">
                <MyOrders />
              </div>
            ) : (
              ''
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
