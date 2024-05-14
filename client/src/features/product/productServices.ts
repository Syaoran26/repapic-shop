import api from '~/config/api';

const getProduct = async (slug: string) => {
  const response = await api.get(`/products/${slug}`);
  return response.data;
};

const productsServices = { getProduct };
export default productsServices;
