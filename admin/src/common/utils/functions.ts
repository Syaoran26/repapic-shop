import { Product } from '@common/types';

const finalPrice = ({ price, discount }: Product) => {
  return price - (price * (discount || 0)) / 100;
};

const replaceParams = (route: string, params: any) => {
  let url = route;
  for (const key in params) {
    if (params.hasOwnProperty(key)) {
      url = url.replace(`:${key}`, params[key]);
    }
  }
  return url;
};

const checkRouteMatch = (pattern: string, url: string): boolean => {
  const regexPattern = pattern.replace(/:[^\s/]+/g, '([^/]+)');
  const regex = new RegExp(`^${regexPattern}$`);
  return regex.test(url);
};

const functions = { finalPrice, replaceParams, checkRouteMatch };

export default functions;
