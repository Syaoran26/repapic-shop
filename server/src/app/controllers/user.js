import User from '../models/User.js';
import asyncHandler from 'express-async-handler';
import { ErrorWithStatus } from '../../utils/error.js';
import { getAddress } from '../../utils/address.js';

export const createUser = asyncHandler(async (req, res) => {
  const { mimetype, buffer } = req.file;

  const avatar = `data:${mimetype};base64${buffer.toString('base64')}`;
  const newUser = new User({ ...req.body, avatar: avatar });
  const user = await newUser.save();
  res.status(201).json(user);
});

export const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findOneAndUpdate({ _id: req.params.id }, { $set: req.body }, { new: true });
  if (!user) {
    throw new ErrorWithStatus(404, 'Không tìm thấy User!');
  }
  res.status(200).json(user);
});

export const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findOneAndDelete({ _id: req.params.id });
  if (!user) {
    throw new ErrorWithStatus(404, 'Không tìm thấy User!');
  }
  res.status(200).json(user);
});

export const getUser = asyncHandler(async (req, res) => {
  const user = await User.findOne({ _id: req.params.id });
  if (!user) {
    throw new ErrorWithStatus(404, 'Không tìm thấy User!');
  }
  const { password, isAdmin, refreshToken, cart, wishlist, deliveryAddress, ...others } = user._doc;
  others.address = getAddress(others.address);
  res.status(200).json(others);
});

export const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find();
  const sanitizedUsers = users.map((user) => {
    // Tạo một bản sao của đối tượng người dùng và loại bỏ thông tin nhạy cảm
    const { password, isAdmin, refreshToken, cart, wishlist, deliveryAddress, ...others } = user._doc;
    others.address = getAddress(others.address);
    return others;
  });

  res.status(200).json(sanitizedUsers);
});
