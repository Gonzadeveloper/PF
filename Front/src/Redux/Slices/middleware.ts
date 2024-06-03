import axios from 'axios';
import { clearCart, addToCart, loadCartFromLocalStorage, setCartSynced, clearCartFromLocalStorage} from './CartSlice';


const cartMiddleware = store => next => action => {
  // Obtener el estado actual de Redux
  const state = store.getState();
  const user = state.user.user; // Ajusta esto según la estructura de tu estado
  const isCartSynced = state.cart.isCartSynced;

  // Ejecutar el middleware solo si el estado del usuario no es null y aún no ha sido autenticado
  if (user !== null && !isCartSynced) {
    const userId = user.id; // Asegúrate de que el userId esté disponible en el estado del usuario
    const cartItems = loadCartFromLocalStorage();

    axios.get(`http://localhost:3000/cart`)
    .then(response => {
      const carts = response.data;
      const userCart = carts.find(cart => cart.userId === userId);


      if (userCart === undefined) {
        // Usuario no tiene carrito, crear uno nuevo
        axios.post('http://localhost:3000/cart', { userId: userId })
        .then(createCartResponse => {
          const newCartId = createCartResponse.data.id;
        }).catch(error => {
          console.error('Error creating new cart:', error);
        }); 

        store.dispatch(setCartSynced(true))

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

              store.dispatch(setCartSynced(true))

          } else if (!isCartSynced ) {

            axios.get(`http://localhost:3000/cart/${cartId}`)
            .then(response => {
              
              const cartProducts = response.data.cartProducts;

              const cartItemsConvertAPI = cartProducts.map(({productId, quantity}) => ({
                productId: productId,
                quantity: quantity,
              }));
              
              const cartItemsConvertR = cartItems.map(({id, quantity}) => ({
                productId: id,
                quantity: quantity,
              })); 
              
              // Filtrar productos de API que no están en R
              const sendToRedux = cartItemsConvertAPI.filter(apiItem =>
                !cartItemsConvertR.some(rItem => rItem.productId === apiItem.productId)
              );

              // Filtrar productos de R que no están en API
              const sendToDB = cartItemsConvertR.filter(rItem =>
                !cartItemsConvertAPI.some(apiItem => apiItem.productId === rItem.productId)
              );
 
              
              //enviar los datos al estado de redux
              const reduxProducts = store.getState().products.products;
              

              // Completar la información de sendToRedux con los detalles de reduxProducts
              const completeSendToRedux = sendToRedux.map(item => {
                const productDetails = reduxProducts.find(product => product.id === item.productId);
                return {
                  id: productDetails.id,
                  image: productDetails.image,
                  name: productDetails.name,
                  price: productDetails.price,
                  description: productDetails.description,
                  isFavorite: productDetails.isFavorite,
                  isSearchPage: productDetails.isSearchPage,
                  quantity: item.quantity
                };
              });
              

              // Despachar la acción addToCart con todos los productos en completeSendToRedux
              store.dispatch(addToCart(completeSendToRedux));

              //convertir al formato que acepta la DB
              const productsToDB = {
                products: sendToDB.map(item => ({
                  cartId: cartId,
                  productId: item.productId,
                  quantity: item.quantity
                }))
              };
            
              // Enviar el objeto en una sola solicitud POST
              axios.post('http://localhost:3000/cartproduct/', productsToDB)
                .then(response => {
                  console.log('Products added to new cart:', response.data);
                })
                .catch(error => {
                  console.error('Error adding products to new cart:', error);
                });
            
              store.dispatch(setCartSynced(true))

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
    // Eliminar el middleware después de la primera ejecución
    store.dispatch = next;
    }
    return next(action); 
  }

  export default cartMiddleware;