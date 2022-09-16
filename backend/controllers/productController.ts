import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import Product from '../models/productModel';

/**
 * @desc fetch all products
 * @route GET /api/products
 * @access public
 */
const getProducts = asyncHandler(async (req: Request, res: Response) => {
  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: 'i',
        },
      }
    : {};

  const products = await Product.find({ ...keyword });

  res.json(products);
});

/**
 * @desc fetch a product by id
 * @route GET /api/products/:id
 * @access public
 */
const getProductById = asyncHandler(async (req: Request, res: Response) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    res.status(404);
    throw new Error('Product not found');
  }

  res.json(product);
});

/**
 * @desc delete a product
 * @route DELETE /api/products/:id
 * @access private/admin
 */
const deleteProduct = asyncHandler(async (req: Request, res: Response) => {
  const product = await Product.findByIdAndDelete(req.params.id);

  if (!product) {
    res.status(404);
    throw new Error('Product not found');
  }
  await product.remove();
  res.json({ message: 'Product removed' });
});

/**
 * @desc create a product
 * @route POST /api/products
 * @access private/admin
 */
const createProduct = asyncHandler(async (req: Request, res: Response) => {
  const product = new Product({
    name: 'Sample name',
    price: 0,
    user: req.user!._id,
    image: '/images/sample.jpg',
    brand: 'Sample brand',
    category: 'Sample category',
    countInStock: 0,
    numReviews: 0,
    description: 'Sample description',
  });

  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
});

/**
 * @desc update a product
 * @route PUT /api/products/:id
 * @access private/admin
 */
const updateProduct = asyncHandler(async (req: Request, res: Response) => {
  const { name, price, image, brand, category, countInStock, description } =
    req.body;

  const product = await Product.findById(req.params.id);

  if (!product) {
    res.status(404);
    throw new Error('Product not found');
  }

  product.name = name;
  product.price = price;
  product.image = image;
  product.brand = brand;
  product.category = category;
  product.countInStock = countInStock;
  product.description = description;

  const updatedProduct = await product.save();
  res.json(updatedProduct);
});

/**
 * @desc create a new review
 * @route POST /api/products/:id/reviews
 * @access private
 */
const createProductReview = asyncHandler(
  async (req: Request, res: Response) => {
    const { rating, comment } = req.body;

    const product = await Product.findById(req.params.id);

    if (!product) {
      res.status(404);
      throw new Error('Product not found');
    }

    const alreadyReviewed = product.reviews.find(
      r => r.user.toString() === req.user!._id.toString()
    );

    if (alreadyReviewed) {
      res.status(400);
      throw new Error('Product already reviewed');
    }

    const review = {
      name: req.user!.name,
      rating: Number(rating),
      comment,
      user: req.user!._id,
    };

    product.reviews.push(review);

    product.numReviews = product.reviews.length;

    product.rating =
      product.reviews.reduce((acc, item) => item.rating + acc, 0) /
      product.reviews.length;

    await product.save();
    res.status(201).json({ message: 'Review added' });
  }
);

export {
  getProducts,
  getProductById,
  deleteProduct,
  createProduct,
  updateProduct,
  createProductReview,
};
