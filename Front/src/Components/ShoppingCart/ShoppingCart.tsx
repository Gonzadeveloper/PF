import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { addToCart, removeFromCart, decrementQuantity } from '../../Redux/Slices/CartSlice';
import CartItem from './CardItem'; // Asegúrate de que el nombre del componente es correcto
import './Cart.css';

function OffCanvasExample({ name, ...props }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const cartItems = useSelector(state => state.cart.items);
  const products = useSelector(state => state.products.products);
  const dispatch = useDispatch(); 
  
  const handleAddToCart = (id, quantity) => {
    dispatch(addToCart({ id, quantity }));
  };

  const handleRemoveFromCart = (id) => {
    dispatch(removeFromCart(id));
  };

  const handleCartDecrement = (id) => {
    dispatch(decrementQuantity(id));
  };

  // Verificar si products y cartItems están disponibles
  if (!products || !cartItems) {
    return <div>Loading...</div>; // o cualquier indicador de carga que prefieras
  }

    // Calcular el total
    const total = cartItems.reduce((acc, cartItem) => {
      const product = products.find(product => product.id === cartItem.id);
      if (!product) return acc; // Si el producto no está encontrado, continuar
      return acc + (product.price * cartItem.quantity); // Sumar el precio del producto multiplicado por la cantidad
    }, 0);

  // Filtrar productos que están en el carrito
  const cartProducts = products.filter(product => cartItems.some(item => item.id === product.id));

  return (
    <>
      <Button variant="primary" onClick={handleShow} className="cart-button">
        {name}
      </Button>
      <Offcanvas show={show} onHide={handleClose} {...props}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Carrito</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          
        {cartProducts.length === 0 ? (
            <p>Aquí verás tus productos una vez los agregues al carrito</p>
          ) : (
            <ul>
              {cartProducts.map(product => {
                const cartItem = cartItems.find(item => item.id === product.id);
                return (
                  <CartItem
                    key={product.id}
                    id={product.id}
                    image={product.image}
                    name={product.name}
                    price={product.price}
                    quantity={cartItem.quantity}
                    updateQuantity={handleAddToCart} // Pasar la función como prop
                    removeItem={handleRemoveFromCart} // Pasar la función como prop
                    decrementItem={handleCartDecrement} // Pasar la función como prop
                  />
                );
              })}
            </ul>
          )}
          
        </Offcanvas.Body>
          
          
          <h1>Total: ${total.toFixed(2)} </h1>
          <div className='boton'>
            <Link to={"Buy"}>
              <button type="button" className="btn btn-primary btn-lg">Comprar</button>
            </Link>
          </div>
      </Offcanvas>
    </>
  );
}

export default OffCanvasExample;