import { configureStore } from '@reduxjs/toolkit';
import authReducer from '~/features/auth/authSlice';
import optionsReducer from '~/features/products/optionsSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    options: optionsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
