import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    isAuthenticated: false,
    isActive: false,
    email: null,
    firstName: null,
    lastName: null,
    profileImage: null,
    accessToken: null,
    refreshToken: null,
    role: null,
  };

const userAuthSlice = createSlice({
    name: 'userAuth',
    initialState,
    reducers: {
      setUser: (state, action) => {
        state.isAuthenticated = true;
        state.email = action.payload.email;
        state.firstName = action.payload.firstName || null;
        state.lastName = action.payload.lastName || null;
        state.profileImage = action.payload.profileImage || null;
        state.accessToken = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;
        state.role = action.payload.role || false;
      },
    },
  });
  
export const { setUser } = userAuthSlice.actions;

export default userAuthSlice.reducer;