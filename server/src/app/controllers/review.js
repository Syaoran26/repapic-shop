import Review from '../models/Review.js';
import asyncHandler from 'express-async-handler';

export const writeReview = asyncHandler(async (req, res) => {
  const newReview = new Review(req.body);

  const review = await newReview.save();
  res.status(201).json(review);
});

export const editReview = asyncHandler(async (req, res) => {
  const review = await Review.save();
  res.status(201).json(review);
});
