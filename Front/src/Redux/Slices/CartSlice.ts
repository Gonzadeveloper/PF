import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "../../types";

interface CartItem extends Product {
  quantity: number;
}

interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<Product>) {
      const product = action.payload;
      const existingItem = state.items.find(item => item.id === product.id);

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...product, quantity: 1 });
      }
    },
    removeFromCart(state, action: PayloadAction<number>) {
      const productId = action.payload;
      state.items = state.items.filter(item => item.id !== productId);
    },
    decrementQuantity(state, action: PayloadAction<number>) {
      const productId = action.payload;
      const existingItem = state.items.find(item => item.id === productId);

      if (existingItem) {
        existingItem.quantity -= 1;
        if (existingItem.quantity === 0) {
          state.items = state.items.filter(item => item.id !== productId);
        }
      }
    },
    clearCart(state) {
      state.items = [];
    }
  },
});

export const { addToCart, removeFromCart, clearCart, decrementQuantity } = cartSlice.actions;

export default cartSlice.reducer;