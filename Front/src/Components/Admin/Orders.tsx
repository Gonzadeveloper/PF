import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../Redux';
import { getAllOrders } from '../../Redux/Actions/orderActions';
import { AppDispatch } from '../../Redux/index'; // Asegúrate de importar el tipo AppDispatch
import { Order } from '../../types';
import { selectAllOrders } from '../../Redux/Selector';

const OrderComponent: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>(); // Tipo dispatch como AppDispatch
    const orders = useSelector(selectAllOrders) // Cambia 'orders' a 'order'

    console.log(orders);
    
    return (
        <div>
            <div className="header">
                <h1>Orders</h1>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>User ID</th>
                        <th>Order Date</th>
                        <th>Order Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map((order: Order) => ( // Cambia 'orders' a 'order'
                        <tr key={order.id}>
                            <td>{order.id}</td>
                            <td>{order.userId}</td>
                            <td>{new Date(order.orderDate).toLocaleDateString()}</td> {/* Cambia el formato de la fecha */}
                            <td>{order.orderStatus}</td>
                            <td>
                                {/* Aquí puedes agregar botones para editar o eliminar la orden si es necesario */}
                                <button>Edit</button>
                                <button>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default OrderComponent;
