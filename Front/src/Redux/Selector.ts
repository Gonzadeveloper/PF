import { createSelector } from 'reselect';
import { RootState } from './index';

export const selectProducts = (state: RootState) => state.products.products;
export const selectFilters = (state: RootState) => state.products.filters;
export const selectNameFilter = (state: RootState) => state.products.filters.name;

export const selectFilteredProducts = createSelector(
  [selectProducts, selectFilters],
  (products, filters) => {
    return products.filter(product => {
      return (
        product.price >= filters.minPrice &&
        product.price <= filters.maxPrice &&
        product.stock >= filters.minStock &&
        product.stock <= filters.maxStock &&
        (filters.category === 'Todos' || product.category === filters.category) &&
        (filters.condition === 'Todos' || product.condition === filters.condition)&&
        (filters.name === '' || product.name.toLowerCase().includes(filters.name.toLowerCase()))
      );
    });
  }
);