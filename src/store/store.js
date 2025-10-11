// import { configureStore } from '@reduxjs/toolkit';
// import cartReducer from './cartSlice';
// import { saveState } from '../utills/localStorage';

// // Restore persisted cart from localStorage
// const persistedCartState = localStorage.getItem('cartState')
//   ? JSON.parse(localStorage.getItem('cartState'))
//   : undefined;

// // Configure the Redux store
// export const store = configureStore({
//   reducer: {
//     cart: cartReducer,
//   },
//   preloadedState: {
//     cart: persistedCartState, // Set the initial cart state
//   },
// })

// // Subscribe to store changes and save to localStorage
// store.subscribe(() => {
//   const state = store.getState();
//   saveState(state.cart);
// });










// src/store/store.js
import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartSlice';
import { saveState, loadState } from '../utills/localStorage'; // ✅ fixed path

const persistedCartState = loadState(); // ✅ safer loading

export const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
  preloadedState: {
    cart: persistedCartState, // ✅ initialize cart from localStorage
  },
});

// Save cart state to localStorage on every change
store.subscribe(() => {
  saveState(store.getState().cart);
});
