import { Action } from 'redux';
import {
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_FAILURE,
  PRODUCT_LIST_SUCCESS,
} from '../constants/productConstants';
import { Product } from '../types';

export const productListReducer = (
  state = { products: [] },
  action: Action & { payload: Product }
) => {
  switch (action.type) {
    case PRODUCT_LIST_REQUEST:
      return { loading: true, products: [] };
    case PRODUCT_LIST_SUCCESS:
      return { loading: false, products: action.payload };
    case PRODUCT_LIST_FAILURE:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
