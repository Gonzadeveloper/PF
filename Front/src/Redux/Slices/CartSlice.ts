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

export const clearCartFromLocalStorage = () => {
  try {
    localStorage.removeItem('cart');
    console.log('Cart cleared from localStorage');
  } catch (e) {
    console.error('Could not clear cart from localStorage', e);
  }
};

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: loadCartFromLocalStorage(), // Cargar el carrito desde localStorage
    isCartSynced: false,
  },
  reducers: {
    addToCart(state, action) {
      if (Array.isArray(action.payload)) {
        // Si el payload es un array, añadir todos los productos
        action.payload.forEach(product => {
          const existingItem = state.items.find(item => item.id === product.id);
          if (existingItem) {
            existingItem.quantity += product.quantity;
          } else {
            state.items.push(product);
          }
          saveCartToLocalStorage(state.items); // Guardar en localStorage
        });
      } else {
        // Si el payload es un solo producto
        const product = action.payload;
        const existingItem = state.items.find(item => item.id === product.id);

        if (existingItem) {
          existingItem.quantity += 1;
        } else {
          state.items.push({ ...product, quantity: 1 });
        }
        saveCartToLocalStorage(state.items); // Guardar en localStorage
    }
  } 
    ,
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
    setCartProducts: (state, action) => {
      state.items = action.payload;
      saveCartToLocalStorage(state.items); // Guardar en localStorage
    },
    setCartSynced(state, action) {
      state.isCartSynced = action.payload;
    },
    clearCart(state) {
      state.items = [];
    },
  },
});

export const { addToCart, removeFromCart, decrementQuantity, clearCart, setCartSynced, setCartProducts } = cartSlice.actions;
export default cartSlice.reducer;