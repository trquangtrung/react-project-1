import { STORAGE } from "../constants/storage";
import Cookies from "js-cookie";

export const localToken = {
  get: () =>
    JSON.parse(
      localStorage.getItem(STORAGE.token) === undefined
        ? null
        : localStorage.getItem(STORAGE.token)
    ),
  set: (token) => localStorage.setItem(STORAGE.token, JSON.stringify(token)),
  remove: () => localStorage.removeItem(STORAGE.token),
};

export const cookieToken = {
  get: () =>
    JSON.parse(
      Cookies.get(STORAGE.token) === undefined
        ? null
        : Cookies.get(STORAGE.token)
    ),
  set: (token) => Cookies.set(STORAGE.token, JSON.stringify(token)),
  remove: () => Cookies.remove(STORAGE.token),
};

const tokenMethod = {
  get: () => {
    // return localToken.get();
    return cookieToken.get();
  },
  set: (token) => {
    // return localToken.set(token);
    return cookieToken.set(token);
  },
  remove: () => {
    // return localToken.remove();
    return cookieToken.remove();
  },
};

export default tokenMethod;
