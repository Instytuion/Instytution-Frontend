import axios from "axios";
import Cookies from "js-cookie";
import {store} from "../redux/stores/store";
import {setAccessToken, logout} from "../redux/slices/AuthSlice";
import logoutService from "../services/user/LogoutService";

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

// Function to get expiry time from cookies
const getExpiryTime = () => {
  const expiryTime = Cookies.get("expiryTime");
  return expiryTime ? parseInt(expiryTime, 10) : null;
};

// Function to set a new expiry time in the cookies (5 minutes from now)
export const setExpiryTime = () => {
  const currentTime = new Date().getTime();
  const newExpiryTime = currentTime + 5 * 60 * 1000; // 5 minutes in milliseconds
  Cookies.set("expiryTime", newExpiryTime, {path: "/", secure: true});
};

// Function to check if the access token has expired
const hasTokenExpired = () => {
  const expiryTime = getExpiryTime();
  const currentTime = new Date().getTime();
  return !expiryTime || currentTime >= expiryTime;
};

// Function to log out the user by clearing cookies and session data
export const logoutUser = async () => {
  try{
    const response = await logoutService()
  }catch(error){
    console.log('error while user logout api',error)
  }
  Cookies.remove("expiryTime", {path: "/"});

  store.dispatch(logout()); // Dispatch logout to Redux
  window.location.href = "/";
};

// Function to refresh the token if needed
const refreshToken = async () => {
  try {
    // Call the refresh token API
    const response = await noAuthInstance.post("accounts/api/token/refresh/");
    console.log("response refresh success", response.data);

    // Dispatch action to store new access token in Redux stor
    const newAccessToken = response.data.access;
    if (newAccessToken) {
      store.dispatch(setAccessToken({accessToken: newAccessToken}));
      console.log("new access token", newAccessToken);
    } else {
      console.log("refresh failed no access token");
    }

    // Set a new expiry time for the access token
    setExpiryTime();

    return newAccessToken;
  } catch (error) {
    console.log("Token refresh failed, logging out...,", error);
    logoutUser(); // Clear tokens and log out
    return null;
  }
};

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
