import axios from 'axios';
import { setOrders, setStatus } from '../../Redux/Slices/OrdersSlice';
import { AppDispatch } from '../index';
import { Order } from '../../types';

export const getAllOrders = () => {
    return async (dispatch: AppDispatch) => {
        try {
            const res = await axios.get<Order[]>(
                `${import.meta.env.VITE_ENDPOINT}/order`
            );
            dispatch(setOrders(res.data));
        } catch (error) {
            console.error('Error fetching orders:', error);
        }
    };
};

export const newStatus = (newstat: object, orderId: number) => {
    return async (dispatch: AppDispatch) => {
        try {
            const res = await axios.put(
                `${import.meta.env.VITE_ENDPOINT}/order/${orderId}`,
                newstat
            );
            dispatch(setStatus(res.data));
        } catch (error) {
            console.error('Error fetching orders:', error);
        }
    };
};

export const deleteOrder = (orderId: number) => {
    return async (dispatch: AppDispatch) => {
        try {
            await axios.delete(
                `${import.meta.env.VITE_ENDPOINT}/order/${orderId}`
            );
            // Después de borrar, actualizamos la lista de órdenes
            dispatch(getAllOrders());
        } catch (error) {
            console.error('Error deleting order:', error);
        }
    };
};