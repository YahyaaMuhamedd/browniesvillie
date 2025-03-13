import { createAsyncThunk } from "@reduxjs/toolkit";
import AxiosInstance from "./axiosInstance";

export const fetchUserData = createAsyncThunk(
    "auth/fetchUserData",
    async (userId: string, { rejectWithValue }) => {
        try {
            const response = await AxiosInstance.get(`users/${userId}`);
            console.log(response)
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || "Failed to fetch user data");
        }
    }
);
