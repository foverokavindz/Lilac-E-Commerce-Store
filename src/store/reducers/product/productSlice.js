import { createSlice } from '@reduxjs/toolkit';
import userSlice from '../user/userSlice';

const initialState = {
  activeProduct: null,
};

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    addActiveProduct: (state, action) => {
      state.activeProduct = action.payload;
    },
  },
});

export const { addActiveProduct } = productSlice.actions;

export default productSlice.reducer;
