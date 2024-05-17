import asyncHandler from 'express-async-handler';
import City from '../models/City.js';
import District from '../models/District.js';
import Ward from '../models/Ward.js';
import APIFeatures from '../../utils/APIFeatures.js';
import DeliveryInfo from '../models/DeliveryInfo.js';
import { getAddress } from '../../utils/address.js';

export const getCities = asyncHandler(async (req, res) => {
  const features = new APIFeatures(City, req.query).filter().sort().limitFields();
  const cities = await features.query;
  res.status(200).json(cities);
});

export const getDistricts = asyncHandler(async (req, res) => {
  const features = new APIFeatures(District, req.query).filter().sort().limitFields();
  const districts = await features.query;
  res.status(200).json(districts);
});

export const getWards = asyncHandler(async (req, res) => {
  const features = new APIFeatures(Ward, req.query).filter().sort().limitFields();
  const wards = await features.query;
  res.status(200).json(wards);
});

export const createDeliveryInfo = asyncHandler(async (req, res) => {
  const { address } = req.body;
  const detail = await getAddress(address.city, address.district, address.ward);
  const data = await DeliveryInfo.create({ ...req.body, user: req.user.id, address: { ...address, detail: detail } });
  res.status(200).json(data);
});

export const updateDeliveryInfo = asyncHandler(async (req, res) => {
  const { address } = req.body;
  const detail = await getAddress(address.city, address.district, address.ward);
  const data = await DeliveryInfo.findOneAndUpdate(
    { _id: req.params.id, user: req.user.id },
    { ...req.body, address: { ...address, detail: detail } },
    { new: true },
  );
  res.status(200).json(data);
});

export const removeDeliveryInfo = asyncHandler(async (req, res) => {
  const data = await DeliveryInfo.findOneAndDelete({ _id: req.params.id, user: req.user.id });
  res.status(200).json(data);
});

export const getDeliveryInfo = asyncHandler(async (req, res) => {
  const data = await DeliveryInfo.findOne({ _id: req.params.id, user: req.user.id });
  res.status(200).json(data);
});

export const getDeliveryInfos = asyncHandler(async (req, res) => {
  const data = await DeliveryInfo.find({ user: req.user.id });
  res.status(200).json(data);
});
