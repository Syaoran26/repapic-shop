import { configureStore } from '@reduxjs/toolkit';
import authReducer from '~/features/auth/authSlice';
import productsReducer from '~/features/products/productsSlice';
import productReducer from '~/features/product/productSlice';
import cartReducer from '~/features/cart/cartSlice';
import deliveriesReducer from '~/features/deliveries/deliveriesSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    product: productReducer,
    products: productsReducer,
    cart: cartReducer,
    deliveries: deliveriesReducer,
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
