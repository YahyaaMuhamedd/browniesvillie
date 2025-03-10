import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FeedbackState {
    message: string[];
    hrefLocation: string;
}

const initialState: FeedbackState = {
    message: [],
    hrefLocation: '/',
};

const feedbackSlice = createSlice({
    name: 'feedback',
    initialState,
    reducers: {
        setMessage: (state, action: PayloadAction<string>) => {
            if (state.message.length < 3) {
                return {
                    ...state,
                    message: [...state.message, action.payload],
                };
            }
            return state;
        },
        clearMessage: (state) => {
            if (state.message.length > 0) {
                return {
                    ...state,
                    message: state.message.slice(1),
                };
            }
            return state;
        },
        setHrefLocation: (state, action: PayloadAction<string>) => {
            return {
                ...state,
                hrefLocation: action.payload,
            };
        },
    },
});

export const { setMessage, clearMessage, setHrefLocation } = feedbackSlice.actions;
export default feedbackSlice.reducer;