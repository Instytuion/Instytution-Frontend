import {jwtDecode} from "jwt-decode";

// Helper function to get a cookie by name
export const getCookie = (name) => {
  console.log("name:", name);
  console.log("entered in gettoken from cookie");
  const cookieString = document.cookie;
  console.log("Document cookies:", cookieString);
  const value = `; ${document.cookie}`;
  console.log("value......", value);
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
};

// Helper function to check if a token is expired
export const isTokenExpired = (token) => {
  try {
    console.log("entered in isToken expiry fn");
    const decoded = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    console.log("currentTime", currentTime);
    console.log("expireTime", decoded.exp);
    return decoded.exp < currentTime;
  } catch (error) {
    return true; // If there's an error decoding the token, treat it as expired
  }
};
