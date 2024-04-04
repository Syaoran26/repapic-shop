import Order from '../models/Order.js';
import asyncHandler from 'express-async-handler';
import { createError } from '../../utils/error.js';

export const createOrder = asyncHandler(async (req, res) => {
  const newOrder = new Order(req.body);
  try {
    const order = await newOrder.save();
    res.status(201).json(order);
  } catch (error) {
    throw error;
  }
});

export const updateOrder = asyncHandler(async (req, res) => {
  try {
    const order = await Order.findOneAndUpdate({ _id: req.params.id }, { $set: req.body }, { new: true });
    if (!order) {
      throw createError(404, 'Không tìm thấy Order!');
    }
    res.status(200).json(order);
  } catch (error) {
    throw error;
  }
});

export const deleteOrder = asyncHandler(async (req, res) => {
  try {
    const order = await Order.findOneAndDelete({ _id: req.params.id });
    if (!order) {
      throw createError(404, 'Không tìm thấy Order!');
    }
    res.status(200).json(order);
  } catch (error) {
    throw error;
  }
});

export const getOrder = asyncHandler(async (req, res) => {
  try {
    const order = await Order.findOne({ _id: req.params.id });
    if (!order) {
      throw createError(404, 'Không tìm thấy Order!');
    }
    res.status(200).json(order);
  } catch (error) {
    throw error;
  }
});

export const getOrders = asyncHandler(async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).json(orders);
  } catch (error) {
    throw error;
  }
});
