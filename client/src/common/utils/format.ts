const price = (price: number): string => {
  return price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
};

const format = { price };
export default format;
