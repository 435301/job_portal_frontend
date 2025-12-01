import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import BASE_URL_JOB from "../../config/config";
import getAuthAdminHeaders from "../../utils/auth";
import { toast } from "react-toastify";

interface EmployerProfileState {
    loading: boolean;
    data: any | null;
    error: string | null;
    list: string[];

}

const initialState: EmployerProfileState = {
    loading: false,
    data: null,
    error: null,
    list: [],
};


export const fetchEmployerProfile = createAsyncThunk(
    "employer/profile",
    async (employerId: number, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${BASE_URL_JOB}/employer/profile/${employerId}`, getAuthAdminHeaders());
            return response.data; // {status, message, data}
        } catch (error: any) {
            return rejectWithValue(
                error.response?.data?.message || "Failed to fetch employee profile"
            );
        }
    }
);

const employerProfileSlice = createSlice({
    name: "employerProfile",
    initialState,
    reducers: {
        clearEmployerProfile(state) {
            state.data = null;
            state.error = null;
            state.loading = false;
        }
    },
    extraReducers: (builder) => {
        //fetch profile details
        builder
            .addCase(fetchEmployerProfile.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchEmployerProfile.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload.data.companyDetails;
            })
            .addCase(fetchEmployerProfile.rejected, (state, action: any) => {
                state.loading = false;
                state.error = action.payload;
            });
    }
});


export const { clearEmployerProfile } = employerProfileSlice.actions;

export default employerProfileSlice.reducer;