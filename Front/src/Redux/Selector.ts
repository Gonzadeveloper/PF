import { createSelector } from "reselect";
import { RootState } from "./index";

export const selectProducts = (state: RootState) => state.products.products;
export const selectFilters = (state: RootState) => state.products.filters;
export const selectNameFilter = (state: RootState) =>
  state.products.filters.name;
export const selectSelectedProduct = (state: RootState) =>
  state.products.selectedProduct;

export const selectFilteredProducts = createSelector(
  [selectProducts, selectFilters],
  (products, filters) => {
    return products.filter((product) => {
      return (
        product.price >= filters.minPrice &&
        product.price <= filters.maxPrice &&
        product.stock >= filters.minStock &&
        product.stock <= filters.maxStock &&
        (filters.category.name === "Todos" ||
          product.category.name === filters.category.name) &&
        (filters.condition === "Todos" ||
          product.condition === filters.condition) &&
        (filters.name === "" ||
          product.name.toLowerCase().includes(filters.name.toLowerCase()))
      );
    });
  }
);

export const selectUser = (state: RootState) => state.user.user;
export const selectAddresses = (state: RootState) => state.user.addresses;
export const selectReviews = (state: RootState) => state.user.reviews;
export const selectOrders = (state: RootState) => state.user.orders;
export const selectCart = (state: RootState) => state.user.cart;
export const selectCategory = (state:RootState) => state.category.categorys
export const selectAllOrders = (state:RootState) => state.order.orders

