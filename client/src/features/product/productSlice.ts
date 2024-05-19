import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Product } from '@common/types';
import { toast } from 'react-toastify';
import { constants } from '@common/utils';
import productsServices from './productServices';

interface ProductState {
  product: Product | null;
  isError: boolean;
  isLoading: boolean;
}

const initialState: ProductState = {
  product: null,
  isError: false,
  isLoading: false,
};

export const getProduct = createAsyncThunk('product', async (slug: string, thunkAPI) => {
  try {
    return await productsServices.getProduct(slug);
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const productSlice = createSlice({
  initialState: initialState,
  name: 'products',
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProduct.pending, (state) => {
        state.product = null;
        state.isError = false;
        state.isLoading = true;
      })
      .addCase(getProduct.fulfilled, (state, action) => {
        state.product = action.payload;
        state.isError = false;
        state.isLoading = false;
      })
      .addCase(getProduct.rejected, (state, action: PayloadAction<any>) => {
        state.product = null;
        state.isError = true;
        state.isLoading = false;
        toast.error(action.payload.response?.data?.message || constants.sthWentWrong);
      });
  },
});

export default productSlice.reducer;
