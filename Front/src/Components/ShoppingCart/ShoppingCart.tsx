import { useSelector, useDispatch } from 'react-redux';
import { useId } from 'react';
import { CartIcon } from './icons';
import CartItem from './CardItem';
import { addToCart, removeFromCart, decrementQuantity } from '../../Redux/Slices/CartSlice';
import './Cart.css';

export function Cart() {
  const cartCheckboxId = useId();
  const cartItems = useSelector(state => state.cart.items);
  const dispatch = useDispatch(); 
  
  const handleAddToCart = (id, image, name, price, description, condition, stock, category, reviews, quantity) => {
    dispatch(addToCart({ id, image, name, price, description, condition, stock, category, reviews, quantity }));
  };

  const handleRemoveToCart = (id) => {
    dispatch(removeFromCart( id ));
  };

  const handleCartDecrement = (id) => {
    dispatch(decrementQuantity( id ));
  };

  return (
    <>
      <label className='cart-button' htmlFor={cartCheckboxId}>
        <CartIcon />
      </label>
      <input id={cartCheckboxId} type='checkbox' hidden />

      <aside className='cart'>
        <ul>
          {cartItems.map(item => (
            <CartItem
              key={item.id}
              id={item.id}
              image={item.image}
              name={item.name}
              price={item.price}
              quantity={item.quantity}
              updateQuantity={handleAddToCart} // Pasar la función como prop
              removeItem={handleRemoveToCart} // Pasar la función como prop
              decrementItem={handleCartDecrement}
            />
          ))}
        </ul>
      </aside>
    </>
  );
}

export default Cart;