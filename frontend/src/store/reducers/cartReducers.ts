import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_SAVE_PAYMENT_METHOD,
  CART_SAVE_SHIPPING_ADDRESS,
} from '../constants/cartConstants';
import { CartItem } from '../../types/types';

export const cartReducer = (
  state = { cartItems: [], shippingAddress: {}, total: 0 },
  action: {
    type: string;
    payload: CartItem;
  }
) => {
  switch (action.type) {
    case CART_ADD_ITEM:
      const newItem = action.payload;

      let existingItem: CartItem | undefined;

      existingItem = state.cartItems.find(
        (itemInCart: CartItem) => itemInCart.productId === newItem.productId
      );

      if (existingItem) {
        return {
          ...state,
          cartItems: state.cartItems.map((itemInCart: CartItem) =>
            itemInCart.productId === existingItem?.productId
              ? newItem
              : itemInCart
          ),
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, newItem],
        };
      }
    case CART_REMOVE_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.filter(
          (itemInCart: CartItem) =>
            itemInCart.productId !== action.payload.toString()
        ),
      };
    case CART_SAVE_SHIPPING_ADDRESS:
      return {
        ...state,
        shippingAddress: action.payload,
      };
    case CART_SAVE_PAYMENT_METHOD:
      return {
        ...state,
        paymentMethod: action.payload,
      };
    default:
      return state;
  }
};
export default cartReducer;
