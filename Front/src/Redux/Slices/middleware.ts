import axios from 'axios';
import { clearCart, loadCartFromLocalStorage, clearCartFromLocalStorage} from './CartSlice';


const cartMiddleware = store => next => action => {
  // Obtener el estado actual de Redux
  const state = store.getState();
  const user = state.user.user; // Ajusta esto según la estructura de tu estado


  // Ejecutar el middleware solo si el estado del usuario no es null y aún no ha sido autenticado
  if (user !== null ) {
    const userId = user.id; // Asegúrate de que el userId esté disponible en el estado del usuario
    const cartItems = loadCartFromLocalStorage();
    console.log('User ID:', userId); // Depuración del userId
    console.log(cartItems)

    axios.get(`http://localhost:3000/cart`)
    .then(response => {
      const carts = response.data;
      const userCart = carts.find(cart => cart.userId === userId);

      console.log(userCart)

      if (userCart === undefined) {
        // Usuario no tiene carrito, crear uno nuevo
        axios.post('http://localhost:3000/cart', { userId: userId })
        .then(createCartResponse => {
          const newCartId = createCartResponse.data.id;
        }).catch(error => {
          console.error('Error creating new cart:', error);
        }); 
      } else {

        const cartId = userCart.id 

        axios.get(`http://localhost:3000/cart/${cartId}`)
        .then(response => {
          const productInCart = response.data;
          

          if (productInCart === null){

            // Usuario ya tiene un carrito y esta vacio 
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
            
            axios.get(`http://localhost:3000/cart/${cartId}`)
            .then(response => {
              
              const cartProducts = response.data.cartProducts;

              const cartItemsConvertAPI = cartProducts.map(({productId, quantity}) => ({
                productId: productId,
                quantity: quantity,
              }));

              console.log(`Aquí están los productos de la API: ${JSON.stringify(cartItemsConvertAPI, null, 2)}`);
              
              const cartItemsConvertR = cartItems.map(({id, quantity}) => ({
                productId: id,
                quantity: quantity,
              }));
              
              console.log(`Productos de redux convertidos ${JSON.stringify(cartItemsConvertR, null, 2)}`)
              
            
              // Enviar el objeto en una sola solicitud POST
              axios.post('http://localhost:3000/cartproduct/', productsToDB)
                .then(response => {
                  console.log('Products added to new cart:', response.data);
                })
                .catch(error => {
                  console.error('Error adding products to new cart:', error);
                });
            
              // Ahora productsToSend contiene los productos para enviar a la API
              // Y productsForRedux contiene los productos para el estado de Redux
            
              //Enviar los productos que estan en el local storage 
            
              console.log('Products to send:', productsToSend);
              console.log('Products for Redux:', productsForRedux);
            })
            .catch(error => {
              console.error('Error fetching cart:', error);
            });
          }

        }).catch(error => {
          console.error('Error en traer los productos:', error);
        }); 

      }

    }).catch(error => {
      console.error('Error fetching carts:', error);
    })
    }
    return next(action); 
  }

  export default cartMiddleware;