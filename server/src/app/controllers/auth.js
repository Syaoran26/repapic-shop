import User from '../models/User.js';
import asyncHandler from 'express-async-handler';
import { createError } from '../../utils/error.js';
import { generateAccessToken, generateRefreshToken } from '../../utils/token.js';
import jwt from 'jsonwebtoken';

export const register = asyncHandler(async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (user) {
    throw createError(409, 'Email đã được đăng ký!');
  }

  const newUser = await User.create(req.body);
  res.status(201).json(newUser);
});

export const googleAuth = asyncHandler(async (req, res) => {
  try {
    let user = await User.findOne({ email: req.body.email });
    if (user && user.providerId !== req.body.providerId) {
      throw createError(400, 'Email đã được đăng ký bằng một phương thức khác');
    }
    if (!user) {
      user = await User.create(req.body);
    }

    const accessToken = generateAccessToken({ id: user._id, isAdmin: user.isAdmin });
    const newRefreshToken = generateRefreshToken({ id: user._id, isAdmin: user.isAdmin });
    await User.findByIdAndUpdate(user._id, { ...req.body, refreshToken: newRefreshToken }, { new: true });
    const { password, isAdmin, refreshToken, cart, wishlist, deliveryAddress, ...others } = user._doc;
    res
      .status(200)
      .cookie('refreshToken', newRefreshToken, { httpOnly: true, signed: true })
      .json({ ...others, token: accessToken });
  } catch (error) {
    throw error;
  }
});

export const login = asyncHandler(async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    throw createError(401, 'Email chưa được đăng ký!');
  }
  if (!(await user.isPasswordMatched(req.body.password))) {
    throw createError(400, 'Mật khẩu không đúng!');
  }

  const accessToken = generateAccessToken({ id: user._id, isAdmin: user.isAdmin });
  const newRefreshToken = generateRefreshToken({ id: user._id, isAdmin: user.isAdmin });
  await User.findByIdAndUpdate(user._id, { refreshToken: newRefreshToken }, { new: true });
  const { password, isAdmin, refreshToken, cart, wishlist, deliveryAddress, ...others } = user._doc;
  res
    .status(200)
    .cookie('refreshToken', newRefreshToken, { httpOnly: true, signed: true })
    .json({ ...others, token: accessToken });
});

export const refreshToken = asyncHandler(async (req, res) => {
  const refreshToken = req.signedCookies.refreshToken;
  if (!refreshToken) throw createError(400, 'Không có refresh token!');

  const user = await User.findOne({ refreshToken });
  if (!user) throw createError(404, 'Không tồn tài người dùng!');

  jwt.verify(refreshToken, process.env.REFRESH_TOKEN, (err, decoded) => {
    if (err || user._id != decoded.id) throw createError(400, 'Đã có lỗi với refresh token');
    const token = generateAccessToken({ id: decoded.id, isAdmin: decoded.isAdmin });
    res.json({ token });
  });
});

export const logout = asyncHandler(async (req, res) => {
  const refreshToken = req.signedCookies.refreshToken;
  if (!refreshToken) throw createError(404, 'Không có refresh token!');
  await User.findOneAndUpdate(
    { refreshToken },
    {
      refreshToken: '',
    },
  );
  res
    .clearCookie('refreshToken', {
      httpOnly: true,
      secure: true,
    })
    .sendStatus(204);
});
