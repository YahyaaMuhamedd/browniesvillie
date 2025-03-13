import { createAsyncThunk } from "@reduxjs/toolkit";
import AxiosInstance from "./axiosInstance";


// Login 
export const login = createAsyncThunk(
    "auth/login",
    async (userData: any, { rejectWithValue }) => {
        try {
            const response = await AxiosInstance.post("users/login", userData);
            console.log(response.data);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || "Login failed");
        }
    }
);

// Register 
export const register = createAsyncThunk(
    "auth/register",
    async (userData: any, { rejectWithValue }) => {
        try {
            const response = await AxiosInstance.post("users/register", userData);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || "Registration failed");
        }
    }
);

