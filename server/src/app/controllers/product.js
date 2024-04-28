import Product from '../models/Product.js';
import asyncHandler from 'express-async-handler';
import { ErrorWithStatus } from '../../utils/error.js';
import APIFeatures from '../../utils/APIFeatures.js';
export const createProduct = asyncHandler(async (req, res) => {
  const thumbnailFile = req.files[0];
  const imageFiles = req.files;

  const thumbnail = `data:${thumbnailFile.mimetype};base64${thumbnailFile.buffer.toString('base64')}`;
  const images = [];
  for (const file of imageFiles) {
    const image = `data:${file.mimetype};base64${file.buffer.toString('base64')}`;
    images.push(image);
  }
  const newProduct = new Product({ ...req.body, thumbnail: thumbnail, images: images });
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
  const products = await Product.find().select('-reviews').populate('category');
  res.status(200).json(products);
  const features = new APIFeatures(Product.find().select('-reviews').populate('category'), req.body) // Options: body, query
    .filter()
    .sort()
    .limitFields()
    .paginate();
  const product = await features.query;
  if (!product) {
    throw new ErrorWithStatus(404, 'Không tìm thấy sản phẩm!');
  }

  res.status(200).json({ data: { product }, count: product.countDocuments });
});
