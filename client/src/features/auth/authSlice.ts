import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import User from '~/types/UserType';
import authServices, { Credentials } from './authServices';

interface AuthState {
  user: User | null;
  isError: boolean;
  isLoading: boolean;
  message: string;
}

const initialState: AuthState = {
  user: null,
  isError: false,
  isLoading: false,
  message: '',
};

export const login = createAsyncThunk('auth/login', async (credentials: Credentials, thunkAPI) => {
  try {
    return await authServices.login(credentials);
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const authSlice = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state) => {
      state.user = null;
      state.isLoading = true;
      state.isError = false;
      state.message = '';
    });
    builder.addCase(login.fulfilled, (state, action: PayloadAction<User>) => {
      state.isError = false;
      state.isLoading = false;
      state.user = action.payload;
    });
    builder.addCase(login.rejected, (state, action: PayloadAction<any>) => {
      state.isError = true;
      state.isLoading = false;
      state.user = null;
      state.message = action.payload.message;
    });
  },
});

export default authSlice.reducer;
