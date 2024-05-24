import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.development.local' });

cloudinary.config({
  cloud_name: 'dsp92jmjg',
  api_key: '952647949716529',
  api_secret: process.env.CLOUDINARY_KEY,
});

export default cloudinary;
