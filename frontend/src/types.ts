export interface Product {
  _id: string;
  name: string;
  image: string;
  description: string;
  brand: string;
  category: string;
  price: number;
  countInStock: number;
  rating: number;
  numReviews: number;
}

export interface CartItem {
  qty: number;
  countInStock: Number;
  productId: string;
  quantity: number;
  price: number;
  image: string;
  name: string;
}

export interface Cart {
  cartItems: CartItem[];
  shippingAddress: ShippingAddress;
  total: number;
}

export interface UserLogin {
  loading: boolean;
  error: string;
  userInfo: User | null;
}

export interface User {
  _id: string;
  name: string;
  email: string;
  password?: string;
  isAdmin?: boolean;
  token: string;
}

export interface ShippingAddress {
  address?: string;
  city?: string;
  postalCode?: string;
  country?: string;
}
