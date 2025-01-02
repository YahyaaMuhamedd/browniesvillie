import { createAsyncThunk } from "@reduxjs/toolkit";
import AxiosInstance from "./axiosInstance";


export const fetchProducts = createAsyncThunk("products/fetchProducts", async (_, { rejectWithValue }) => {
    try {
        const response = await AxiosInstance.get("products")
        console.log(response.data);

        return response.data
    } catch (error: any) {
        console.error("Error fetching products:", error);
        return rejectWithValue(error.response?.data || "Failed to fetch products");
    }
})
