import { Schema, model } from 'mongoose';

const Order = new Schema(
  {
    address: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    status: {
      type: String,
      enum: ['pending', 'delivering', 'completed', 'cancelled', 'refunded'],
      default: 'pending',
    },
    items: [
      {
        title: {
          type: String,
          required: true,
        },
        slug: {
          type: String,
          required: true,
        },
        thumbnail: {
          type: String,
          required: true,
        },
        discount: {
          type: Number,
        },
        price: {
          type: Number,
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
