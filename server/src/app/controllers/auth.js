import User from '../models/User.js';
import asyncHandler from 'express-async-handler';
import { ErrorWithStatus } from '../../utils/error.js';
import { generateAccessToken, generateRefreshToken } from '../../utils/token.js';
import jwt from 'jsonwebtoken';
import sendEmail from '../../utils/email.js';
import otpGenerator from 'otp-generator';

export const register = asyncHandler(async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (user) {
    throw new ErrorWithStatus(409, 'Email đã được đăng ký!');
  }

  const newUser = await User.create(req.body);
  res.status(201).json(newUser);
});

export const googleAuth = asyncHandler(async (req, res) => {
  let user = await User.findOne({ email: req.body.email });
  if (user && user.providerId !== req.body.providerId) {
    throw new ErrorWithStatus(400, 'Email đã được đăng ký bằng một phương thức khác');
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
});

export const login = asyncHandler(async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    throw new ErrorWithStatus(401, 'Email chưa được đăng ký!');
  }
  if (!(await user.isPasswordMatched(req.body.password))) {
    throw new ErrorWithStatus(400, 'Mật khẩu không đúng!');
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
  if (!refreshToken) throw new ErrorWithStatus(400, 'Không có refresh token!');

  const user = await User.findOne({ refreshToken });
  if (!user) throw new ErrorWithStatus(404, 'Không tồn tài người dùng!');

  jwt.verify(refreshToken, process.env.REFRESH_TOKEN, (err, decoded) => {
    if (err || user._id !== decoded.id) throw new ErrorWithStatus(400, 'Đã có lỗi với refresh token');
    const token = generateAccessToken({ id: decoded.id, isAdmin: decoded.isAdmin });
    res.json({ token });
  });
});

export const logout = asyncHandler(async (req, res) => {
  const refreshToken = req.signedCookies.refreshToken;
  if (!refreshToken) throw new ErrorWithStatus(404, 'Không có refresh token!');
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

export const forgotPassword = asyncHandler(async (req, res, next) => {
  const email = req.body.email;
  const user = await User.findOne({ email: email });
  if (!user) throw new ErrorWithStatus(404, 'Không tồn tài người dùng!');
  const otp = otpGenerator.generate(6, { upperCase: false, specialChars: false, alphabets: false });
  await User.findOneAndUpdate(
    { email: email },
    { $set: { otpVerify: { otp: otp, createAt: Date.now(), expiresAt: Date.now() + 3600000 } } },
    { new: true },
  );
  try {
    await sendEmail({
      email: email,
      subject: 'Your password reset token (valid for 10min)',
      message: `Mã Xác Nhận: ${otp}`,
    });
  } catch (err) {
    throw new ErrorWithStatus(500, 'Có lỗi khi gửi email. Thử lại Sau!!');
  }
  res.status(200).json({
    status: 'thành công',
    message: 'OTP đã được gửi đến email của bạn!',
  });
});

export const resetPassword = asyncHandler(async (req, res, next) => {
  const { email, otp, newPassword } = req.body;
  try {
    const user = await User.findOne({ email: email });
    if (!user || !user.otpVerify) {
      throw new ErrorWithStatus(400, 'Không tìm thấy thông tin OTP cho người dùng');
    }
    if (user.otpVerify.expiresAt < Date.now()) {
      await User.findOneAndUpdate({ email: email }, { $set: { otpVerify: null } }, { new: true });
      throw new ErrorWithStatus(400, 'OTP đã hết hạn! Vui lòng kích hoạt lại');
    }
    if (otp !== user.otpVerify.OTP) {
      throw new ErrorWithStatus(400, 'OTP không hợp lệ');
    }
    const newUser = await User.findOneAndUpdate({ email: email }, { $set: { password: newPassword } }, { new: true });
    res.status(200).json(newUser);
  } catch (err) {
    throw new ErrorWithStatus(500, 'Có lỗi khi cố thay đổi mật khẩu. Thử lại Sau!!');
  }
});
