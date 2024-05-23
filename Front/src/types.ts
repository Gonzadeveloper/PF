export interface Review {
  rating: number;
  comment: string;
}

export interface Product {
  id: number;
  name: string;
  category: Category;
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
  selectedProduct: Product | null;
}

export type RootState = {
  products: ProductsState;
};

export type Category = {
  id: number;
  name: string;
};

export type Filters = {
  name: string;
  maxPrice: number;
  minPrice: number;
  category: Category;
  condition: string;
  minStock: number;
  maxStock: number;
};
