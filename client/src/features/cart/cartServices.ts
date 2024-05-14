import api from '~/config/api';

const getCart = async () => {
  const response = await api.get('auth/me/cart');
  const cart = response.data;
  if (cart) {
    sessionStorage.setItem('cart', JSON.stringify(cart));
  }
  return cart;
};

const cartServices = { getCart };
export default cartServices;
