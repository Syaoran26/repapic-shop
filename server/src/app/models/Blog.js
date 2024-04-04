import { Schema, model, plugin } from 'mongoose';
import slug from 'mongoose-slug-updater';

const Blog = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      slug: 'title',
      unique: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true },
);

//Add plugin
plugin(slug);

export default model('Blog', Blog);
