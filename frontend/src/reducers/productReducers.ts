import { Action } from 'redux';
import {
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_FAILURE,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_FAILURE,
  PRODUCT_DETAILS_SUCCESS,
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

export const productDetailsReducer = (
  state = { product: { reviews: [] } },
  action: Action & { payload: Product }
) => {
  switch (action.type) {
    case PRODUCT_DETAILS_REQUEST:
      return { loading: true, ...state };
    case PRODUCT_DETAILS_SUCCESS:
      return { loading: false, product: action.payload };
    case PRODUCT_DETAILS_FAILURE:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
