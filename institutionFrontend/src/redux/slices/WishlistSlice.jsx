import {createSlice} from "@reduxjs/toolkit";

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState: {
    wishlists: [],
  },
  reducers: {
    setWishlists: (state, action) => {
      state.wishlists = action.payload;
    },
    addToWishlist: (state, action) => {
      state.wishlists.push(action.payload);
    },
    removeFromWishlist: (state, action) => {
      state.wishlists = state.wishlists.filter(
        (item) => item.id !== action.payload
      );
    },
    clearWishlist: (state) => {
      state.wishlists = [];
    },
  },
});

export const {setWishlists, addToWishlist, removeFromWishlist, clearWishlist} = wishlistSlice.actions;
export default wishlistSlice.reducer;

