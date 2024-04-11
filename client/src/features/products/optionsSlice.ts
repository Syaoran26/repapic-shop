import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface OptionsState {
  search: string;
  page: number;
  limit: number;
  filter: {
    min: number;
    max: number;
    category?: string;
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
    max: 280_000,
  },
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
  },
  extraReducers: (builder) => {},
});

export const { setSearch, setSort } = optionsSlice.actions;

export default optionsSlice.reducer;
