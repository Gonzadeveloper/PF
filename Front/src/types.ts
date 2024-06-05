export interface Category {
  id: number;
  name: string;
  // deletedAt: string | null;
  // createdAt: string;
  // updatedAt: string;
}
export interface CategoryState {
  categorys: Category[];
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

export interface Review {
  id: number;
  rating: number;
  comment: string;
  user: {
    name: string;
  };
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
  review: Review[];
  status?: string
}

export interface ProductsState {
  products: Product[];
  filters: Filters;
  selectedProduct: Product | null;
}

export interface FavoritesState {
  favorites: Product[];
}

export interface UserState {
  user: User | null;
  addresses: Address[];
  products: Product[];
  reviews: Review[];
  orders: Order[];
  cart: Cart | null;
}

export interface User {
  id: number;
  name: string;
  picture: string;
  email: string;
  typeuser: string;
  address: Address[];
  country: string;
  city: string;
  state: string;
  postalcode: string;
  products: Product[];
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

export type RootState = {
  products: ProductsState;
  favorites: FavoritesState;
  user: UserState;
};
