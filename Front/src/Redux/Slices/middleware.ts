import axios from 'axios';
import { clearCart, loadCartFromLocalStorage } from './CartSlice';

const cartMiddleware = store => next => action => {
  if (action.type === 'user/setUser' && action.payload) {
    const userId = action.payload.id; // Asegúrate de que el userId esté disponible en la acción payload
    const cartItems = loadCartFromLocalStorage();
    
    if (cartItems.length > 0) {
      axios.get(`http://localhost:3000/cart`)
        .then(response => {
          const carts = response.data;
          const userCart = carts.find(cart => cart.userId === userId);

          if (userCart) {
            // Usuario ya tiene un carrito
            const cartId = userCart.id;

            // Agregar productos al carrito existente
            cartItems.forEach(item => {
              axios.post('http://localhost:3000/cartproduct/', {
                cartId: cartId,
                productId: item.id,
                quantity: item.quantity
              }).catch(error => {
                console.error('Error adding product to cart:', error);
              });
            });

          } else {
            // Usuario no tiene carrito, crear uno nuevo
            axios.post('http://localhost:3000/cart', { userId: userId })
              .then(createCartResponse => {
                const newCartId = createCartResponse.data.id;

                // Agregar productos al nuevo carrito
                cartItems.forEach(item => {
                  axios.post('http://localhost:3000/cartproduct/', {
                    cartId: newCartId,
                    productId: item.id,
                    quantity: item.quantity
                  }).catch(error => {
                    console.error('Error adding product to new cart:', error);
                  });
                });

              }).catch(error => {
                console.error('Error creating new cart:', error);
              });
          }

          // Limpiar el carrito en el estado de Redux después de sincronizar
          store.dispatch(clearCart());

        }).catch(error => {
          console.error('Error fetching carts:', error);
        });
    }
  }

  return next(action);
};

export default cartMiddleware;