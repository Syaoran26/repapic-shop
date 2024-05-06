import User from '../models/User.js';
import asyncHandler from 'express-async-handler';
import { ErrorWithStatus } from '../../utils/error.js';
import { getAddress } from '../../utils/address.js';
import Product from '../models/Product.js';
import jwt from 'jsonwebtoken'
import {promisify} from 'util'
import mongoose from 'mongoose';

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
  let token;
  if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
    token = req.headers.authorization.split(' ')[1];
  }
  const user = await promisify(jwt.verify)(token, process.env.ACCESS_TOKEN);
  let userWishList = await User.findById(user.id).populate('wishlist')
  if(!userWishList.wishlist){
    throw new ErrorWithStatus('Danh sách Wishlist rỗng')
  }
  res.status(200).json(userWishList.wishlist)
  
});

export const addProductToWishList = asyncHandler(async (req,res)=>{
  let token;
  if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
    token = req.headers.authorization.split(' ')[1];
  }
  const user = await promisify(jwt.verify)(token, process.env.ACCESS_TOKEN);
  const productIdList = req.body;
  let validProduct = [];
  let nonValidProduct = [];

  let promises = productIdList.map(async(productId)=>{
    let product = await Product.findById(new mongoose.Types.ObjectId(productId)).populate('category');
    let userWishList = await User.findById(user.id).populate('wishlist');
    let productWishList = userWishList.wishlist.find(item => item._id.toString() === productId);

    if(product && !productWishList){
      validProduct.push(productId)
    }else{
      nonValidProduct.push(productId)
    }
  })

  await Promise.all(promises);
  
  if(validProduct.length === 0){
    throw new ErrorWithStatus(501, 'Product Không tồn tại')
  }
    const updateUser = await User.findByIdAndUpdate(user.id,
      {$push:{wishlist:{$each:validProduct}}},
      {new : true}
    )
    res.status(200).json({
      ProductAddSuccess: updateUser,
      ProductNotFound: nonValidProduct
    })
})

export const deleteProductToWishList = asyncHandler(async(req, res)=>{
  let productIdList = req.body
  
  let token;
  if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
    token = req.headers.authorization.split(' ')[1];
  }
  const user = await promisify(jwt.verify)(token, process.env.ACCESS_TOKEN);
  let userWishList = await User.findById(user.id).populate('wishlist')
  if(!userWishList.wishlist){
    throw new ErrorWithStatus('Danh sách Wishlist rỗng')
  }
  let productWishList = userWishList.wishlist.filter(item => !productIdList.includes(item._id.toString()))
  userWishList.wishlist=[...productWishList]

  userWishList.save()
  
  res.status(200).json({status:"Deleted Success"})

})