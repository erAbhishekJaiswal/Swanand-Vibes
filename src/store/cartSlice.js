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
