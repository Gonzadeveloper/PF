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
        setStatus(state, action: PayloadAction<Order>){
            state.orders = state.orders.map(
              (prod)=> prod.id===action.payload.id ? action.payload : prod
            )
          }
    },
});

export const { setOrders, setStatus } = ordersSlice.actions;

export default ordersSlice.reducer;
