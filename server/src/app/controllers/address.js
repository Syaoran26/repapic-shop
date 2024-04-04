import asyncHandler from 'express-async-handler';
import fs from 'fs';

const CITIES = 'src/config/db/tinh_tp.json';
const DISTRICTS = 'src/config/db/quan_huyen.json';
const WARDS = 'src/config/db/xa_phuong.json';

export const getCities = asyncHandler(async (req, res) => {
  try {
    const rawData = fs.readFileSync(CITIES);
    const cities = JSON.parse(rawData);
    res.status(200).json(cities);
  } catch (error) {
    throw error;
  }
});

export const getDistricts = asyncHandler(async (req, res) => {
  try {
    const rawData = fs.readFileSync(DISTRICTS);
    const districts = JSON.parse(rawData);
    const data = districts.filter((district) => district.parent_code === req.query.city);
    res.status(200).json(data);
  } catch (error) {
    throw error;
  }
});

export const getWards = asyncHandler(async (req, res) => {
  try {
    const rawData = fs.readFileSync(WARDS);
    const wards = JSON.parse(rawData);
    const data = wards.filter((ward) => ward.parent_code === req.query.district);
    res.status(200).json(data);
  } catch (error) {
    throw error;
  }
});

export const getAddressDetail = asyncHandler(async (req, res) => {
  try {
    const cities = JSON.parse(fs.readFileSync(CITIES));
    const districts = JSON.parse(fs.readFileSync(DISTRICTS));
    const wards = JSON.parse(fs.readFileSync(WARDS));

    const ward = wards.find((ward) => ward.code === req.params.code);
    const district = districts.find((district) => district.code === ward.parent_code);
    const city = cities.find((city) => city.code === district.parent_code);
    res.status(200).json({ ward, district, city });
  } catch (error) {
    throw error;
  }
});
