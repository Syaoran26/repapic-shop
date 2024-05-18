import { Schema, model } from 'mongoose';

const City = new Schema({
  name: String,
  slug: String,
  type: String,
  name_with_type: String,
  code: String,
});

export default model('City', City);
