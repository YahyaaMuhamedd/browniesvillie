import { configureStore } from '@reduxjs/toolkit';
import productReducer from '@/store/Slices/ProductSlice';
import quantityReducer from './Slices/quantitySlice'; // استيراد quantitySlice.reducer

export const store = configureStore({
  reducer: {
    products: productReducer,
    quantity: quantityReducer, // إضافة quantitySlice.reducer هنا
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;