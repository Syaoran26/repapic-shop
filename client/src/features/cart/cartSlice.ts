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
  items: JSON.parse(sessionStorage.getItem('cart') || '[]') as CartItem[],
  isError: false,
  isLoading: false,
  message: '',
};

export const getCart = createAsyncThunk('auth/me/cart', async (_, thunkAPI) => {
  try {
    return await cartServices.getCart();
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const cartSlice = createSlice({
  name: 'cart',
  initialState: initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const newItem = action.payload;
      const existingItem = state.items.find((item) => item.product._id === newItem.product._id);

      if (existingItem) {
        const quantity = existingItem.quantity + newItem.quantity;
        if (quantity > existingItem.product.stock) {
          toast.error('Không thể thêm vào giỏ hàng');
        } else {
          existingItem.quantity = quantity;
          toast.success('Đã thêm vào giỏ hàng');
        }
      } else {
        state.items.push(newItem);
        toast.success('Đã thêm vào giỏ hàng');
      }
      sessionStorage.setItem('cart', JSON.stringify(state.items));
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      const itemIdToRemove = action.payload;
      const index = state.items.findIndex((item) => item.product._id === itemIdToRemove);

      if (index !== -1) {
        state.items.splice(index, 1);
      }
      sessionStorage.setItem('cart', JSON.stringify(state.items));
    },
    changeQuantity: (state, action: PayloadAction<{ productId: string; quantity: number }>) => {
      const { productId, quantity } = action.payload;
      const itemToChange = state.items.find((item) => item.product._id === productId);

      if (itemToChange) {
        if (quantity < 1) {
          const indexToRemove = state.items.findIndex((item) => item.product._id === productId);
          if (indexToRemove !== -1) {
            state.items.splice(indexToRemove, 1);
          }
        } else {
          itemToChange.quantity = Math.min(quantity, itemToChange.product.stock);
        }
      }
      sessionStorage.setItem('cart', JSON.stringify(state.items));
    },
    resetCart: () => {
      sessionStorage.removeItem('cart');
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
      .addCase(getCart.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.items = action.payload;
      })
      .addCase(getCart.rejected, (state, action: PayloadAction<any>) => {
        state.isError = true;
        state.isLoading = false;
        state.items = [];
        state.message = action.payload.response;
      });
  },
});

export const { addToCart, removeFromCart, changeQuantity, resetCart } = cartSlice.actions;

export default cartSlice.reducer;
