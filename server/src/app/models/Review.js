import { Schema, model } from 'mongoose';

const Review = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
      required: true,
    },
    comment: String,
    reply: String,
  },
  { timestamps: true },
);

export default model('Review', Review);
