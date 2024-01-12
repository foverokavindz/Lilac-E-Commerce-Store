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
      const existingItem = state.items.find((item) => item.id === newItem._id);
      state.totalQuantity++;
      state.changed = true;
      if (!existingItem) {
        state.items.push({
          _id: newItem._id,
          price: newItem.price,
          quantity: 1,
          color: newItem.color,
          totalPrice: newItem.price,
          name: newItem.name,
          image: newItem.image,
          selectedColor: newItem.selectedColor,
          selectedSize: newItem.selectedSize,
        });

        state.items.map((item) => (state.subtotal += item.totalPrice));
      } else {
        existingItem.quantity++;
        existingItem.totalPrice = existingItem.totalPrice + newItem.price;
        state.subtotal += existingItem.price;
      }
      parseFloat(state.subtotal.toFixed(2));
    },
    removeItemFromCart(state, action) {
      const _id = action.payload;
      const existingItem = state.items.find((item) => item._id === _id);
      console.log('existingItem    ', existingItem);
      if (existingItem) {
        state.totalQuantity--;
        state.changed = true;
        if (existingItem.quantity === 1) {
          // this means if it reduce again product need to be remove
          // select not equal items and reassign again and remove equal one from array
          state.items = state.items.filter((item) => item._id !== _id);
        } else {
          existingItem.quantity--;
          existingItem.totalPrice =
            existingItem.totalPrice - existingItem.price;
          state.subtotal -= existingItem.price;
          state.subtotal.toFixed(2);
        }
      }
    },
    removeOneProduct(state, action) {
      const _id = action.payload;
      const existingItem = state.items.find((item) => item._id === _id);
      // Filter out the item from state.items based on _id
      const updatedItems = state.items.filter((item) => item._id !== _id);

      state.subtotal -= existingItem.totalPrice;
      state.subtotal.toFixed(2);
      state.items = [...updatedItems];
      state.totalQuantity--;
      state.changed = true;
    },
  },
});

export const {
  addItemToCart,
  replaceCart,
  removeItemFromCart,
  removeOneProduct,
} = cartSlice.actions;

export default cartSlice.reducer;
