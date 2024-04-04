import Category from '../models/Category.js';
import asyncHandler from 'express-async-handler';
import { createError } from '../../utils/error.js';
import Product from '../models/Product.js';

export const createCategory = asyncHandler(async (req, res) => {
  const newCategory = new Category(req.body);
  try {
    const category = await newCategory.save();
    res.status(201).json(category);
  } catch (error) {
    throw error;
  }
});

export const updateCategory = asyncHandler(async (req, res) => {
  try {
    const category = await Category.findOneAndUpdate({ slug: req.params.slug }, { $set: req.body }, { new: true });
    if (!category) {
      throw createError(404, 'Không tìm thấy thể loại sản phẩm!');
    }
    res.status(200).json(category);
  } catch (error) {
    throw error;
  }
});

export const deleteCategory = asyncHandler(async (req, res) => {
  try {
    const category = await Category.findOneAndDelete({ slug: req.params.slug });
    if (!category) {
      throw createError(404, 'Không tìm thấy thể loại sản phẩm!');
    }
    await Product.updateMany({ category: category }, { $unset: { category: null } });
    res.status(200).json(category);
  } catch (error) {
    throw error;
  }
});

export const getCategory = asyncHandler(async (req, res) => {
  try {
    const category = await Category.findOne({ slug: req.params.slug });
    if (!category) {
      throw createError(404, 'Không tìm thấy thể loại sản phẩm!');
    }
    res.status(200).json(category);
  } catch (error) {
    throw error;
  }
});

export const getCategories = asyncHandler(async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (error) {
    throw error;
  }
});
