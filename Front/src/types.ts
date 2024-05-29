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

export interface FavoritesState {
  favorites: Product[];
}

export type RootState = {
  products: ProductsState;
  favorites: FavoritesState;
  users: UserState;
};

export interface Category {
  id: number;
  name: string;
}

export type CategoryState = {
  categorys: Category[]
}

export interface Filters {
  name: string;
  maxPrice: number;
  minPrice: number;
  category: Category;
  condition: string;
  minStock: number;
  maxStock: number;
}

export interface CardProps {
  id?: Product["id"];
  image?: Product["image"];
  name?: Product["name"];
  description?: Product["description"];
  price?: Product["price"];
  condition?: Product["condition"];
  stock?: Product["stock"];
  category?: Product["category"];
  reviews?: Product["reviews"];
  isFavorite?: boolean;
  isSearchPage?: boolean;
  onToggleFavorite?: () => void;
}
export interface FormData {
  password: string;
  picture: string;
  typeuser: string;
  address: string;
  country: string;
  city: string;
  state: string;
  postalcode: string;
}

export interface UserState {
  user: User | null;
  addresses: Address[] | [];
  products: Product[] | [];
  reviews: Review[] | [];
  orders: Order[] | [];
  cart: Cart | null;
}
export interface User {
  id: number;
  name: string;
  picture: string;
  email: string;
  typeuser: string;
  address: string;
  country: string;
  city: string;
  state: string;
  postalcode: string;
}

export interface Address {
  id: number;
  address: string;
  city: string;
  state: string;
  postalcode: string;
  country: string;
}

export interface Order {
  id: number;
  userId: number;
  orderDate: Date;
  orderStatus: string;
  products: ProductOrder[];
  payment: Payment | null;
}

export interface Cart {
  id: number;
  userId: number;
  cartProducts: CartProduct[];
}

export interface ProductOrder {
  id: number;
  orderId: number;
  productId: number;
  quantity: number;
  unitPrice: number;
}

export interface Payment {
  id: number;
  orderId: number;
  paymentDate: Date;
  amount: number;
  paymentMethod: string;
}
export interface CartProduct {
  id: number;
  cartId: number;
  productId: number;
  quantity: number;
}
export interface Review {
  rating: number;
  comment: string;
}
