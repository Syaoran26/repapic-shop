import User from '../models/User.js';
import asyncHandler from 'express-async-handler';
import { ErrorWithStatus } from '../../utils/error.js';
import { getAddress } from '../../utils/address.js';
import Product from '../models/Product.js';

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

export const getWishList = asyncHandler(async (req, res) => {
  const userId = req.user.id
  let userWishList = await User.findById(userId).select("wishlist").populate('wishlist')

  res.status(200).json(userWishList.wishlist)
  
});

export const addProductToWishList = asyncHandler(async (req,res)=>{
  const userId = req.user.id
  const productId = req.params.productId;
  
  const product = await Product.findById(productId);

  if (!product) {
    throw new ErrorWithStatus(404, 'Không tìm thấy sản phẩm!');
  }

  const user = await User.findById(userId).select('wishlist').populate("wishlist")
  
  const existedProduct = user.wishlist.find(item => item.equals(productId))

  if(existedProduct){
    throw new ErrorWithStatus(404, 'Đã tồn tại sản phẩm!');
  }

  
  const newWishList =await User.findByIdAndUpdate(userId, { $push: { wishlist: product._id } }, { new: true }).select("wishlist").populate("wishlist")

    res.status(200).json(newWishList)
})

export const deleteProductToWishList = asyncHandler(async(req, res)=>{
  
  const userId = req.user.id

  const productId = req.params.productId
  const product = await Product.findById(productId);
  
  if(!product){
    throw new ErrorWithStatus('Không tìm thấy sản phẩm!')
  }

  await User.findByIdAndUpdate(userId, { $pull: { wishlist: product._id } }, { new: true })
  
  res.status(200).json({status:"Deleted Success"})

})