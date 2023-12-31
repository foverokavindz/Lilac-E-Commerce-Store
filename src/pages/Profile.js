import React from 'react';
import { useSelector } from 'react-redux';

const Profile = () => {
  const { currentUser } = useSelector((state) => state.user);
  const handleChnage = () => {};
  return (
    <div>
      <form>
        <img
          src={currentUser.profilePicture}
          alt="profile picture"
          width={'100px'}
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
    </div>
  );
};

export default Profile;
