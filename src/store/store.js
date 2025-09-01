// // src/store/store.js

// import { configureStore } from '@reduxjs/toolkit';
// import cartReducer from './cartSlice';

// // Create the Redux store and add the cartReducer
// export const store = configureStore({
//   reducer: {
//     cart: cartReducer,
//   },
// });








import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartSlice';

export const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
})
