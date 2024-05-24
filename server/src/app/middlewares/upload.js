import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinary from '../../config/cloudinary.js';

// const imageFileFilter = function (req, file, cb) {
//   if (!file.originalname.match(/\.(jpg|jpeg|png|ico)$/)) {
//     return cb(new Error('Chỉ chấp nhận các tệp tin hình ảnh: JPG, JPEG, PNG, ICO!'), false);
//   }
//   cb(null, true);
// };

export const upload = (folder = '/images', accept = ['jpg', 'jpeg', 'png']) => {
  const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: 'repapic' + folder,
      allowedFormats: accept,
    },
  });

  return multer({ storage });
};
