import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Options } from '@common/types';

interface ProductFilter {
  price: {
    lte: number;
    gte: number;
  };
  categories: Array<string>;
}

const initialState: Options<ProductFilter> = {
  search: '',
  page: 1,
  limit: 12,
  sort: [],
  filter: {
    price: {
      lte: 0,
      gte: 240_000,
    },
    categories: [],
  },
};

export const selectIsFiltering = (filter: ProductFilter): boolean => {
  const initialFilter = initialState.filter;
  return (
    filter.price.lte !== initialFilter.price.lte ||
    filter.price.gte !== initialFilter.price.gte ||
    filter.categories.length !== initialFilter.categories.length ||
    !filter.categories.every((category) => initialFilter.categories.includes(category))
  );
};

export const optionsSlice = createSlice({
  initialState: initialState,
  name: 'options',
  reducers: {
    setSearch: (state, action: PayloadAction<string>) => {
      state.search = action.payload;
    },
    setPage: (state, action) => {
      state.page = action.payload;
    },
    setLimit: (state, action) => {
      state.limit = action.payload;
    },
    setSort: (state, action) => {
      state.sort = action.payload;
    },
    setFilter: (state, action) => {
      state.filter = {
        ...state.filter,
        ...action.payload,
      };
    },
    resetFilter: (state) => {
      state.filter = initialState.filter;
    },
    reset: () => {
      return initialState;
    },
  },
});

export const { setSearch, setSort, setFilter, setPage, setLimit, resetFilter, reset } = optionsSlice.actions;

export default optionsSlice.reducer;
