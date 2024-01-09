import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cartIsVisible: false,
  cartItemCount: 9,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleCartVisible: (state, action) => {
      state.cartIsVisible = !state.cartIsVisible;
    },
  },
});

export const { toggleCartVisible } = uiSlice.actions;

export default uiSlice.reducer;
