import { createSlice } from "@reduxjs/toolkit";
import { fetchUserData } from "@/services/userServices";

interface UserState {
    user: { name: string; email: string; phone: string } | any | null;
    isLoading: boolean;
    error: string | null;
    isAuthenticated: boolean
}

const initialState: UserState = {
    user: null,
    isLoading: false,
    error: null,
    isAuthenticated: false
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        clearUser(state) {
            return {
                ...state,
                user: null
            };
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUserData.pending, (state) => {
                return {
                    ...state,
                    isLoading: true,
                    error: null,
                    isAuthenticated: false,
                    user: null
                };
            })
            .addCase(fetchUserData.fulfilled, (state, action) => {
                console.log(action.payload.data)
                return {
                    ...state,
                    isLoading: false,
                    user: action.payload?.data,
                    isAuthenticated: true
                };
            })
            .addCase(fetchUserData.rejected, (state, action) => {
                return {
                    ...state,
                    isLoading: false,
                    error: action.payload as string,
                    isAuthenticated: false
                };
            });
    },
});

export const { clearUser } = userSlice.actions;
export default userSlice.reducer;