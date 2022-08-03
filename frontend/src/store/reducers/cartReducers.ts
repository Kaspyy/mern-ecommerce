import { CART_ADD_ITEM, CART_REMOVE_ITEM } from '../constants/cartConstants';
import { Cart, CartItem } from '../../types';

export const cartReducer = (
  state: Cart = { cartItems: [], total: 0 },
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
    default:
      return state;
  }
};
export default cartReducer;
