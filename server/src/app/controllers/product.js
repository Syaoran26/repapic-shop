import Product from '../models/Product.js';
import asyncHandler from 'express-async-handler';
import { ErrorWithStatus } from '../../utils/error.js';
import APIFeatures from '../../utils/APIFeatures.js';

export const createProduct = asyncHandler(async (req, res) => {
  const thumbnail = req.files.thumbnail[0].path;
  const images = req.files.images.map((image) => image.path);

  const newProduct = new Product({ ...req.body, thumbnail, images });
  const product = await newProduct.save();
  res.status(201).json(product);
});

export const updateProduct = asyncHandler(async (req, res) => {
  const product = await Product.findOneAndUpdate({ slug: req.params.slug }, { $set: req.body }, { new: true }).select(
    '-reviews',
  );
  if (!product) {
    throw new ErrorWithStatus(404, 'Không tìm thấy sản phẩm!');
  }
  res.status(200).json(product);
});

export const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findOneAndDelete({ slug: req.params.slug }).select('-reviews');
  if (!product) {
    throw new ErrorWithStatus(404, 'Không tìm thấy sản phẩm!');
  }
  res.status(200).json(product);
});

export const getProduct = asyncHandler(async (req, res) => {
  const product = await Product.findOne({ slug: req.params.slug }).populate('category');
  if (!product) {
    throw new ErrorWithStatus(404, 'Không tìm thấy sản phẩm!');
  }
  res.status(200).json(product);
});

export const getProducts = asyncHandler(async (req, res) => {
  const features = new APIFeatures(Product, req.query).search('title').filter().sort().limitFields().paginate();

  const [products, total] = await Promise.all([features.query.select('-reviews').populate('category'), features.total]);
  res.status(200).json({ products, total });
});
