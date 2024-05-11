import jwt from 'jsonwebtoken';

export const generateAccessToken = (payload) => {
  return jwt.sign(payload, process.env.ACCESS_TOKEN, { expiresIn: '10m' });
};

export const generateRefreshToken = (payload) => {
  return jwt.sign(payload, process.env.REFRESH_TOKEN, { expiresIn: '30d' });
};
