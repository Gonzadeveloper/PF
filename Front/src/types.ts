export interface Review {
  rating: number;
  comment: string;
}

export interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  stock: number;
  description: string;
  image: string;
  condition: string;
  reviews: Review[];
}

export interface ProductsState {
  products: Product[];
  filters: Filters;
}

export type RootState = {
  products: ProductsState;
};

export type Filters = {
  name: string;
  maxPrice: number,
  minPrice: number;
  category: string;
  condition: string;
  minStock: number;
  maxStock: number;
};


