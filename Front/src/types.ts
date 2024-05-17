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
  reviews: Review[];
}

export interface ProductsState {
  products: Product[];
}

export interface FavoritesState {
  favorites: Product[];
}

export type RootState = {
  products: ProductsState;
  favorites: FavoritesState;
};
