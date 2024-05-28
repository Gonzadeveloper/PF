// Redux/Slices/CartSlice.js
import { createSlice } from '@reduxjs/toolkit';

// Función para cargar el carrito desde localStorage
export const loadCartFromLocalStorage = () => {
  try {
    const serializedCart = localStorage.getItem('cart');
    return serializedCart ? JSON.parse(serializedCart) : [];
  } catch (e) {
    console.error('Could not load cart from localStorage', e);
    return [];
  }
};

// Función para guardar el carrito en localStorage
export const saveCartToLocalStorage = (cart) => {
  try {
    const serializedCart = JSON.stringify(cart);
    localStorage.setItem('cart', serializedCart);
  } catch (e) {
    console.error('Could not save cart to localStorage', e);
  }
};

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: loadCartFromLocalStorage(), // Cargar el carrito desde localStorage
  },
  reducers: {
    addToCart: (state, action) => {
      const product = action.payload;
      const existingItem = state.items.find(item => item.id === product.id);

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...product, quantity: 1 });
      }
      saveCartToLocalStorage(state.items); // Guardar en localStorage
    },
    removeFromCart: (state, action) => {
      const id = action.payload;
      state.items = state.items.filter(item => item.id !== id);
      saveCartToLocalStorage(state.items); // Guardar en localStorage
    },
    decrementQuantity: (state, action) => {
      const id = action.payload;
      const existingItem = state.items.find(item => item.id === id);
      if (existingItem) {
        if (existingItem.quantity > 1) {
          existingItem.quantity -= 1;
        } else {
          state.items = state.items.filter(item => item.id !== id);
        }
      }
      saveCartToLocalStorage(state.items); // Guardar en localStorage
    },
    clearCart(state) {
      state.items = [];
    },
  },
});

export const { addToCart, removeFromCart, decrementQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;