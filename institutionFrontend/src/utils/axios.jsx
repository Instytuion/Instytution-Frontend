import axios from "axios";
import Cookies from "js-cookie"; // To handle cookies

const baseUrl = "http://localhost:8000/";

// Axios instance for regular API calls
const instance = axios.create({
  baseURL: baseUrl,
  headers: {"Content-Type": "application/json"},
  withCredentials: true, 
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
export const logoutUser = () => {
  Cookies.remove("expiryTime", {path: "/"});
  Cookies.remove("access_token", {path: "/"});
  Cookies.remove("refresh_token", {path: "/"});
};

// Function to refresh the token if needed
const refreshTokenIfNeeded = async () => {
  if (hasTokenExpired()) {
    console.log("Access token expired, attempting to refresh...");

    try {
      // Call the refresh token API
      await noAuthInstance.post("accounts/api/token/refresh/");

      // On successful refresh, set a new expiry time
      setExpiryTime();
      console.log("Token refreshed, new expiry time set.");
    } catch (error) {
      console.log("Token refresh failed, logging out...");
      logoutUser(); // Clear tokens and log out
    }
  } else {
    console.log("Token is still valid, no refresh needed.");
  }
};

// Request interceptor to refresh token if needed before sending any request
instance.interceptors.request.use(
  async (config) => {
    console.log("Inside request interceptor");

    // Check if the token needs to be refreshed before sending the request
    await refreshTokenIfNeeded();

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for handling errors like 401 (optional)
instance.interceptors.response.use(
  (response) => {
    // If the response is successful, return it.
    return response;
  },
  async (error) => {
    // Optionally handle any specific errors, but we are handling token refresh in request interceptor
    return Promise.reject(error);
  }
);

// Export the Axios instance
export default instance;
