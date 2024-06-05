import React from 'react';
import './Carditem.css'

function CartItem({ id, image, name, price, quantity, updateQuantity, removeItem, decrementItem}) {
  return (
      <div className="card cart-item-card" style={{ width: "18rem" }}>
        <img src={image} className="card-img-top" alt="..."/>
        <div className="card-body">
          <h5 className="card-title">{name}</h5>
          <p className="card-text">Precio - ${price*quantity}</p>
          <button type="button" className="btn btn-outline-danger" onClick={() => removeItem(id)}>x</button>
  
        <small className='small1'>Cantidad: {quantity}</small>

        <button type="button" className="btn btn-outline-primary button2" onClick={() => decrementItem(id)}>-</button>

        <button type="button" className="btn btn-outline-primary button3" onClick={() => updateQuantity(id, quantity + 1)}>+</button>

        </div>
      </div>
  );
}

export default CartItem;