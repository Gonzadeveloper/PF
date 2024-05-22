import axios from "axios"
import { getProductByName, setProducts } from "../Slices/ProductsSlice"
import { AppDispatch } from ".."
import { Product } from "../../types"

export const getAllProds = () => {
  return async (dispatch: AppDispatch) => {
    try {
      const res = await axios.get<Product[]>(`${import.meta.env.VITE_ENDPOINT}/products`);
      dispatch(setProducts(res.data));
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };
};

export const getProdByName = (name:string)=>async(dispatch:AppDispatch)=>{
    const res = await axios.get<Product[]>(`${import.meta.env.VITE_ENDPOINT}/products?name=${name}`)
    dispatch(getProductByName(res.data))
}