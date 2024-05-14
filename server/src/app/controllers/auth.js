import User from '../models/User.js';
import asyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken';
import { ErrorWithStatus } from '../../utils/error.js';
import { generateAccessToken, generateRefreshToken } from '../../utils/token.js';
import { generateOTP, sendOTP } from '../../utils/otp.js';

export const register = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (user) throw new ErrorWithStatus(409, 'Email đã được đăng ký!');

  const otp = generateOTP();
  await User.create({
    ...req.body,
    otpVerify: { otp: otp, createdAt: Date.now(), expiredAt: Date.now() + 240000 },
  });
  sendOTP(email, otp);
  res.status(201).json({
    message: 'OTP đã được gửi đến email của bạn.',
  });
});

export const verify = asyncHandler(async (req, res) => {
  const { email, otp } = req.body;
  let user = await User.findOne({ email: email });

  if (!user || !user.otpVerify) {
    throw new ErrorWithStatus(400, 'Không tìm thấy thông tin OTP cho người dùng.');
  }
  if (user.otpVerify.expiredAt < Date.now()) {
    await User.findOneAndUpdate({ email: email }, { $set: { otpVerify: null } }, { new: true });
    throw new ErrorWithStatus(400, 'OTP đã hết hạn. Vui lòng kích hoạt lại!');
  }
  if (otp !== user.otpVerify.otp) {
    throw new ErrorWithStatus(400, 'OTP không hợp lệ.');
  }

  user = await User.findByIdAndUpdate(user._id, { isVerified: true, otpVerify: null }, { new: true });

  res.status(200).json({
    message: 'Xác thực thành công.',
  });
});

export const googleAuth = asyncHandler(async (req, res) => {
  const { email, providerId } = req.body;
  let user = await User.findOne({ email });
  if (user && user.providerId !== providerId) {
    throw new ErrorWithStatus(400, 'Email đã được đăng ký bằng một phương thức khác');
  }
  if (!user) user = await User.create(req.body);

  const accessToken = generateAccessToken({ id: user._id, isAdmin: user.isAdmin });
  const newRefreshToken = generateRefreshToken({ id: user._id, isAdmin: user.isAdmin });
  user = await User.findByIdAndUpdate(user._id, { ...req.body, refreshToken: newRefreshToken }, { new: true }).select([
    '-otpVerify',
    '-refreshToken',
    '-isAdmin',
    '-password',
    '-cart',
    '-wishlist',
    '-deliveryAddress',
  ]);
  res
    .status(200)
    .cookie('refreshToken', newRefreshToken, {
      httpOnly: true,
      signed: true,
      sameSite: 'none',
      secure: true,
      path: '/api/auth',
    })
    .json({ ...user, token: accessToken });
});

export const login = asyncHandler(async (req, res) => {
  let user = await User.findOne({ email: req.body.email });
  if (!user) {
    throw new ErrorWithStatus(400, 'Email chưa được đăng ký!');
  }
  if (!(await user.isPasswordMatched(req.body.password))) {
    throw new ErrorWithStatus(400, 'Mật khẩu không đúng!');
  }
  if (!user.isVerified) {
    throw new ErrorWithStatus(401, 'Tài khoản chưa được xác thực.');
  }

  const accessToken = generateAccessToken({ id: user._id, isAdmin: user.isAdmin });
  const newRefreshToken = generateRefreshToken({ id: user._id, isAdmin: user.isAdmin });
  user = await User.findByIdAndUpdate(user._id, { refreshToken: newRefreshToken }, { new: true }).select([
    '-otpVerify',
    '-refreshToken',
    '-isAdmin',
    '-password',
    '-cart',
    '-wishlist',
    '-deliveryAddress',
  ]);
  res
    .status(200)
    .cookie('refreshToken', newRefreshToken, {
      httpOnly: true,
      signed: true,
      sameSite: 'none',
      secure: true,
      path: '/api/auth',
    })
    .json({ ...user._doc, token: accessToken });
});

