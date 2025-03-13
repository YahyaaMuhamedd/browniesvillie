import { configureStore } from '@reduxjs/toolkit';
// import productReducer from '@/store/Slices/ProductSlice';
import feedbackSlice from '@/store/Slices/feedBackSlice';
import authSlice from '@/store/Slices/authSlice';
import quantityReducer from './Slices/quantitySlice';
import userSlice from '@/store/Slices/userSlice';

export const store = configureStore({
  reducer: {
    // products: productReducer,
    quantity: quantityReducer,
    feedBack: feedbackSlice,
    auth: authSlice,
    user: userSlice
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;