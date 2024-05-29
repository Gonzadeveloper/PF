import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Category, CategoryState } from "../../types";

const initialState: CategoryState = {
    categorys: []
}

const categorySlice = createSlice({
    name: "category",
    initialState,
    reducers: {
        setCategory: (state, action: PayloadAction<Category[]>) => {
            state.categorys = action.payload;
        }
    }
})

export const {setCategory} = categorySlice.actions

export default categorySlice.reducer