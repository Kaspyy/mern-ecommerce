import { CART_ADD_ITEM } from '../constants/cartConstants';

export const cartReducer = (state = { cartItems: [] }, action: any) => {
  switch (action.type) {
    case CART_ADD_ITEM:
      const item = action.payload;

      const existingItem = state.cartItems.find(
        (cartItem: any) => cartItem.id === item.id
      );

      if (existingItem) {
        return {
          ...state,
          cartItems: state.cartItems.map((cartItem: any) =>
            cartItem.id === item.id
              ? { ...cartItem, quantity: cartItem.quantity + 1 }
              : cartItem
          ),
        };
      }
    default:
      return state;
  }
};
export default cartReducer;
