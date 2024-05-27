import axios from "axios";
import {
  getProductByName,
  setProducts,
  setProductDetails,
  postProduct,
} from "../Slices/ProductsSlice";
import { AppDispatch } from "../index";
import { Product } from "../../types";

export const getAllProds = () => {
  return async (dispatch: AppDispatch) => {
    try {
      const res = await axios.get<Product[]>(
        `${import.meta.env.VITE_ENDPOINT}/product`
      );
      dispatch(setProducts(res.data));
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };
};

export const getProdByName =
  (name: string) => async (dispatch: AppDispatch) => {
    const res = await axios.get<Product>(
      `${import.meta.env.VITE_ENDPOINT}/product?name=${name}`
    );
    dispatch(getProductByName(res.data));
  };

export const getProductById = (id: number) => async (dispatch: AppDispatch) => {
  try {
    const res = await axios.get<Product>(
      `${import.meta.env.VITE_ENDPOINT}/product/${id}`
    );
    dispatch(setProductDetails(res.data));
  } catch (error) {
    console.error("Error fetching product by ID:", error);
  }
};

export const newProduct =
  (newProd: Product) => async (dispatch: AppDispatch) => {
    try {
      const res = await axios.post<Product>(
        `${import.meta.env.VITE_ENDPOINT}/product`,
        newProd
      );
      dispatch(postProduct(res.data));
    } catch (error) {
      console.error("Error posting new product:", error);
    }
  };
