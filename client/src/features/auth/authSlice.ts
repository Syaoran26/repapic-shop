import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { User } from '@common/types';
import authServices, { Credentials } from './authServices';
import { constants } from '@common/utils';
import { toast } from 'react-toastify';

interface AuthState {
  user: User | null;
  isError: boolean;
  isLoading: boolean;
  message: any;
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

export const loginWithOthers = createAsyncThunk('auth/login-others', async (data: any, thunkAPI) => {
  try {
    return await authServices.logInWithOthers(data);
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const logout = createAsyncThunk('auth/logout', async (_, thunkAPI) => {
  try {
    return await authServices.logout();
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const loginByRefreshToken = createAsyncThunk('auth/login-refresh', async (_, thunkAPI) => {
  try {
    return await authServices.loginByRefreshToken();
  } catch (error) {
    await authServices.logout();
    return thunkAPI.rejectWithValue(error);
  }
});

export const authSlice = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.user = null;
        state.isError = false;
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action: PayloadAction<User>) => {
        state.isError = false;
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action: PayloadAction<any>) => {
        state.isError = true;
        state.isLoading = false;
        state.user = null;
        state.message = action.payload.response?.data?.message || constants.sthWentWrong;
      })
      .addCase(loginWithOthers.pending, (state) => {
        state.user = null;
        state.isError = false;
        state.isLoading = true;
      })
      .addCase(loginWithOthers.fulfilled, (state, action: PayloadAction<User>) => {
        state.isError = false;
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(loginWithOthers.rejected, (state, action: PayloadAction<any>) => {
        state.isError = true;
        state.isLoading = false;
        state.user = null;
        state.message = action.payload.response?.data?.message || constants.sthWentWrong;
      })
      .addCase(logout.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.isLoading = false;
        state.isError = false;
        state.message = '';
      })
      .addCase(logout.rejected, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.isError = true;
        toast.error(action.payload?.response?.data.message || constants.sthWentWrong);
      })
      .addCase(loginByRefreshToken.pending, (state) => {
        state.user = null;
        state.isError = false;
        state.isLoading = true;
      })
      .addCase(loginByRefreshToken.fulfilled, (state, action: PayloadAction<User>) => {
        state.isError = false;
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(loginByRefreshToken.rejected, (state) => {
        state.isError = true;
        state.isLoading = false;
        state.user = null;
      });
  },
});

export default authSlice.reducer;
