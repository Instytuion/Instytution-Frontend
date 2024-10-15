import {setAccessToken, logout} from "../redux/slices/AuthSlice";
import logoutService from "../services/user/LogoutService";
import {store} from "../redux/stores/store";
import Cookies from "js-cookie";


const getExpiryTime = () => {
  const expiryTime = Cookies.get("expiryTime");
  return expiryTime ? parseInt(expiryTime, 10) : null;
};

const setExpiryTime = () => {
  const currentTime = new Date().getTime();
  const newExpiryTime = currentTime + 5 * 60 * 1000;
  Cookies.set("expiryTime", newExpiryTime, {path: "/", secure: true});
};

const hasTokenExpired = () => {
  const expiryTime = getExpiryTime();
  const currentTime = new Date().getTime();
  return !expiryTime || currentTime >= expiryTime;
};

const logoutUser = async () => {
  try {
    const response = await logoutService();
  } catch (error) {
    console.log("error while user logout api", error);
  }
  Cookies.remove("expiryTime", {path: "/"});
  store.dispatch(logout()); // Dispatch logout to Redux
};

const refreshToken = async () => {
  try {
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
    logoutUser();
    window.location.href = "/ded5fr6bt7gyh8juiokpl[sd;klosadf";
    return null;
  }
};

export {
  setExpiryTime,
  refreshToken,
  logoutUser,
  hasTokenExpired,
  getExpiryTime,
};
