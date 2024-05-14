import api from '~/config/api';

export interface CartAddItem {
  product: string;
  quantity: number;
}

const getCart = async () => {
  const response = await api.get('auth/me/cart');
  return response.data;
};

const addToCart = async (data: CartAddItem) => {
  const response = await api.post('auth/me/cart', data);
  return response.data;
};

const removeFromCart = async (id: string) => {
  const response = await api.delete(`auth/me/cart/${id}`);
  return response.data;
};

const changeQuantity = async (data: CartAddItem) => {
  const response = await api.patch(`auth/me/cart/${data.product}`, { quantity: data.quantity });
  return response.data;
};

const cartServices = { getCart, addToCart, removeFromCart, changeQuantity };
export default cartServices;
