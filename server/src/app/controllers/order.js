import Order from '../models/Order.js';
import asyncHandler from 'express-async-handler';
import { ErrorWithStatus } from '../../utils/error.js';

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
        return { product: product._id, quantity: item.quantity };
      })
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

export const updateOrderStatus =asyncHandler( async (req, res) => {
  const { orderId } = req.params;
  const { status } = req.body;

  const validStatuses = ['pending', 'delivering', 'completed', 'cancelled', 'refunded'];
  if (!validStatuses.includes(status)) {
    throw new ErrorWithStatus(`Mã trạng thái không hợp lệ`)
  }

    const order = await Order.findById(orderId);
    if (!order) {
      throw new ErrorWithStatus(`Không tìm thấy Đơn hàng`)
    }

    order.status = status;
    const updatedOrder = await order.save();
    res.status(200).json(updatedOrder);
  })

  export const cancelOrder = asyncHandler( async (req, res) => {
    const { orderId } = req.params;
  
  
      const order = await Order.findById(orderId);
      if (!order) {
        throw new ErrorWithStatus(`Không tìm thấy Đơn hàng`)
      }
  
      if (order.status === 'cancelled') {
        throw new ErrorWithStatus(`Đơn hàng đã được hủy trước đó`)
      }
  
      order.status = 'cancelled';
      const updatedOrder = await order.save();
      res.status(200).json(updatedOrder);
    } )

export const deleteOrderByAdmin = asyncHandler( async (req, res) => {
      const { orderId } = req.params;
    

        const order = await Order.findById(orderId);
        if (!order) {
          throw new ErrorWithStatus(`Không tìm thấy Đơn hàng`)
        }
    
        await order.remove();
        res.status(200).json(order)
      } )

export const getAllOrder = asyncHandler(async (req,res) =>{
  const features = new APIFeatures(Order, req.query).search('title').filter().sort().limitFields().paginate();

  const [order, total] = await Promise.all([features.query.populate('items'), features.total]);
  res.status(200).json({ order, total });

})

export const getOrderById =asyncHandler( async (req, res) => {
  const { orderId } = req.params;

    const order = await Order.findById(orderId).populate('user', 'name email').populate('items.product', 'title price');
    if (!order) {
      throw new ErrorWithStatus(`Không tìm thấy Đơn hàng`)
    }

    res.status(200).json(order);
  })

  export const getUserOrders =asyncHandler( async (req, res) => {
    
      const orders = await Order.find({ user: req.user._id }).populate('items.product', 'title price');
      res.status(200).json(orders);
    })

export const getUserOrderById = asyncHandler( async (req, res) => {
     const { orderId } = req.params;
    

        const order = await Order.findById(orderId).populate('items.product', 'title price');
        if (!order) {
          throw new ErrorWithStatus(`Không tìm thấy Đơn hàng`)
        }
    
        res.status(200).json(order);
      }
    );



