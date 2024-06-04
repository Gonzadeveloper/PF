import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User, Address, Product, Review, Order, Cart, UserState } from "../../types";

interface UserState {
  users: User[];
  user: User | null;
  addresses: Address[];
  products: Product[];
  reviews: Review[];
  orders: Order[];
  cart: Cart | null;
}


const initialState: UserState = {
  user: JSON.parse(localStorage.getItem("user") || "null"),
  users: [],
  addresses: [],
  products: [],
  reviews: [],
  orders: [],
  cart: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUsers: (state, action: PayloadAction<User[]>) => {
      console.log('Setting users:', action.payload); // Agregamos este console.log
      state.users = action.payload;
    },
    setUser: (state, action: PayloadAction<User>) => {
      console.log('Setting user:', action.payload); // Agregamos este console.log
      state.user = action.payload;
    },
    setAddresses: (state, action: PayloadAction<Address[]>) => {
      state.addresses = action.payload;
    },
    setProducts: (state, action: PayloadAction<Product[]>) => {
      state.products = action.payload;
    },
    setReviews: (state, action: PayloadAction<Review[]>) => {
      state.reviews = action.payload;
    },
    setOrders: (state, action: PayloadAction<Order[]>) => {
      state.orders = action.payload;
    },
    setCart: (state, action: PayloadAction<Cart | null>) => {
      state.cart = action.payload;
    },
    clearUser: (state) => {
      state.user = null;
    },
  },
});

export const {
  setUsers,
  setUser,
  setAddresses,
  setProducts,
  setReviews,
  setOrders,
  setCart,
  clearUser,
} = userSlice.actions;
export default userSlice.reducer;
