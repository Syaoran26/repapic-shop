import asyncHandler from 'express-async-handler';
import { ErrorWithStatus } from '../../utils/error.js';
import Order from '../models/Order.js';
import User from '../models/User.js';

export const numProduct = asyncHandler(async (req, res) => {
  if (!req.user.isAdmin) {
    req.query.user = req.user.id;
  }
  const orderCount = await Order.countDocuments();
  if (orderCount === null) {
    throw new ErrorWithStatus(404, 'Không tìm thấy orders!');
  }
  const orders = await Order.find().populate('user').populate('items.product');
  const totalQuantity = orders.reduce((sum, order) => {
    return sum + order.items.reduce((orderSum, item) => orderSum + item.quantity, 0);
  }, 0);

  res.status(200).json(totalQuantity);
});

export const income = asyncHandler(async (req, res) => {
  if (!req.user.isAdmin) {
    req.query.user = req.user.id;
  }
  const orders = await Order.find().populate('items.product');

  const income = orders.reduce((total, order) => {
    const orderTotalPrice = order.items.reduce((sum, item) => sum + item.quantity * item.product.price, 0);
    return total + orderTotalPrice;
  }, 0);

  res.status(200).json(income);
});

export const numUser = asyncHandler(async (req, res) => {
  if (!req.user.isAdmin) {
    req.query.user = req.user.id;
  }
  const totalUser = await User.countDocuments();
  if (totalUser === null) {
    throw new ErrorWithStatus(404, 'Không tìm thấy user!');
  }
  res.status(200).json(totalUser);
});

export const incomeByMonth = asyncHandler(async (req, res) => {
  if (!req.user.isAdmin) {
    req.query.user = req.user.id;
  }
  try {
    const now = new Date();
    const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

    const dailyIncome = await Order.aggregate([
      {
        $match: {
          createdAt: { $gte: firstDayOfMonth },
        },
      },
      {
        $unwind: '$items',
      },
      {
        $lookup: {
          from: 'products',
          localField: 'items.product',
          foreignField: '_id',
          as: 'productInfo',
        },
      },
      {
        $unwind: '$productInfo',
      },
      {
        $group: {
          _id: {
            year: { $year: '$createdAt' },
            month: { $month: '$createdAt' },
            day: { $dayOfMonth: '$createdAt' },
          },
          totalDailyIncome: {
            $sum: { $multiply: ['$items.quantity', '$productInfo.price'] },
          },
        },
      },
      {
        $sort: { '_id.year': 1, '_id.month': 1, '_id.day': 1 },
      },
    ]);

    const daysInMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();

    const incomeArray = Array.from({ length: daysInMonth }, (_, i) => ({
      day: i + 1,
      totalDailyIncome: 0,
    }));

    dailyIncome.forEach(({ _id, totalDailyIncome }) => {
      const day = _id.day;
      incomeArray[day - 1].totalDailyIncome = totalDailyIncome;
    });

    res.status(200).json(incomeArray);
  } catch (error) {
    console.error('Error generating daily income report:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});
