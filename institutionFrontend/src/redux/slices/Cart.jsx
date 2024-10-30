import { createSlice } from "@reduxjs/toolkit";

const CartSlice = createSlice({
  name: "cart",
  initialState: {
    cartData: [],
  },
  reducers: {
    setCart: (state, action) => {
      state.cartData = action.payload;
    },
    addToCart: (state, action) => {
      state.cartData.push(action.payload);
    },
    removeFromCart: (state, action) => {
      state.cartData = state.cartData.filter(
        (item) => item.id !== action.payload
      );
    },
    updateCartQuantity: (state, action) => {
      const item = state.cartData.find(
        (item) => item.product.id === action.payload.id
      );
      if (item) {
        item.quantity = action.payload.newQuantity;
      }
    },
    rollbackRemoveFromCart: (state, action) => {
      state.cartData.push(action.payload);
    },
    clearCart: (state) => {
      state.cartData = [];
    },
  },
});

export const {
  setCart,
  addToCart,
  removeFromCart,
  rollbackRemoveFromCartm,
  clearCart,
  updateCartQuantity,
} = CartSlice.actions;
export default CartSlice.reducer;
