import { AddressShipping } from '@common/types';
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import deliveriesServices from './deliveriesServices';
import { toast } from 'react-toastify';
import { constants } from '@common/utils';

interface DeliveriesState {
  deliveries: AddressShipping[];
  isError: boolean;
  isLoading: boolean;
}

const initialState: DeliveriesState = {
  deliveries: [],
  isError: false,
  isLoading: false,
};

export const getDeliveries = createAsyncThunk('getDeliveries', async (_, thunkAPI) => {
  try {
    return await deliveriesServices.getDeliveries();
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const createDelivery = createAsyncThunk(
  'createDelivery',
  async (data: Omit<AddressShipping, '_id'>, thunkAPI) => {
    try {
      return await deliveriesServices.createDelivery(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

export const deleteDelivery = createAsyncThunk('deleteDelivery', async (data: string, thunkAPI) => {
  try {
    return await deliveriesServices.deleteDelivery(data);
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const deliveriesSlice = createSlice({
  initialState: initialState,
  name: 'deliveries',
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getDeliveries.pending, (state) => {
        state.deliveries = [];
        state.isError = false;
        state.isLoading = true;
      })
      .addCase(getDeliveries.fulfilled, (state, action: PayloadAction<AddressShipping[]>) => {
        state.deliveries = action.payload;
        state.isError = false;
        state.isLoading = false;
      })
      .addCase(getDeliveries.rejected, (state, action: PayloadAction<any>) => {
        state.deliveries = [];
        state.isError = true;
        state.isLoading = false;
        toast.error(action.payload.response?.data?.message || constants.sthWentWrong);
      })
      .addCase(createDelivery.pending, (state) => {
        state.isError = false;
        state.isLoading = true;
      })
      .addCase(createDelivery.fulfilled, (state, action: PayloadAction<AddressShipping>) => {
        state.deliveries = [...state.deliveries, action.payload];
        state.isError = false;
        state.isLoading = false;
      })
      .addCase(createDelivery.rejected, (state, action: PayloadAction<any>) => {
        state.isError = true;
        state.isLoading = false;
        toast.error(action.payload.response?.data?.message || constants.sthWentWrong);
      })
      .addCase(deleteDelivery.pending, (state) => {
        state.isError = false;
        state.isLoading = true;
      })
      .addCase(deleteDelivery.fulfilled, (state, action: PayloadAction<AddressShipping>) => {
        state.deliveries = state.deliveries.filter((item) => item._id !== action.payload._id);
        state.isError = false;
        state.isLoading = false;
      })
      .addCase(deleteDelivery.rejected, (state, action: PayloadAction<any>) => {
        state.isError = true;
        state.isLoading = false;
        toast.error(action.payload.response?.data?.message || constants.sthWentWrong);
      });
  },
});

export default deliveriesSlice.reducer;
