// // // src/store/cartSlice.js
// // import { createSlice } from '@reduxjs/toolkit';

// // // Initial cart state
// // const initialState = {
// //   items: [],
// // };

// // // Cart Slice with actions to add and remove items
// // const cartSlice = createSlice({
// //   name: 'cart',
// //   initialState,
// //   reducers: {
// //     addItemToCart(state, action) {
// //       const product = action.payload;
// //       const existingProduct = state.items.find(item => item.id === product.id);
// //     //   if (existingProduct) {
// //     //     existingProduct.quantity += 1; // Increment quantity if item already exists
// //     //   } else {
// //     //     state.items.push({ ...product, quantity: 1 });
// //     //   }

// //      if (existingProduct) {
// //         existingProduct.quantity += 1; // Increase quantity if product already exists in the cart
// //       } else {
// //         state.items.push({
// //           product: product._id,
// //           name: product.name,
// //           image: product.images[0].url,
// //           price: product.price,
// //           quantity: 1,
// //         });
// //       }
// //     },
// //     removeItemFromCart(state, action) {
// //       const productId = action.payload;
// //       state.items = state.items.filter(item => item.id !== productId);
// //     },
// //     clearCart(state) {
// //       state.items = [];
// //     },
// //   },
// // });

// // export const { addItemToCart, removeItemFromCart, clearCart } = cartSlice.actions;
// // export default cartSlice.reducer;













// // src/store/cartSlice.js
// import { createSlice } from '@reduxjs/toolkit';

// const initialState = {
//   items: [],
//   totalQuantity: 0,
// };

// const cartSlice = createSlice({
//   name: 'cart',
//   initialState,
//   reducers: {
//     addItemToCart(state, action) {
//       const product = action.payload;

//       // Normalize ID (accepts id or _id)
//       const productId = product._id || product.id || product.product;

//       const existingProduct = state.items.find(
//         (item) => item.productId === productId && item.variantId === product.variantId
//       );

//       if (existingProduct) {
//         existingProduct.quantity += 1; // Increment quantity
//       } else {
//         state.items.push({
//           productId, // ✅ standardized key
//           name: product.name,
//           image: Array.isArray(product.images)
//             ? product.images[0]?.url || product.images[0]
//             : product.images || product.image || "",
//           price: product.price,
//           size: product.size || "One Size",
//           variantId: product.variantId || null,
//           quantity: product.quantity || 1,
//         });
//       }
//     },

//     removeItemFromCart(state, action) {
//       const productId = action.payload;
//       state.items = state.items.filter(
//         (item) => item.productId !== productId
//       );
//     },

//     clearCart(state) {
//       state.items = [];
//     },
//   },
// });

// export const { addItemToCart, removeItemFromCart, clearCart } = cartSlice.actions;
// export default cartSlice.reducer;











// src/store/cartSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  totalQuantity: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItemToCart(state, action) {
      const product = action.payload;
      const productId = product._id || product.id || product.product;

      const existingProduct = state.items.find(
        (item) =>
          item.productId === productId &&
          item.variantId === product.variantId
      );

      if (existingProduct) {
        existingProduct.quantity += 1;
      } else {
        state.items.push({
          productId,
          name: product.name,
          image: Array.isArray(product.images)
            ? product.images[0]?.url || product.images[0]
            : product.images || product.image || "",
          price: product.price,
          size: product.size || "One Size",
          variantId: product.variantId || null,
          quantity: product.quantity || 1,
        });
      }

      state.totalQuantity += 1; // ✅ track quantity
    },

    removeItemFromCart(state, action) {
      const productId = action.payload;
      const itemToRemove = state.items.find(item => item.productId === productId);
      if (itemToRemove) {
        state.totalQuantity -= itemToRemove.quantity;
      }
      state.items = state.items.filter(item => item.productId !== productId);
    },

    setCartFromBackend(state, action) {
  state.items = action.payload;
  state.totalQuantity = action.payload.reduce((sum, item) => sum + item.qty, 0);
},


    clearCart(state) {
      state.items = [];
      state.totalQuantity = 0; // ✅ reset quantity
    },
  },
});

export const { addItemToCart, removeItemFromCart, setCartFromBackend, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
