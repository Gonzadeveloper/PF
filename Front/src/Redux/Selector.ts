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
