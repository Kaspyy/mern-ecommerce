import express, { Request, Response } from 'express';
import Product from '../models/productModel';
import asyncHandler from 'express-async-handler';

const router = express.Router();

/**
 * @desc fetch all products
 * @route GET /api/products
 * @access public
 */
router.get(
  '/',
  asyncHandler(async (req: Request, res: Response) => {
    const products = await Product.find({});

    res.json(products);
  })
);

/**
 * @desc fetch a product by id
 * @route GET /api/products/:id
 * @access public
 */
router.get(
  '/:id',
  asyncHandler(async (req: Request, res: Response) => {
    const product = await Product.findById(req.params.id);

    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ msg: 'Product not found' });
    }
  })
);

export default router;
