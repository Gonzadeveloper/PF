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
  maxPrice: number,
  minPrice: number;
  category: Category;
  condition: string;
  minStock: number;
  maxStock: number;
};

export interface CardProps {
  id?: Product['id'];
  image?: Product['image'];
  name?: Product['name'];
  description?: Product['description'];
  price?: Product['price'];
  condition?: Product['condition'];
  stock?: Product['stock'];
  category?: Product['category'];
  reviews?: Product['reviews'];
}