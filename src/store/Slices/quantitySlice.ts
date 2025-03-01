import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface QuantityState {
    quantities: { [productId: string]: number }; // تخزين الكمية لكل منتج باستخدام productId كمفتاح
}

const initialState: QuantityState = {
    quantities: {}, // كائن فارغ
};

export const quantitySlice = createSlice({
    name: 'quantity',
    initialState,
    reducers: {
        increment: (state, action: PayloadAction<string>) => {
            const productId = action.payload;
            state.quantities[productId] = (state.quantities[productId] || 0) + 1;
        },
        decrement: (state, action: PayloadAction<string>) => {
            const productId = action.payload;
            if (state.quantities[productId] > 1) {
                state.quantities[productId] -= 1;
            }
        },
    },
});

// تصدير الـ actions
export const { increment, decrement } = quantitySlice.actions;

// تصدير الـ reducer
export default quantitySlice.reducer;