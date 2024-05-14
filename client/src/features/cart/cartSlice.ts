import { CartItem } from '@common/types';
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import cartServices from './cartServices';

interface CartState {
  items: CartItem[];
  isError: boolean;
  isLoading: boolean;
  message: any;
}

const initialState: CartState = {
  items: [],
  isError: false,
  isLoading: false,
  message: '',
};

export const getCart = createAsyncThunk('getCart', async (_, thunkAPI) => {
  try {
    return await cartServices.getCart();
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const addToCart = createAsyncThunk('addToCart', async (data: CartItem, thunkAPI) => {
  try {
    return await cartServices.addToCart({ product: data.product._id, quantity: data.quantity });
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const removeFromCart = createAsyncThunk('removeFromCart', async (data: string, thunkAPI) => {
  try {
    return await cartServices.removeFromCart(data);
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const changeQuantity = createAsyncThunk('changeQuantity', async (data: CartItem, thunkAPI) => {
  try {
    return await cartServices.changeQuantity({ product: data.product._id, quantity: data.quantity });
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const cartSlice = createSlice({
  name: 'cart',
  initialState: initialState,
  reducers: {
    resetCart: () => {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCart.pending, (state) => {
        state.items = [];
        state.isError = false;
        state.isLoading = true;
      })
      .addCase(getCart.fulfilled, (state, action: PayloadAction<CartItem[]>) => {
        state.isError = false;
        state.isLoading = false;
        state.items = action.payload;
      })
      .addCase(getCart.rejected, (state, action: PayloadAction<any>) => {
        state.isError = true;
        state.isLoading = false;
        state.items = [];
        state.message = action.payload.response;
      })
      .addCase(addToCart.pending, (state) => {
        state.isError = false;
        state.isLoading = true;
      })
      .addCase(addToCart.fulfilled, (state, action: PayloadAction<{ data: CartItem[]; message: string }>) => {
        state.isError = false;
        state.isLoading = false;
        state.items = action.payload.data;
        toast.success(action.payload.message);
      })
      .addCase(addToCart.rejected, (state, action: PayloadAction<any>) => {
        state.isError = true;
        state.isLoading = false;
        state.message = action.payload.response;
        toast.error(action.payload.response.data.message);
      })
      .addCase(removeFromCart.pending, (state) => {
        state.isError = false;
        state.isLoading = true;
      })
      .addCase(removeFromCart.fulfilled, (state, action: PayloadAction<{ data: CartItem[]; message: string }>) => {
        state.isError = false;
        state.isLoading = false;
        state.items = action.payload.data;
        toast.success(action.payload.message);
      })
      .addCase(removeFromCart.rejected, (state, action: PayloadAction<any>) => {
        state.isError = true;
        state.isLoading = false;
        state.message = action.payload.response;
        toast.error(action.payload.response.data.message);
      })
      .addCase(changeQuantity.pending, (state) => {
        state.isError = false;
        state.isLoading = true;
      })
      .addCase(changeQuantity.fulfilled, (state, action: PayloadAction<{ data: CartItem[]; message: string }>) => {
        state.isError = false;
        state.isLoading = false;
        state.items = action.payload.data;
      })
      .addCase(changeQuantity.rejected, (state, action: PayloadAction<any>) => {
        state.isError = true;
        state.isLoading = false;
        state.message = action.payload.response;
        toast.error(action.payload.response.data.message);
      });
  },
});

export const { resetCart } = cartSlice.actions;

export default cartSlice.reducer;
