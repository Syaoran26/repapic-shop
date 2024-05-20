import { Schema, model, plugin } from 'mongoose';
import slug from 'mongoose-slug-updater';
import Review from './Review.js';

export const Product = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      slug: 'title',
    },
    thumbnail: {
      type: String,
      required: true,
    },
    images: {
      type: [String],
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: 'Category',
    },
    price: {
      type: Number,
      min: 0,
      required: true,
    },
    stock: {
      type: Number,
      default: 0,
    },
    discount: {
      type: Number,
      min: 0,
      max: 100,
    },
    rating: {
      type: Number,
      default: 0,
    },
    reviews: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Review',
        required: true,
      },
    ],
  },
  { timestamps: true },
);

//Add plugin
plugin(slug);

Product.pre('save', async (next) => {
  if (this.isModified('reviews')) {
    const reviews = await Review.find({ product: this._id });
    if (reviews.length > 0) {
      const ratingSum = reviews.reduce((sum, review) => sum + review.rating, 0);
      this.rating = ratingSum / reviews.length;
    } else {
      this.rating = 0;
    }
  }
  next();
});

export default model('Product', Product);
