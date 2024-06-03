import { Middleware } from "@reduxjs/toolkit";
import { RootState } from "../index";
import { setUser, clearUser } from "../Slices/UserSlice";

const localStorageMiddleware: Middleware<{}, RootState> =
  (store) => (next) => (action) => {
    const result = next(action);

    if (setUser.match(action)) {
      localStorage.setItem("user", JSON.stringify(action.payload));
    } else if (clearUser.match(action)) {
      localStorage.removeItem("user");
    }

    return result;
  };

export default localStorageMiddleware;
