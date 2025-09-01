// // src/store/cartSlice.js

// import { createSlice } from '@reduxjs/toolkit';

// // Initial state for the cart
// const initialState = {
//   items: [],
//   totalAmount: 0,
// };

// // Redux slice to manage cart state
// const cartSlice = createSlice({
//   name: 'cart',
//   initialState,
//   reducers: {
//     addItemToCart(state, action) {
//       const newItem = action.payload;
//       state.items.push(newItem);
//       state.totalAmount += newItem.price; // Example assuming price is a property
//     },
//     removeItemFromCart(state, action) {
//       const itemId = action.payload;
//       const existingItem = state.items.find((item) => item.id === itemId);
//       if (existingItem) {
//         state.items = state.items.filter(item => item.id !== itemId);
//         state.totalAmount -= existingItem.price;
//       }
//     },
//     clearCart(state) {
//       state.items = [];
//       state.totalAmount = 0;
//     },
//   },
// });

// export const { addItemToCart, removeItemFromCart, clearCart } = cartSlice.actions;

// export default cartSlice.reducer;











// src/store/cartSlice.js
import { createSlice } from '@reduxjs/toolkit';

// Initial cart state
const initialState = {
  items: [],
};

// Cart Slice with actions to add and remove items
const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItemToCart(state, action) {
      const product = action.payload;
      const existingProduct = state.items.find(item => item.id === product.id);
    //   if (existingProduct) {
    //     existingProduct.quantity += 1; // Increment quantity if item already exists
    //   } else {
    //     state.items.push({ ...product, quantity: 1 });
    //   }

     if (existingProduct) {
        existingProduct.quantity += 1; // Increase quantity if product already exists in the cart
      } else {
        state.items.push({
          product: product._id,
          name: product.name,
          image: product.images[0].url,
          price: product.price,
          quantity: 1,
        });
      }
    },
    removeItemFromCart(state, action) {
      const productId = action.payload;
      state.items = state.items.filter(item => item.id !== productId);
    },
    clearCart(state) {
      state.items = [];
    },
  },
});

export const { addItemToCart, removeItemFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
