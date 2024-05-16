import { Schema, model } from 'mongoose';

const District = new Schema({
  name: String,
  slug: String,
  type: String,
  name_with_type: String,
  path: String,
  path_with_type: String,
  code: String,
  parent_code: String,
});

export default model('District', District);
