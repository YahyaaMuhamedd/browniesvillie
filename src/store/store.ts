import { configureStore } from '@reduxjs/toolkit';
// import productReducer from '@/store/Slices/ProductSlice';
import feedbackSlice from '@/store/Slices/feedBackSlice';
import quantityReducer from './Slices/quantitySlice';

export const store = configureStore({
  reducer: {
    // products: productReducer,
    quantity: quantityReducer,
    feedBack: feedbackSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;