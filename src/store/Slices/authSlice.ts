import { login, register } from "@/services/authServices";
import { createSlice } from "@reduxjs/toolkit";

interface AuthState {
    userId: string;
    token: string;
    isLoading: boolean;
    error: string | null;
    isAuthenticated: boolean;
}

const initialState: AuthState = {
    userId: '',
    token: '',
    isLoading: false,
    error: null,
    isAuthenticated: false,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {

        setToken(state, action) {
            return {
                ...state,
                isAuthenticated: true,
                token: action.payload?.data?.token,
                userId: action.payload?.data?.loginUser?._id,
            }
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                return {
                    ...state,
                    isLoading: true,
                    error: null,
                    isAuthenticated: false
                }
            })
            .addCase(login.fulfilled, (state, action) => {
                return {
                    ...state,
                    isLoading: false,
                    isAuthenticated: true,
                    userId: action.payload?.data?.loginUser?._id,
                    token: action.payload?.data?.token,
                    error: null,
                }
            })
            .addCase(login.rejected, (state, action) => {
                return {
                    ...state,
                    isLoading: false,
                    error: action.payload as string,
                    isAuthenticated: false
                }
            })
            .addCase(register.pending, (state) => {
                return {
                    ...state,
                    isLoading: true,
                    error: null
                }
            })
            .addCase(register.fulfilled, (state, action) => {
                return {
                    ...state,
                    isLoading: false,
                    error: null,
                    userId: action.payload?.data?.loginUser?._id,
                    token: action.payload?.data?.token
                }
            })
            .addCase(register.rejected, (state, action) => {
                return {
                    ...state,
                    isLoading: false,
                    error: action.payload as string
                }
            });
    },
});

export const { setToken } = authSlice.actions;
export default authSlice.reducer;