import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface OptionsState {
  search: string;
  page: number;
  limit: number;
  filter: {
    min: number;
    max: number;
    categories: Array<string>;
  };
  sort?: {
    by: string;
    in: 'asc' | 'desc';
  };
}

const initialState: OptionsState = {
  search: '',
  page: 0,
  limit: 12,
  filter: {
    min: 0,
    max: 240_000,
    categories: [],
  },
};

export const selectIsFiltering = (options: OptionsState): boolean => {
  const filter = options.filter;
  const initialFilter = initialState.filter;
  return (
    filter.min !== initialFilter.min ||
    filter.max !== initialFilter.max ||
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
      if (selectIsFiltering(state)) {
        state.filter = initialState.filter;
      }
    },
    reset: () => {
      return initialState;
    },
  },
});

export const { setSearch, setSort, setFilter, setPage, setLimit, resetFilter, reset } = optionsSlice.actions;

export default optionsSlice.reducer;
