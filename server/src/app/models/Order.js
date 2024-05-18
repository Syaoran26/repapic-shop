import mongoose from 'mongoose';
import AutoIncrementFactory from 'mongoose-sequence';
import { Product } from './Product.js';
import { DeliveryInfo } from './DeliveryInfo.js';

const AutoIncrement = AutoIncrementFactory(mongoose);

const Order = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    status: {
      type: String,
      enum: ['pending', 'delivering', 'completed', 'cancelled', 'refunded'],
      default: 'pending',
    },
    paid: {
      type: Boolean,
      default: false,
    },
    deliveryInfo: {
      type: DeliveryInfo,
    },
    deliveryPrice: {
      type: Number,
      required: true,
    },
    discount: {
      type: Number,
    },
    items: [
      {
        product: {
          type: Product,
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
      },
    ],
  },
  { timestamps: true },
);

Order.plugin(AutoIncrement, { inc_field: 'orderCode' });

export default mongoose.model('Order', Order);