export const refreshToken = asyncHandler(async (req, res, next) => {
  const refreshToken = req.signedCookies.refreshToken;
  if (!refreshToken) throw new ErrorWithStatus(400, 'Không có refresh token!');

  const user = await User.findOne({ refreshToken });
  if (!user) throw new ErrorWithStatus(404, 'Không tồn tài người dùng!');

  jwt.verify(refreshToken, process.env.REFRESH_TOKEN, async (err, decoded) => {
    // eslint-disable-next-line eqeqeq
    if (err || user._id != decoded.id) return next(new ErrorWithStatus(400, 'Đã có lỗi với refresh token'));
    const token = generateAccessToken({ id: decoded.id, isAdmin: decoded.isAdmin });
    const newRefreshToken = generateRefreshToken({ id: decoded.id, isAdmin: decoded.isAdmin });
    await User.findByIdAndUpdate(decoded.id, { refreshToken: newRefreshToken });
    res
      .cookie('refreshToken', newRefreshToken, {
        httpOnly: true,
        signed: true,
        sameSite: 'none',
        secure: true,
        path: '/api/auth',
      })
      .json({ token });
  });
});

export const logout = asyncHandler(async (req, res) => {
  const refreshToken = req.signedCookies.refreshToken;
  await User.findOneAndUpdate(
    { refreshToken },
    {
      refreshToken: '',
    },
  );
  res
    .clearCookie('refreshToken', {
      httpOnly: true,
      signed: true,
      sameSite: 'none',
      secure: true,
      path: '/api/auth',
    })
    .sendStatus(204);
});

export const resendOTP = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) throw new ErrorWithStatus(404, 'Không tồn tài người dùng!');
  const otp = generateOTP();
  await User.findByIdAndUpdate(user._id, {
    $set: { otpVerify: { otp: otp, createdAt: Date.now(), expiredAt: Date.now() + 240000 } },
  });
  sendOTP(email, otp);
  res.status(200).json({
    message: 'OTP đã được gửi đến email của bạn!',
  });
});

export const resetPassword = asyncHandler(async (req, res) => {
  const { email, otp, password } = req.body;
  const user = await User.findOne({ email: email });
  if (!user || !user.otpVerify) {
    throw new ErrorWithStatus(400, 'Không tìm thấy thông tin OTP cho người dùng.');
  }
  if (user.otpVerify.expiredAt < Date.now()) {
    await User.findOneAndUpdate({ email: email }, { $set: { otpVerify: null } });
    throw new ErrorWithStatus(400, 'OTP đã hết hạn. Vui lòng kích hoạt lại!');
  }
  if (otp !== user.otpVerify.otp) {
    throw new ErrorWithStatus(400, 'OTP không hợp lệ.');
  }
  await User.findByIdAndUpdate(user._id, { $set: { password, otpVerify: null } });
  res.status(200).json({
    message: 'Mật khẩu đã được đổi thành công.',
  });
});

export const loginByRefreshToken = asyncHandler(async (req, res, next) => {
  const refreshToken = req.signedCookies.refreshToken;
  if (!refreshToken) throw new ErrorWithStatus(400, 'Không có refresh token!');

  const user = await User.findOne({ refreshToken });
  if (!user) throw new ErrorWithStatus(404, 'Không tồn tài người dùng!');

  jwt.verify(refreshToken, process.env.REFRESH_TOKEN, async (err, decoded) => {
    // eslint-disable-next-line eqeqeq
    if (err || user._id != decoded.id) return next(new ErrorWithStatus(400, 'Đã có lỗi với refresh token'));
    const token = generateAccessToken({ id: decoded.id, isAdmin: decoded.isAdmin });
    const newRefreshToken = generateRefreshToken({ id: decoded.id, isAdmin: decoded.isAdmin });
    const updatedUser = await User.findByIdAndUpdate(decoded.id, { refreshToken: newRefreshToken }).select([
      '-otpVerify',
      '-refreshToken',
      '-isAdmin',
      '-password',
      '-cart',
      '-wishlist',
      '-deliveryAddress',
    ]);
    res
      .cookie('refreshToken', newRefreshToken, {
        httpOnly: true,
        signed: true,
        sameSite: 'none',
        secure: true,
        path: '/api/auth',
      })
      .json({ ...updatedUser._doc, token });
  });
});
