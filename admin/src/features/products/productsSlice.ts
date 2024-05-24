import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Options, Product } from '@common/types';
import productsServices from './productsServices';
import { toast } from 'react-toastify';
import { constants } from '@common/utils';

export interface ProductFilter {
  categories: Array<string>;
  price: {
    gte: number;
    lte: number;
  };
  rating?:
    | {
        gte: number;
      }
    | number;
}

interface ProductsState {
  products: Array<Product>;
  total: number;
  options: Options<ProductFilter>;
  isError: boolean;
  isLoading: boolean;
}

const initialState: ProductsState = {
  products: [],
  total: 0,
  isError: false,
  isLoading: false,
  options: {
    search: '',
    page: 1,
    limit: 12,
    sort: [],
    filter: {
      categories: [],
      price: {
        gte: 0,
        lte: 240_000,
      },
    },
  },
};

export const selectIsFiltering = (filter: ProductFilter): boolean => {
  const initialFilter = initialState.options.filter;
  return (
    filter.price.lte !== initialFilter.price.lte ||
    filter.price.gte !== initialFilter.price.gte ||
    filter.categories.length !== initialFilter.categories.length ||
    !filter.categories.every((category) => initialFilter.categories.includes(category)) ||
    filter.rating !== initialFilter.rating
  );
};

export const getProducts = createAsyncThunk('products', async (options: Options<ProductFilter>, thunkAPI) => {
  try {
    return await productsServices.getProducts(options);
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const createProduct = createAsyncThunk('createProduct', async (data: FormData, thunkAPI) => {
  try {
    return await productsServices.createProduct(data);
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const productsSlice = createSlice({
  initialState: initialState,
  name: 'products',
  reducers: {
    setSearch: (state, action: PayloadAction<string>) => {
      state.options.search = action.payload;
      state.options.page = 1;
    },
    setPage: (state, action) => {
      state.options.page = action.payload;
    },
    setLimit: (state, action) => {
      state.options.limit = action.payload;
      state.options.page = initialState.options.page;
    },
    setSort: (state, action) => {
      state.options.sort = action.payload;
      state.options.page = initialState.options.page;
    },
    setFilter: (state, action) => {
      state.options.filter = {
        ...state.options.filter,
        ...action.payload,
      };
      state.options.page = initialState.options.page;
    },
    resetFilter: (state) => {
      state.options.filter = initialState.options.filter;
    },
    resetOptions: (state) => {
      state.options = initialState.options;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.pending, (state) => {
        state.products = [];
        state.isError = false;
        state.isLoading = true;
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.products = action.payload.products;
        state.total = action.payload.total;
        state.isError = false;
        state.isLoading = false;
      })
      .addCase(getProducts.rejected, (state, action: PayloadAction<any>) => {
        state.products = [];
        state.total = 0;
        state.isError = true;
        state.isLoading = false;
        toast.error(action.payload?.response?.data?.message || constants.sthWentWrong);
      })
      .addCase(createProduct.pending, (state) => {
        state.isError = false;
        state.isLoading = true;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
      })
      .addCase(createProduct.rejected, (state, action: PayloadAction<any>) => {
        state.isError = true;
        state.isLoading = false;
        toast.error(action.payload?.response?.data?.message || constants.sthWentWrong);
      });
  },
});

export const { setSearch, setSort, setFilter, setPage, setLimit, resetFilter, resetOptions } = productsSlice.actions;

export default productsSlice.reducer;
