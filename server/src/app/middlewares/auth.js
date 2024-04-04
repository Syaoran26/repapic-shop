import jwt from 'jsonwebtoken';
import { createError } from '../../utils/error.js';

export const verifyToken = (req, res, next) => {
  const token = req.header('Authorization')?.startsWith('Bearer') && req.header('Authorization').split(' ')[1];

  if (!token) {
    return next(createError(401, 'Vui lòng đăng nhập để thực hiện hành động!'));
  }

  jwt.verify(token, process.env.ACCESS_TOKEN, (err, user) => {
    if (err) return next(createError(401, 'Token đã hết hạn'));
    req.user = user;
    next();
  });
};

export const verifyUser = (req, res, next) => {
  verifyToken(req, res, next, () => {
    if (req.user.id === req.params.userId || req.user.isAdmin) {
      next();
    } else {
      return next(createError(403, 'Bạn không được phân quyền thực thi!'));
    }
  });
};

export const verifyAdmin = (req, res, next) => {
  verifyToken(req, res, next, () => {
    if (req.user.isAdmin) {
      next();
    } else {
      return next(createError(403, 'Bạn không được phân quyền thực thi!'));
    }
  });
};
