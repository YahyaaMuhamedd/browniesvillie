import { createAsyncThunk } from "@reduxjs/toolkit";
import AxiosInstance from "./axiosInstance";


export const fetchProducts = createAsyncThunk("products/fetchProducts", async () => {
    try {
        const response = await AxiosInstance.get(`products?page=${1}&limit=${6}`)
        console.log(response.data);

        return response.data.data
    } catch (error: unknown) {
        console.error("Error fetching products:", error);
    }
})
