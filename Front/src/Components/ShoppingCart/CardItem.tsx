import React from 'react';

function CartItem({ id, image, name, price, quantity, updateQuantity, removeItem, decrementItem}) {
  return (
    <li>
      <img src={image} alt={name} />
      <div>
        <strong>{name}</strong> - ${price*quantity}
      </div>
      <footer>
      <button
          className='cart-button3'
          onClick={() => removeItem(id)} // Llama a la función con el nuevo valor de cantidad
        >
          x
        </button>
        <small>Cantidad: {quantity}</small>
        <button
          className='cart-button4'
          onClick={() => decrementItem(id)} // Llama a la función con el nuevo valor de cantidad
        >
          -
        </button>
        <button
          className='cart-button2'
          onClick={() => updateQuantity(id, quantity + 1)} // Llama a la función con el nuevo valor de cantidad
        >
          +
        </button>
      </footer>
    </li>
  );
}

export default CartItem;