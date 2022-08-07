import axios from 'axios';
import { Order } from '../../types';
import {
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_FAILURE,
  ORDER_CREATE_SUCCESS,
} from '../constants/orderConstants';
import { AppDispatch } from '../store';

export const createOrder = (order: Order) => {
  return async (dispatch: AppDispatch, getState: Function) => {
    try {
      dispatch({
        type: ORDER_CREATE_REQUEST,
      });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.post(`/api/orders`, order, config);

      dispatch({
        type: ORDER_CREATE_SUCCESS,
        payload: data,
      });
    } catch (error: any) {
      dispatch({
        type: ORDER_CREATE_FAILURE,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
};
