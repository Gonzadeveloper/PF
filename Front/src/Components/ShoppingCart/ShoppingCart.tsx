import { useSelector, useDispatch } from 'react-redux';
import { useId } from 'react';
import { CartIcon } from './icons';
import CartItem from './CardItem';
import { addToCart, removeFromCart, decrementQuantity } from '../../Redux/Slices/CartSlice';
import './Cart.css';

export function Cart() {
  const cartCheckboxId = useId();
  const cartItems = useSelector(state => state.cart.items);
  const products = useSelector(state => state.products.products);
  const dispatch = useDispatch(); 
  
    const handleAddToCart = (id, quantity) => {
      dispatch(addToCart({ id, quantity }));
    };

  const handleRemoveToCart = (id) => {
    dispatch(removeFromCart( id ));
  };

  const handleCartDecrement = (id) => {
    dispatch(decrementQuantity( id ));
  };

  // Filtrar productos que están en el carrito
  const cartProducts = products.filter(product => cartItems.some(item => item.id === product.id));

  return (
    <>
      <label className='cart-button' htmlFor={cartCheckboxId}>
        <CartIcon />
      </label>
      <input id={cartCheckboxId} type='checkbox' hidden />

      <aside className='cart'>
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
                removeItem={handleRemoveToCart} // Pasar la función como prop
                decrementItem={handleCartDecrement}
              />
            );
          })}
        </ul>
      </aside>
    </>
  );
}

export default Cart;