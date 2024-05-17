import Order from '../models/Order.js';
import asyncHandler from 'express-async-handler';
import { ErrorWithStatus } from '../../utils/error.js';
import Product from '../models/Product.js';

export const createOrder = asyncHandler(async (req, res) => {
  const newOrder = new Order(req.body);
  const order = await newOrder.save();
  res.status(201).json(order);
});

export const updateOrder = asyncHandler(async (req, res) => {
  const order = await Order.findOneAndUpdate({ _id: req.params.id }, { $set: req.body }, { new: true });
  if (!order) {
    throw new ErrorWithStatus(404, 'Không tìm thấy Order!');
  }
  res.status(200).json(order);
});

export const deleteOrder = asyncHandler(async (req, res) => {
  const order = await Order.findOneAndDelete({ _id: req.params.id });
  if (!order) {
    throw new ErrorWithStatus(404, 'Không tìm thấy Order!');
  }
  res.status(200).json(order);
});

export const getOrder = asyncHandler(async (req, res) => {
  const order = await Order.findOne({ _id: req.params.id });
  if (!order) {
    throw new ErrorWithStatus(404, 'Không tìm thấy Order!');
  }
  res.status(200).json(order);
});

export const getOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find();
  res.status(200).json(orders);
});

export const checkOutOrder = asyncHandler(async (req, res) => {
  const { user, status, paid, deliveryInfo, deliveryPrice, discount, items } = req.body;

  const populatedItems = await Promise.all(
    items.map(async (item) => {
      const product = await Product.findById(item.product);
      if (!product) {
        throw new ErrorWithStatus(`Không tìm thấy sản phẩm`);
      }

      if (product.stock < item.quantity) {
        throw new ErrorWithStatus(`Không đủ số lượng sản phẩm trong kho`);
      }

      const updatedProduct = await Product.findByIdAndUpdate(
        item.product,
        { $inc: { stock: -item.quantity } },
        { new: true, runValidators: true },
      );

      if (!updatedProduct) {
        throw new ErrorWithStatus(`Cập nhật số lượng sản phẩm thất bại`);
      }

      return { product: product._id, quantity: item.quantity };
    }),
  );

  const newOrder = new Order({
    user,
    status,
    paid,
    deliveryInfo,
    deliveryPrice,
    discount,
    items: populatedItems,
  });

  const savedOrder = await newOrder.save();

  res.status(201).json(savedOrder);
});

export const updateOrderStatus = asyncHandler(async (req, res) => {
  const { orderId } = req.params;
  const { status } = req.body;

  const validStatuses = ['pending', 'delivering', 'completed', 'cancelled', 'refunded'];
  if (!validStatuses.includes(status)) {
    throw new ErrorWithStatus(`Mã trạng thái không hợp lệ`);
  }

  const updatedOrder = await Order.findByIdAndUpdate(orderId, { status }, { new: true, runValidators: true });

  if (!updatedOrder) {
    throw new ErrorWithStatus(`Không tìm thấy Đơn hàng`);
  }

  res.status(200).json(updatedOrder);
});

export const cancelOrder = asyncHandler(async (req, res) => {
  const { orderId } = req.params;

  const order = await Order.findById(orderId);
  if (!order) {
    throw new ErrorWithStatus(`Không tìm thấy Đơn hàng`);
  }

  if (order.status === 'cancelled') {
    throw new ErrorWithStatus(`Đơn hàng đã được hủy trước đó`);
  }

  await Promise.all(
    order.items.map(async (item) => {
      const product = await Product.findById(item.product);
      if (!product) {
        throw new ErrorWithStatus(`Không tìm thấy sản phẩm`);
      }

      await Product.findByIdAndUpdate(
        item.product,
        { $inc: { stock: item.quantity } },
        { new: true, runValidators: true }
      );
    })
  );

  const updatedOrder = await Order.findByIdAndUpdate(
    orderId,
    { status: 'cancelled' },
    { new: true, runValidators: true },
  );

  res.status(200).json(updatedOrder);
});

export const deleteOrderByAdmin = asyncHandler(async (req, res) => {
  const { orderId } = req.params;

  const deletedOrder = await Order.findByIdAndDelete(orderId);

  if (!deletedOrder) {
    throw new ErrorWithStatus(`Không tìm thấy Đơn hàng`);
  }

  res.status(200).json(deletedOrder);
});

export const getAllOrder = asyncHandler(async (req, res) => {
  const features = new APIFeatures(Order, req.query).search('title').filter().sort().limitFields().paginate();

  const [order, total] = await Promise.all([features.query.populate('items'), features.total]);
  res.status(200).json({ order, total });
});

export const getOrderById = asyncHandler(async (req, res) => {
  const { orderId } = req.params;

  const order = await Order.findById(orderId).populate('user', 'name email').populate('items.product', 'title price');
  if (!order) {
    throw new ErrorWithStatus(`Không tìm thấy Đơn hàng`);
  }

  res.status(200).json(order);
});
