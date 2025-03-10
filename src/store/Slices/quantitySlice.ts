import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface QuantityState {
    quantities: { [productId: string]: number };
}

const initialState: QuantityState = {
    quantities: {},
};

export const quantitySlice = createSlice({
    name: 'quantity',
    initialState,
    reducers: {
        increment: (state, action: PayloadAction<string>) => {
            const productId = action.payload;
            return {
                ...state,
                quantities: {
                    ...state.quantities,
                    [productId]: (state.quantities[productId] ?? 1) + 1,
                },
            };
        },
        decrement: (state, action: PayloadAction<string>) => {
            const productId = action.payload;
            if (state.quantities[productId] && state.quantities[productId] > 1) {
                return {
                    ...state,
                    quantities: {
                        ...state.quantities,
                        [productId]: state.quantities[productId] - 1,
                    },
                };
            }
            return state;
        },
    },
});

export const { increment, decrement } = quantitySlice.actions;
export default quantitySlice.reducer;
