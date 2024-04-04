import Blog from '../models/Blog.js';
import asyncHandler from 'express-async-handler';
import { createError } from '../../utils/error.js';

export const createBlog = asyncHandler(async (req, res) => {
  const newBlog = new Blog(req.body);
  try {
    const blog = await newBlog.save();
    res.status(201).json(blog);
  } catch (error) {
    throw error;
  }
});

export const updateBlog = asyncHandler(async (req, res) => {
  try {
    const blog = await Blog.findOneAndUpdate({ slug: req.params.slug }, { $set: req.body }, { new: true });
    if (!blog) {
      throw createError(404, 'Không tìm thấy blog!');
    }
    res.status(200).json(blog);
  } catch (error) {
    throw error;
  }
});

export const deleteBlog = asyncHandler(async (req, res) => {
  try {
    const blog = await Blog.findOneAndDelete({ slug: req.params.slug });
    if (!blog) {
      throw createError(404, 'Không tìm thấy blog!');
    }
    res.status(200).json(blog);
  } catch (error) {
    throw error;
  }
});

export const getBlog = asyncHandler(async (req, res) => {
  try {
    const blog = await Blog.findOne({ slug: req.params.slug });
    if (!blog) {
      throw createError(404, 'Không tìm thấy blog!');
    }
    res.status(200).json(blog);
  } catch (error) {
    throw error;
  }
});

export const getBlogs = asyncHandler(async (req, res) => {
  try {
    const blog = await Blog.find();
    res.status(200).json(blog);
  } catch (error) {
    throw error;
  }
});
