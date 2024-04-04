import { Schema, model, plugin } from 'mongoose';
import slug from 'mongoose-slug-updater';

const Product = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      slug: 'title',
      unique: true,
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
      required: true,
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

export default model('Product', Product);
