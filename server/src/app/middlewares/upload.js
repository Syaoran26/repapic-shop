import multer from 'multer';

const imageFileFilter = function (req, file, cb) {
  if (!file.originalname.match(/\.(jpg|jpeg|png|ico)$/)) {
    return cb(new Error('Chỉ chấp nhận các tệp tin hình ảnh: JPG, JPEG, PNG, ICO!'), false);
  }
  cb(null, true);
};

export const upload = multer({ fileFilter: imageFileFilter });
