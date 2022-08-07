import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import Order from '../models/orderModel';

/**
 * @desc create a new order
 * @route POST /api/orders
 * @access private
 */
const addOrderItems = asyncHandler(async (req: Request, res: Response) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error('No items in order');
  } else {
    const order = new Order({
      orderItems,
      user: req.user!._id,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    });

    const createdOrder = await order.save();
    res.status(201).json(createdOrder);
  }
});

export { addOrderItems };
