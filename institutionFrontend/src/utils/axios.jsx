import axios from "axios";
import { store } from "../redux/stores/store";
import { setRefreshToken, logout } from "../redux/slices/AuthSlice";

const baseUrl = import.meta.env.VITE_DOMAIN_URL || "http://localhost:8000/";

const instance = axios.create({
  baseURL: baseUrl,
  headers: { "Content-Type": "application/json" },
});

// Create a separate Axios instance for token refresh
//to avoid recursive interceptor loop
export const noAuthInstance = axios.create({
  baseURL: baseUrl,
  headers: { "Content-Type": "application/json" },
});

// Intercept requests to attach the access token on request header.
instance.interceptors.request.use(
  async (config) => {
    console.log("inside req interceptor");
    const state = store.getState();
    const token = state.userAuth.accessToken;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Intercept responses to handle token refresh
instance.interceptors.response.use(
  (response) => {
    console.log("inside success response  interceptor");
    return response;
  },
  async (error) => {
    console.log("inside error response  interceptor");
    const originalRequest = error.config;

    if (
      (error.response.status === 401 || error.response.status === 403) &&
      !originalRequest._retry
    ) {
      console.log("inside retry with refresh token");
      originalRequest._retry = true;

      const state = store.getState();
      const refreshToken = state.userAuth.refreshToken;

      if (refreshToken) {
        try {
          const response = await noAuthInstance.post(
            "accounts/api/token/refresh/",
            { refresh: refreshToken }
          );
          const { access } = response.data;

          store.dispatch(
            setRefreshToken({ accessToken: access, refreshToken: refreshToken })
          );
          instance.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${access}`;
          originalRequest.headers["Authorization"] = `Bearer ${access}`;

          return axios(originalRequest);
        } catch (error) {
          store.dispatch(logout());
          return Promise.reject(error);
        }
      } else {
        store.dispatch(logout());
      }
    }

    return Promise.reject(error);
  }
);

export default instance;
