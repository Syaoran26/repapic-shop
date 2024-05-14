import { Schema, model } from 'mongoose';
import { Product } from './Product.js';

const Order = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
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
      name: {
        type: String,
        required: true,
      },
      address: {
        type: String,
        required: true,
      },
      phone: {
        type: String,
        required: true,
      },
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

export default model('Order', Order);
