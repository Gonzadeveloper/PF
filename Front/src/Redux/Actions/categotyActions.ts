import axios from "axios";
import { setCategory } from "../Slices/CategorySlice";
import { AppDispatch } from "..";
import { Category } from "../../types";

export const getCategorys = ()=> async (dispatch:AppDispatch) => {
    const res = await axios.get<Category[]>(`${import.meta.env.VITE_ENDPOINT}/category`)
    dispatch(setCategory(res.data))
}