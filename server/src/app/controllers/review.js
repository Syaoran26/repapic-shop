import Review from '../models/Review.js';
import asyncHandler from 'express-async-handler';

export const writeReview = asyncHandler(async (req, res) => {
  const newReview = new Review(req.body);
  try {
    const review = await newReview.save();
    res.status(201).json(review);
  } catch (error) {
    throw error;
  }
});

export const editReview = asyncHandler(async (req, res) => {
  try {
    const review = await newReview.save();
    res.status(201).json(review);
  } catch (error) {
    throw error;
  }
});
