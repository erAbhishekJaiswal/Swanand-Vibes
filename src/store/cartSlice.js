import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  totalQuantity: 0,
};

const cartSlice = createSlice({
  name: "cart",
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

      state.totalQuantity += 1; // ✅ track total quantity
    },

    removeItemFromCart(state, action) {
      const productId = action.payload;
      const itemToRemove = state.items.find(
        (item) => item.productId === productId
      );
      if (itemToRemove) {
        state.totalQuantity -= itemToRemove.quantity;
      }
      state.items = state.items.filter((item) => item.productId !== productId);
    },

    setCartFromBackend(state, action) {
      state.items = action.payload;
      state.totalQuantity = action.payload.reduce(
        (sum, item) => sum + item.qty,
        0
      );
    },

    // ✅ NEW: handle updating item quantity (fixes your setCartItems issue)
    updateItemQuantity(state, action) {
      const { itemId, newQty } = action.payload;
      const item = state.items.find(
        (item) => item._id === itemId || item.productId === itemId
      );
      if (item) {
        state.totalQuantity += newQty - (item.qty || item.quantity || 0);
        if (item.qty !== undefined) {
          item.qty = newQty;
        } else {
          item.quantity = newQty;
        }
      }
    },

    clearCart(state) {
      state.items = [];
      state.totalQuantity = 0;
    },
  },
});

export const {
  addItemToCart,
  removeItemFromCart,
  setCartFromBackend,
  clearCart,
  updateItemQuantity, // ✅ don't forget to export this
} = cartSlice.actions;

export default cartSlice.reducer;
