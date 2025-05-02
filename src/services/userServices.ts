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

export const addAddress = async (formData: any) => {
    try {
        const response = await AxiosInstance.post("users/addAddress", formData);
        console.log(response.data);

        return response.data
    } catch (error: unknown) {
        console.error("Error Adding Address :", error);
    }
}

export const updateUserData = createAsyncThunk(
    "auth/updateUserData",
    async (userData: any, { rejectWithValue }) => {
        try {
            const response = await AxiosInstance.put(`users/${userData.userId}`, userData);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || "Failed to update user data");
        }
    }
);
export const deleteAddress = createAsyncThunk(
    "auth/deleteAddress",
    async (addressId: string, { rejectWithValue }) => {
        try {
            const response = await AxiosInstance.delete(`users/deleteAddress/${addressId}`);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || "Failed to delete address");
        }
    }
);
export const updateAddress = createAsyncThunk(
    "auth/updateAddress",
    async (addressData: any, { rejectWithValue }) => {
        try {
            const response = await AxiosInstance.put(`users/updateAddress/${addressData.addressId}`, addressData);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || "Failed to update address");
        }
    }
);
