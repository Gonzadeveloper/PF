export interface User {
  id: number;
  name: string;
  email: string;
  typeuser: string;
  address: string;
  country: string;
  city: string;
  state: string;
  postalcode: string;
}

export interface UserState {
  user: User | null;
  isAuthenticated: boolean;
}
export interface FormData {
  password: string;
  typeuser: string;
  address: string;
  country: string;
  city: string;
  state: string;
  postalcode: string;
}

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
  condition: string;
  reviews: Review[];
}

export interface ProductsState {
  products: Product[];
  filters: Filters;
  selectedProduct: Product | null;
}

export interface FavoritesState {
  favorites: Product[];
}

export type RootState = {
  products: ProductsState;
  favorites: FavoritesState;
};

export interface Category {
  id: number;
  name: string;
}

export interface Filters {
  name: string;
  maxPrice: number;
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
  isFavorite?: boolean;
  isSearchPage?: boolean,
  onToggleFavorite?: () => void;
}
