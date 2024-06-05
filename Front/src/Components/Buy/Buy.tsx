import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import BuyCards from './BuyCards';
import { Spinner, Button } from 'react-bootstrap';
import MercadoPagoLogo from '../../assets/pinpng.com-mercado-png-4241166.png'

function Buy() {
  const navigate = useNavigate();
  const cartItems = useSelector(state => state.cart.items);
  const products = useSelector(state => state.products.products);
  const userId = useSelector(state => state.user.user?.id);

  // Estado para guardar la respuesta del servidor y el estado de carga
  const [redirectUrl, setRedirectUrl] = useState(null);
  const [loading, setLoading] = useState(false);

  // Petición para enviar los datos de compra 
  const sendCart = async () => {
    try {
      const cartData = {
        userId: userId, // Asegúrate de tener un userId válido
        products: cartItems.map(cartItem => {
          const product = products.find(product => product.id === cartItem.id);
          return {
            productId: cartItem.id,
            quantity: cartItem.quantity,
            unitPrice: product.price
          };
        })
      };
      
      const response = await axios.post(`${import.meta.env.VITE_ENDPOINT}/payment/crear-orden`, cartData);
      return response.data.redirectUrl;
      
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  // Función para controlar el botón
  const handleBuy = async () => {
    setLoading(true);
    const url = await sendCart();
    setRedirectUrl(url);
    setLoading(false);
  };

  // Efecto para manejar la redirección
  useEffect(() => {
    if (redirectUrl) {
      window.location.href = redirectUrl; // Redirigir usando window.location.href
    }
  }, [redirectUrl]);

  // Verificar si products y cartItems están disponibles
  if (!products || !cartItems) {
    return <div>Loading...</div>; // o cualquier indicador de carga que prefieras
  }


  // Calcular el total
  const total = cartItems.reduce((acc, cartItem) => {
    const product = products.find(product => product.id === cartItem.id);
    if (!product) {
      console.log(`Producto no encontrado para el ID: ${cartItem.id}`);
      return acc; // Si el producto no está encontrado, continuar
    }
    console.log(`Producto encontrado: ${product.name}, Precio: ${product.price}, Cantidad: ${cartItem.quantity}`);
    return acc + (product.price * cartItem.quantity); // Sumar el precio del producto multiplicado por la cantidad
  }, 0);

  // Calcular el total de cantidades
  const totalQuantity = cartItems.reduce((acc, cartItem) => {
    const product = products.find(product => product.id === cartItem.id);
    if (product) {
      return acc + cartItem.quantity;
    }
    return acc;
  }, 0);

  // Filtrar productos que están en el carrito
  const cartProducts = products.filter(product => cartItems.some(item => item.id === product.id));

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-8">
          {cartProducts.map(product => {
            const cartItem = cartItems.find(item => item.id === product.id);
            return (
              <BuyCards
                key={product.id}
                id={product.id}
                image={product.image}
                name={product.name}
                price={product.price}
                quantity={cartItem.quantity}
              />
            );
          })}
        </div>
        <div className="col-md-4">
          <div className="card" style={{ width: '26rem' }}>
            <div className="card-body">
              <h5 className="card-title">Resumen de compra</h5>
              <h6 className="card-subtitle mb-2 text-body-secondary">Productos: {totalQuantity}</h6>
              <h6 className="card-subtitle mb-2 text-body-secondary">Envio: Acordar con el vendedor</h6>
              <h4 className="card-title">Total: ${total.toFixed(2)}</h4>
              <Button onClick={handleBuy} variant="primary" disabled={loading} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center',  width: '17em'}}>
                {loading ? (
                  <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
                ) : (
                    <>
                    <span>Pagar con MercadoPago</span>
                    <img src={MercadoPagoLogo} alt="MercadoPago Logo" style={{ height: '40px', marginTop: '8px' }} />
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Buy;