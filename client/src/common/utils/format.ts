import { Options } from '@common/types';

const price = (price: number): string => {
  return price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
};

const queryMapping = (key: string, value: any) => {
  if (value === undefined || value === '' || value.length === 0) {
    return '';
  }
  if (Array.isArray(value)) {
    const uriValue = value.map((value) => encodeURIComponent(value));
    return `${key}=${uriValue.join(',')}`;
  } else if (typeof value === 'object') {
    const innerParams = Object.keys(value).map((innerKey: string) => {
      return `${key}.${innerKey}=${encodeURIComponent(value[innerKey])}`;
    });
    return innerParams.join('&');
  } else {
    return `${key}=${encodeURIComponent(value)}`;
  }
};

const urlQuery = (options: Options): string => {
  return Object.keys(options)
    .map((key: string) => {
      if (key === 'filter' && options.filter) {
        const filterParams = Object.keys(options.filter).map((filterKey: string) => {
          const filterValue = options.filter![filterKey];
          return queryMapping(filterKey, filterValue);
        });
        return filterParams.filter(Boolean).join('&');
      } else {
        const value = options[key as keyof Options];
        return queryMapping(key, value);
      }
    })
    .filter(Boolean) // Loại bỏ các phần tử rỗng
    .join('&');
};

const format = { price, urlQuery };
export default format;
