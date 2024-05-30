import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserState, User } from "../../types";

const initialState: UserState = {
  user: null,
  isAuthenticated: false, // Bandera para controlar la ejecución del middleware
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.isAuthenticated = true; // Actualiza la bandera cuando el usuario se autentica
    },
    logoutUser: (state) => {
      state.user = null;
      state.isAuthenticated = false; // Restablece la bandera cuando el usuario se desconecta
    },
  },
});

export const { setUser, logoutUser } = userSlice.actions;
export default userSlice.reducer;
