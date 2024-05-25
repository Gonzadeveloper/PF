// UserSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Definiciones de tipos e interfaces
export interface BasicUserInfo {
  id: number;
  name: string;
  email: string;
  typeuser: string;
}

export interface UserAddress {
  id: number;
  address: string;
  city: string;
  state: string;
  postalcode: string;
  country: string;
  userId: number;
}

export interface UserProfile {
  user: BasicUserInfo;
  address: UserAddress;
}

// Definición del estado y el slice
interface UserState {
  userProfile: UserProfile;
}

const initialState: UserState = {
  userProfile: {
    user: {
      id: 0,
      name: "",
      email: "",
      typeuser: "USER",
    },
    address: {
      id: 0,
      address: "",
      city: "",
      state: "",
      postalcode: "",
      country: "",
      userId: 0,
    },
  },
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loadUserProfile: (state: UserState, action: PayloadAction<UserProfile>) => {
      state.userProfile = action.payload;
    },
    clearUserProfile: (state) => {
      state.userProfile = {
        user: {
          id: 0,
          name: "",
          email: "",
          typeuser: "USER",
        },
        address: {
          id: 0,
          address: "",
          city: "",
          state: "",
          postalcode: "",
          country: "",
          userId: 0,
        },
      };
    },
  },
});

export const { loadUserProfile, clearUserProfile } = userSlice.actions;

export default userSlice.reducer;
