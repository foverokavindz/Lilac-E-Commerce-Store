import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from 'firebase/storage';
import { app } from '../firebase';
import {
  userUpdateStart,
  userUpdateSuccess,
  userUpdateFailure,
  userDeleteStart,
  userDeleteSuccess,
  userDeleteFailure,
} from '../store/reducers/user/userSlice';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const fileRef = useRef(null);
  const [image, setImage] = useState(undefined);
  const { currentUser } = useSelector((state) => state.user);
  const [uploadPrecentage, setUploadPrecentage] = useState(0);
  const [formData, setFormData] = useState({});
  const [imageError, setImageError] = useState(false);
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
    //console.log('token', token);
    try {
      dispatch(userUpdateStart());
      const res = await fetch(
        `http://localhost:3005/api/user/update/${currentUser._id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'x-auth-token': token,
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await res.json();

      // if (data.success === false) {
      //   dispatch(userUpdateFailure(data));
      //   return;
      // }

      dispatch(userUpdateSuccess(data));
      //console.log('data  ', data);
      navigate('/');
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
      const res = await fetch(
        `http://localhost:3005/api/user/delete/${currentUser._id}`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            'x-auth-token': token,
          },
        }
      );

      const data = await res.json();

      // if (data.success === false) {
      //   dispatch(userDeleteFailure(data));
      //   return;
      // }

      dispatch(userDeleteSuccess());
      console.log('data  ', data);
      navigate('/sign-in');
    } catch (error) {
      console.log('error', error);
      dispatch(userDeleteFailure(error));
    }
  };
  //console.log('formData   ', formData);
  return (
    <div>
      <form onSubmit={handleSubmit}>
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
        <button>Sign out</button>
        <button onClick={handleDeleteAccount}>Delete Account</button>
      </div>
    </div>
  );
};

export default Profile;
