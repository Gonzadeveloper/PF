import axios from 'axios';
import { clearCart, loadCartFromLocalStorage, clearCartFromLocalStorage} from './CartSlice';

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
            const payload = {
              products: cartItems.map(item => ({
                cartId: cartId,
                productId: item.id,
                quantity: item.quantity
              }))
            }
                       
            // Enviar el objeto en una sola solicitud POST
            axios.post('http://localhost:3000/cartproduct/', payload)
              .then(response => {
                console.log('Products added to cart:', response.data);
              })
              .catch(error => {
                console.error('Error adding products to cart:', error);
              });
              

          } else {
            // Usuario no tiene carrito, crear uno nuevo
              axios.post('http://localhost:3000/cart', { userId: userId })
              .then(createCartResponse => {
                const newCartId = createCartResponse.data.id;

                // Construir el objeto con la estructura correcta
                const payload = {
                  products: cartItems.map(item => ({
                    cartId: newCartId,
                    productId: item.id,
                    quantity: item.quantity
                  }))
                };

                // Enviar el objeto en una sola solicitud POST
                axios.post('http://localhost:3000/cartproduct/', payload)
                  .then(response => {
                    console.log('Products added to new cart:', response.data);
                  })
                  .catch(error => {
                    console.error('Error adding products to new cart:', error);
                  });

              }).catch(error => {
                console.error('Error creating new cart:', error);
              });
          }

          // Limpiar el carrito en el estado de Redux después de sincronizar
          // store.dispatch(clearCart());
          clearCartFromLocalStorage();

        }).catch(error => {
          console.error('Error fetching carts:', error);
        });
    }
  }

  return next(action);
};

export default cartMiddleware;