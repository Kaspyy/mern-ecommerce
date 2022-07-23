import { Action } from 'redux';
import { CART_ADD_ITEM } from '../constants/cartConstants';
import { Cart } from '../types';

export const cartReducer = (
  state: Cart = { cartItems: [], total: 0 },
  action: any
) => {
  switch (action.type) {
    case CART_ADD_ITEM:
      const newItem = action.payload;

      let existingItem: any;

      existingItem = state.cartItems.find(
        (itemInCart: any) => itemInCart.productId === newItem.productId
      );

      if (existingItem) {
        return {
          ...state,
          cartItems: state.cartItems.map((itemInCart: any) =>
            itemInCart.productId === existingItem.productId
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

    default:
      return state;
  }
};
export default cartReducer;
