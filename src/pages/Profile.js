import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from 'firebase/storage';
import { app } from '../firebase';

const Profile = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [image, setImage] = useState(undefined);
  const [uploadPrecentage, setUploadPrecentage] = useState(0);
  const [formData, setFormData] = useState({});
  const fileRef = useRef(null);
  const [imageError, setImageError] = useState(false);

  /*
  
  firebase storage rules
  
  match /{allPaths=**} {
      allow read;
      allow write: if  
      request.resource.size < 2 *1024*1024 && 
      request.resource.contentType.matches('image/.*')
    } */
  const handleChnage = () => {};
  useEffect(
    (image) => {
      if (image) handleFileUpload(image);
    },
    [image]
  );

  const handleFileUpload = async (image) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + image.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, image);
    uploadTask.on(
      'state_changed',
      (snapShot) => {
        const progress =
          (snapShot.bytesTransferred / snapShot.totalBytes) * 100;
        setUploadPrecentage(Math.round(progress));
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

  console.log(formData);
  return (
    <div>
      <form>
        <img
          src={formData.profilePicture || currentUser.profilePicture}
          alt="profile picture"
          width={'100px'}
          onClick={() => fileRef.current.click()}
        />
        {imageError ? (
          <span>
            Error uploading image (should be image file and less than 2 MB)
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
          onChange={(e) => setImage(e.target.files[0])}
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
        <p>Sign out</p>
        <p>Delete Account</p>
      </div>
    </div>
  );
};

export default Profile;
