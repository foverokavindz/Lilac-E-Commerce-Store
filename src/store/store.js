import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import userReducer from './reducers/user/userSlice';
import uiReducer from './reducers/ui/uiSlice';
import productReducer from './reducers/product/productSlice';
import cartReducer from './reducers/cart/cartSlice';
import storage from 'redux-persist/lib/storage';

const rootReducer = combineReducers({
  user: userReducer,
  ui: uiReducer,
  product: productReducer,
  cart: cartReducer,
});
const persistConfig = {
  key: 'root',
  version: 1,
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  /*reducer: {
    user: userReducer,
  },*/

  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export const persistor = persistStore(store);
