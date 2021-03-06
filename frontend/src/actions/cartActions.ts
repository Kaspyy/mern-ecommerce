import axios from 'axios';
import { CART_ADD_ITEM, CART_REMOVE_ITEM } from '../constants/cartConstants';
import type { AppDispatch } from '../store';

export const addToCart =
  (id: string, qty: number) =>
  async (dispatch: AppDispatch, getState: Function) => {
    const { data } = await axios.get(`/api/products/${id}`);

    dispatch({
      type: CART_ADD_ITEM,
      payload: {
        productId: data._id,
        name: data.name,
        image: data.image,
        price: data.price,
        countInStock: data.countInStock,
        qty,
      },
    });

    localStorage.setItem(
      'cartItems',
      JSON.stringify(getState().cart.cartItems)
    );
  };

export const removeFromCart =
  (id: string) => (dispatch: AppDispatch, getState: Function) => {
    dispatch({
      type: CART_REMOVE_ITEM,
      payload: id,
    });

    localStorage.setItem(
      'cartItems',
      JSON.stringify(getState().cart.cartItems)
    );
  };
