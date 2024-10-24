import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import authReducer from "../slices/AuthSlice"
import themeReducer from "../slices/ThemeSlice"
import wishlistReducer from "../slices/WishlistSlice"

const rootReducer = combineReducers({
  userAuth: authReducer,
  theme: themeReducer,
  wishlist:wishlistReducer,
});
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["userAuth", "theme",  "wishlist"],

};
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);