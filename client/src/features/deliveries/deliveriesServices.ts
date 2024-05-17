import { AddressShipping } from '@common/types';
import api from '~/config/api';

const getDeliveries = async () => {
  const response = await api.get('/auth/me/deliveries');
  return response.data;
};

const createDelivery = async (data: Omit<AddressShipping, '_id'>) => {
  const response = await api.post('/auth/me/deliveries', data);
  return response.data;
};

const deleteDelivery = async (data: string) => {
  const response = await api.delete(`/auth/me/deliveries/${data}`);
  return response.data;
};

const deliveriesServices = { getDeliveries, createDelivery, deleteDelivery };
export default deliveriesServices;
