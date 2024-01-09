import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentUser: null,
  loading: false,
  error: false,
};

const userSilce = createSlice({
  name: 'user',
  initialState,
  reducers: {
    signInStart: (state, action) => {
      state.loading = true;
    },
    signInSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = false;
    },
    signInFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    userUpdateStart: (state, action) => {
      state.loading = true;
    },
    userUpdateSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = false;
    },
    userUpdateFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    userDeleteStart: (state, action) => {
      state.loading = true;
    },
    userDeleteSuccess: (state, action) => {
      state.currentUser = null;
      state.loading = false;
      state.error = false;
    },
    userDeleteFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    userSignOut: (state, action) => {
      state.currentUser = null;
      state.loading = false;
      state.error = false;
    },
  },
});

export const {
  signInFailure,
  signInStart,
  signInSuccess,
  userUpdateStart,
  userUpdateSuccess,
  userUpdateFailure,
  userDeleteStart,
  userDeleteSuccess,
  userDeleteFailure,
  userSignOut,
} = userSilce.actions;

export default userSilce.reducer;
