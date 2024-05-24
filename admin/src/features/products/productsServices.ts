import api from '~/config/api';
import { Options } from '@common/types';
import { format } from '@common/utils';
import { ProductFilter } from './productsSlice';

const getProducts = async (options: Options<ProductFilter>) => {
  const response = await api.get(`/products?${format.urlQuery(options)}`);
  return response.data;
};

const createProduct = async (data: FormData) => {
  const response = await api.post('/products', data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

const productsServices = { getProducts, createProduct };
export default productsServices;
