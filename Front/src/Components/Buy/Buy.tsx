import { useSelector, useDispatch } from 'react-redux';
import BuyCards from './BuyCards';

function Buy () {

    const cartItems = useSelector(state => state.cart.items);
    const products = useSelector(state => state.products.products);

    // Calcular el total
    const total = cartItems.reduce((acc, cartItem) => {
        const product = products.find(product => product.id === cartItem.id);
        return acc + (product.price * cartItem.quantity);
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
                        </div>
                    </div>
                </div>
            </div>
        </div>   
    );
}

export default Buy;