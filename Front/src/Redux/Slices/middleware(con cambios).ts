import axios from 'axios';
import { clearCart, loadCartFromLocalStorage, clearCartFromLocalStorage} from './CartSlice';


const cartMiddleware = store => next => action => {
  // Obtener el estado actual de Redux
  const state = store.getState();
  const user = state.user.user; // Ajusta esto según la estructura de tu estado
  const isAuthenticated = state.user.isAuthenticated;

  console.log(user)
  console.log(isAuthenticated)

  // Ejecutar el middleware solo si el estado del usuario no es null y aún no ha sido autenticado
  if (user !== null && !isAuthenticated) {
    const userId = user.id; // Asegúrate de que el userId esté disponible en el estado del usuario
    const cartItems = loadCartFromLocalStorage();
    console.log('User ID:', userId); // Depuración del userId

    axios.get(`http://localhost:3000/cart`)
    .then(response => {
      const carts = response.data;
      const userCart = carts.find(cart => cart.userId === userId);
      
      console.log(`estos son los carts ${JSON.stringify(carts, null, 2)}`);
      console.log(`esto busca si el id esta en carts ${JSON.stringify(userCart, null, 2)}`);

      if (userCart !== null) {
        // Usuario ya tiene un carrito
        const cartId = userCart.id;
        if(cartItems > 0) {    
        // Agregar productos al carrito existente
        const payload = {
          products: cartItems.map(item => ({
            cartId: cartId,
            productId: item.id,
            quantity: item.quantity
          }))
        };

        console.log(`productos en carrito ${payload}`)
                   
        // Enviar el objeto en una sola solicitud POST
        axios.post('http://localhost:3000/cartproduct/', payload)
          .then(response => {
            console.log('Productos agregados al carrito:', response.data);
          })
          .catch(error => {
            console.error('Error adding products to cart:', error);
          });

          clearCartFromLocalStorage()
        }
      } else {

      }

    }).catch(error => {
      console.error('Error fetching carts:', error);
    })
    }
    return next(action); 
  }

  export default cartMiddleware;