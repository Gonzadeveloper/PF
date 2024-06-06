import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Order } from '../../types';

interface OrdersState {
    orders: Order[];
}

const initialState: OrdersState = {
    orders: [],
};

const ordersSlice = createSlice({
    name: 'orders',
    initialState,
    reducers: {
        setOrders(state, action: PayloadAction<Order[]>) {
            state.orders = action.payload;
        },
        setStatus(state, action: PayloadAction<Order>) {
            state.orders = state.orders.map(
                (prod) => prod.id === action.payload.id ? action.payload : prod
            )
        },
        // Nuevo caso para borrar una orden
        deleteOrder(state, action: PayloadAction<number>) {
            state.orders = state.orders.filter(order => order.id !== action.payload);
        },
    },
});

export const { setOrders, setStatus } = ordersSlice.actions;

export default ordersSlice.reducer;