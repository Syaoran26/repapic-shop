import asyncHandler from 'express-async-handler';
import City from '../models/City.js';
import District from '../models/District.js';
import Ward from '../models/Ward.js';
import fs from 'fs';
import APIFeatures from '../../utils/APIFeatures.js';

const CITIES = 'src/config/db/tinh_tp.json';
const DISTRICTS = 'src/config/db/quan_huyen.json';
const WARDS = 'src/config/db/xa_phuong.json';

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

export const getAddressDetail = asyncHandler(async (req, res) => {
  const cities = JSON.parse(fs.readFileSync(CITIES));
  const districts = JSON.parse(fs.readFileSync(DISTRICTS));
  const wards = JSON.parse(fs.readFileSync(WARDS));

  const ward = wards.find((ward) => ward.code === req.params.code);
  const district = districts.find((district) => district.code === ward.parent_code);
  const city = cities.find((city) => city.code === district.parent_code);
  res.status(200).json({ ward, district, city });
});
