import fs from 'fs';

const WARDS = 'src/config/db/xa_phuong.json';

export const getAddress = (code) => {
  if (code) {
    const rawData = fs.readFileSync(WARDS);
    const wards = JSON.parse(rawData);
    const data = wards.find((ward) => ward.code === code);
    return data;
  }
};
