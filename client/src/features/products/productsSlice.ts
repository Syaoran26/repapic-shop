import { createSlice } from '@reduxjs/toolkit';
import Product from '~/types/ProductType';

interface ProductsState {
  products: Array<Product>;
  isError: boolean;
  isLoading: boolean;
  message: any;
}

const initialState: ProductsState = {
  products: [],
  isError: false,
  isLoading: false,
  message: '',
};

export const productsSlice = createSlice({
  initialState: initialState,
  name: 'products',
  reducers: {},
  extraReducers: (builder) => {},
});
