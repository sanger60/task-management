import { axiosUser } from "../../../axios";
import jwt_decode from "jwt-decode";

export const setTokenStorage = (TOKEN) => {
  window.localStorage.setItem("token_key", TOKEN);
};

export const deleteTokenStorage = () => {
  window.localStorage.removeItem("token_key");
  window.localStorage.removeItem("user");

  //   window.localStorage.clear();
};

export const setUserStorage = (USER) => {
  window.localStorage.setItem("user", USER);
  return true;
};

export const isAuth = () => {
  // var token = window.localStorage.getItem("token_key");
  // if (token) {
  //   var currentTime = new Date();
  //   var decoded_token = jwt_decode(token);
  //   if (currentTime.getTime() / 1000 < decoded_token.exp) return true;
  // }
  // return false;

  return true;
};
