import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllOrders } from '../../Redux/Actions/orderActions';
import { AppDispatch } from '../../Redux/index';
import { Order } from '../../types';
import { selectAllOrders } from '../../Redux/Selector';

const OrderComponent: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const orders = useSelector(selectAllOrders);

    useEffect(() => {
        dispatch(getAllOrders());
    }, [dispatch]);

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
                    {orders.map((order: Order) => (
                        <tr key={order.id}>
                            <td>{order.id}</td>
                            <td>{order.userId}</td>
                            <td>{new Date(order.orderDate).toLocaleDateString()}</td>
                            <td>{order.orderStatus}</td>
                            <td>
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
