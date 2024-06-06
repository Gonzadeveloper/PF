import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User, Address, Product, Review, Order, Cart } from "../../types";

interface UsersState {
  users: User[];
  user: User | null;
  addresses: Address[];
  products: Product[];
  reviews: Review[];
  orders: Order[];
  cart: Cart | null;
}

const initialState: UsersState = {
  users: [],
  user: JSON.parse(localStorage.getItem("user") || "null"),
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
      console.log('Setting users:', action.payload);
      state.users = action.payload;
    },
    setUser: (state, action: PayloadAction<User>) => {
      console.log('Setting user:', action.payload);
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