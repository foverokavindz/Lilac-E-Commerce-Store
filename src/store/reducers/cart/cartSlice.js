import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
    totalQuantity: 0,
    subtotal: 0,
    changed: false,
  },
  reducers: {
    // when new user login
    replaceCart(state, action) {
      state.totalQuantity = action.payload.totalQuantity;
      state.items = action.payload.items;
    },

    addItemToCart(state, action) {
      const newItem = action.payload;
      const existingItem = state.items.find((item) => item.id === newItem.id);
      state.totalQuantity++;
      state.changed = true;
      if (!existingItem) {
        state.items.push({
          id: newItem.id,
          price: newItem.price,
          quantity: 1,
          color: newItem.color,
          totalPrice: newItem.price,
          name: newItem.title,
        });

        state.items.map((item) => (state.subtotal += item.totalPrice));
      } else {
        existingItem.quantity++;
        existingItem.totalPrice = existingItem.totalPrice + newItem.price;
        state.subtotal += newItem.price;
      }
    },
    removeItemFromCart(state, action) {
      const id = action.payload;
      const existingItem = state.items.find((item) => item.id === id);
      state.totalQuantity--;
      state.changed = true;
      if (existingItem.quantity === 1) {
        // this means if it reduce again product need to be remove
        // select not equal items and reassign again and remove equal one from array
        state.items = state.items.filter((item) => item.id !== id);
      } else {
        existingItem.quantity--;
        existingItem.totalPrice = existingItem.totalPrice - existingItem.price;
        state.subtotal -= existingItem.price;
      }
    },
  },
});

export const { addItemToCart, replaceCart, removeItemFromCart } =
  cartSlice.actions;

export default cartSlice.reducer;
