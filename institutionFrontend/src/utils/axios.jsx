import axios from "axios";
import {store} from "../redux/stores/store";
import { hasTokenExpired, refreshToken} from "./axiosFunctions";

const baseUrl = "http://localhost:8000/";

// Axios instance for regular API calls
const instance = axios.create({
  baseURL: baseUrl,
  headers: {"Content-Type": "application/json"},
  withCredentials: true, // Automatically include cookies
});

// Axios instance for refreshing tokens
export const noAuthInstance = axios.create({
  baseURL: baseUrl,
  headers: {"Content-Type": "application/json"},
  withCredentials: true,
});


// Request interceptor to refresh token if needed before sending any request
instance.interceptors.request.use(
  async (config) => {
    console.log("Inside request interceptor");

    let accessToken = store.getState().userAuth.accessToken;

    // Check if the access token is expired and refresh if needed
    if (hasTokenExpired()) {
      console.log("Access token expired, attempting to refresh...");
      accessToken = await refreshToken();

      if (!accessToken) {
        // If refresh fails, reject the request
        return Promise.reject("Token refresh failed");
      }
    }

    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for handling errors like 401 (optional)
// instance.interceptors.response.use(
//   (response) => {
//     // If the response is successful, return it.
//     return response;
//   },
//   async (error) => {
//     // Optionally handle specific errors like 401 Unauthorized
//     if (error.response && error.response.status === 401) {
//       console.log("Unauthorized, logging out...");
//       logoutUser();
//     }

//     return Promise.reject(error);
//   }
// );

export default instance;
