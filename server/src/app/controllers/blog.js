import Blog from '../models/Blog.js';
import asyncHandler from 'express-async-handler';
import { ErrorWithStatus } from '../../utils/error.js';

export const createBlog = asyncHandler(async (req, res) => {
  const newBlog = new Blog(req.body);
  const blog = await newBlog.save();
  res.status(201).json(blog);
});

export const updateBlog = asyncHandler(async (req, res) => {
  const blog = await Blog.findOneAndUpdate({ slug: req.params.slug }, { $set: req.body }, { new: true });
  if (!blog) {
    throw new ErrorWithStatus(404, 'Không tìm thấy blog!');
  }
  res.status(200).json(blog);
});

export const deleteBlog = asyncHandler(async (req, res) => {
  const blog = await Blog.findOneAndDelete({ slug: req.params.slug });
  if (!blog) {
    throw new ErrorWithStatus(404, 'Không tìm thấy blog!');
  }
  res.status(200).json(blog);
});

export const getBlog = asyncHandler(async (req, res) => {
  const blog = await Blog.findOne({ slug: req.params.slug });
  if (!blog) {
    throw new ErrorWithStatus(404, 'Không tìm thấy blog!');
  }
  res.status(200).json(blog);
});

export const getBlogs = asyncHandler(async (req, res) => {
  const blog = await Blog.find();
  res.status(200).json(blog);
});
