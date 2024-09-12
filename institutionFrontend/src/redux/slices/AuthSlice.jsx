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
    registerMode: null,
  };

const userAuthSlice = createSlice({
    name: 'userAuth',
    initialState,
    reducers: {
      setUser: (state, action) => {
        console.log('setUser reducere called');
        
        state.isAuthenticated = true;
        state.email = action.payload.email;
        state.firstName = action.payload.firstName || null;
        state.lastName = action.payload.lastName || null;
        state.profileImage = action.payload.profileImage || null;
        state.accessToken = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;
        state.role = action.payload.role;
        state.registerMode = action.payload.registerMode;
        
      },
      setRefreshToken: (state, action) => {
        console.log('setRefreshToken reducere called');
        
        state.isAuthenticated = true;
        state.accessToken = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;
        console.log('new tokens saved to store');
      },
      updateProfile:(state, action)=>{
        state.email = action.payload.email;
        state.firstName = action.payload.firstName || null;
        state.lastName = action.payload.lastName || null;
        state.profileImage = action.payload.profileImage || null;
      },
      logout: (state) => {
        console.log('inside logout reducer');

        state.accessToken = null;
        state.refreshToken = null;
        state.isAuthenticated = false;
    }
    },
  });
  
export const { 
  setUser,
  setRefreshToken,
  updateProfile,
  logout,
 } = userAuthSlice.actions;

export default userAuthSlice.reducer;