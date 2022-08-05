import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import Product from '../models/productModel';

/**
 * @desc fetch all products
 * @route GET /api/products
 * @access public
 */
const getProducts = asyncHandler(async (req: Request, res: Response) => {
  const products = await Product.find({});

  res.json(products);
});

/**
 * @desc fetch a product by id
 * @route GET /api/products/:id
 * @access public
 */
const getProductById = asyncHandler(async (req: Request, res: Response) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

export { getProducts, getProductById };
