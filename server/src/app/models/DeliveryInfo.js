import { Schema, model } from 'mongoose';

export const DeliveryInfo = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    address: {
      type: {
        street: {
          type: String,
          require: true,
        },
        detail: {
          type: String,
          required: true,
        },
        ward: {
          type: String,
        },
        district: {
          type: String,
          required: true,
        },
        city: {
          type: String,
          required: true,
        },
      },
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    isHome: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  },
);

export default model('DeliveryInfo', DeliveryInfo);
