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
  total: number;
}
