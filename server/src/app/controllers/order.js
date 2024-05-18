import Order from '../models/Order.js';
import asyncHandler from 'express-async-handler';
import { ErrorWithStatus } from '../../utils/error.js';
import PayOS from '@payos/node';
import Product from '../models/Product.js';
import APIFeatures from '../../utils/APIFeatures.js';

export const checkout = asyncHandler(async (req, res) => {
  const { items } = req.body;
  const populatedItems = await Promise.all(
    items.map(async (item) => {
      const product = await Product.findById(item.product);
      if (!product) {
        throw new ErrorWithStatus(`Không tìm thấy sản phẩm`, 404);
      }

      if (product.stock < item.quantity) {
        throw new ErrorWithStatus(`Không đủ số lượng sản phẩm trong kho`, 400);
      }

      product.stock -= item.quantity;
      await product.save({ validateBeforeSave: false });

      return { product: product, quantity: item.quantity };
    }),
  );

  const order = new Order({
    ...req.body,
    user: req.user.id,
    items: populatedItems,
  });
  await order.save();

  res.status(201).json(order);
});

export const updateOrderStatus = asyncHandler(async (req, res) => {
  const { status } = req.body;
  const statusEnum = ['pending', 'delivering', 'completed', 'cancelled', 'refunded'];

  if (!statusEnum.includes(status)) {
    throw new ErrorWithStatus(404, 'Trạng thái không hợp lệ');
  }

  const order = await Order.findByIdAndUpdate(req.params.id, { $set: { status } }, { new: true });
  if (!order) {
    throw new ErrorWithStatus(404, 'Không tìm thấy đơn hàng!');
  }
  res.status(200).json(order);
});

export const deleteOrder = asyncHandler(async (req, res) => {
  const order = await Order.findByIdAndDelete(req.params.id);
  if (!order) {
    throw new ErrorWithStatus(404, 'Không tìm thấy đơn hàng');
  }
  res.status(200).json(order);
});

export const getOrder = asyncHandler(async (req, res) => {
  let order = null;
  if (req.user.isAdmin) {
    order = await Order.findById(req.params.id);
  } else {
    order = await Order.findOne({ _id: req.params.id, user: req.user.id });
  }

  if (!order) {
    throw new ErrorWithStatus(404, 'Không tìm thấy đơn hàng');
  }
  res.status(200).json(order);
});

export const getOrders = asyncHandler(async (req, res) => {
  if (!req.user.isAdmin) {
    req.query.user = req.user.id;
  }
  const features = new APIFeatures(Order, req.query).filter().sort().limitFields().paginate();
  const [orders, total] = await Promise.all([features.query, features.total]);
  res.status(200).json({ orders, total });
});

export const cancelOrder = asyncHandler(async (req, res) => {
  const order = await Order.findOneAndUpdate(
    { _id: req.params.id, user: req.user.id },
    { $set: { status: 'cancelled' } },
    { new: true },
  );

  if (!order) {
    throw new ErrorWithStatus(404, 'Không tìm thấy đơn hàng');
  }
  res.status(200).json(order);
});

export const createPaymentLink = asyncHandler(async (req, res) => {
  const payOS = new PayOS(process.env.PAYOS_CLIENT_ID, process.env.PAYOS_API_KEY, process.env.PAYOS_CHECKSUM_KEY);
  // TODO: Get order id
  const order = {
    amount: 10000,
    description: 'Test QR',
    orderCode: 999999999999996,
    returnUrl: `${process.env.WEBSITE}`,
    cancelUrl: `${process.env.WEBSITE}/gio-hang`,
  };
  const paymentLink = await payOS.createPaymentLink(order);
  res.json(paymentLink);
});
